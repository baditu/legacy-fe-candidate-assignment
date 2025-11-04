import * as z from "zod";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { PenLine, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import type { Message } from "../lib/types";
import { API_BASE_URL } from "../lib/constants";

const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});

type FormType = z.infer<typeof formSchema>;

type CustomMessageFormProps = {
  onMessageSigned: (message: Message) => void;
};

export default function CustomMessageForm({
  onMessageSigned,
}: CustomMessageFormProps) {
  const { primaryWallet } = useDynamicContext();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: FormType) => {
    if (!primaryWallet) {
      toast.error("No wallet connected");
      return;
    }

    setIsLoading(true);

    try {
      const signature = await primaryWallet.signMessage(data.message);

      if (!signature) {
        toast.error("Failed to sign message", {
          description: "No signature returned from wallet",
        });
        return;
      }

      let isVerified = false;

      try {
        const response = await fetch(`${API_BASE_URL}/verify-signature`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-wallet-address": primaryWallet.address || "",
          },
          body: JSON.stringify({
            message: data.message,
            signature,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          isVerified = result.isValid;

          if (isVerified) {
            toast.success("Message signed and verified!", {
              description: `Signature is valid. Signer: ${result.signer.slice(
                0,
                6
              )}...${result.signer.slice(-4)}`,
            });
          } else {
            toast.warning("Message signed but verification failed", {
              description: `Recovered signer: ${result.signer || "None"}`,
            });
          }
        } else {
          toast.warning("Message signed but verification failed", {
            description: `Backend error: ${response.status}`,
          });
        }
      } catch (error) {
        console.error("Error verifying signature:", error);
        toast.warning("Message signed but verification failed", {
          description: "Could not connect to backend",
        });
      }

      const newMessage: Message = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        message: data.message,
        signature,
        address: primaryWallet.address || "Unknown",
        timestamp: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        isVerified,
      };

      onMessageSigned(newMessage);
      form.reset();
    } catch (error) {
      console.error("Error signing message:", error);
      toast.error("Failed to sign message", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">Sign Message</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Sign a message with your wallet to verify your identity.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form id="sign-message-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="message-input">Message</FieldLabel>
                  <Textarea
                    {...field}
                    id="message-input"
                    aria-invalid={fieldState.invalid}
                    placeholder="Write your message to sign..."
                    autoComplete="off"
                    disabled={isLoading}
                    className="min-h-[100px] sm:min-h-[120px] resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 text-sm"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end px-4 sm:px-6 pb-4 sm:pb-6">
        <Button
          type="submit"
          form="sign-message-form"
          disabled={isLoading}
          className="gap-2 bg-zinc-800 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing...
            </>
          ) : (
            <>
              <PenLine className="h-4 w-4" />
              Sign Message
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
