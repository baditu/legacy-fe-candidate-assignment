import { motion } from "motion/react";
import { useMotionValue, useMotionTemplate } from "motion/react";
import { useState } from "react";
import type { Message } from "../lib/types";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

type MessageCardProps = {
  message: Message;
};

export default function MessageCard({ message }: MessageCardProps) {
  const radius = 200;
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: {
    currentTarget: HTMLElement;
    clientX: number;
    clientY: number;
  }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`
    radial-gradient(
      ${radius}px circle at ${mouseX}px ${mouseY}px,
      ${message.isVerified ? "#10b981" : "#ef4444"},
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-xl p-px transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{
        background: visible ? background : "transparent",
      }}
    >
      <Card className="border-none shadow-input dark:shadow-[0px_0px_1px_1px_#404040] bg-gray-50 dark:bg-zinc-800">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-2">
          <CardDescription className="flex-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
            {message.message}
          </CardDescription>
          <Badge
            className={`ml-2 ${
              message.isVerified
                ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
            }`}
          >
            {message.isVerified ? "Verified" : "Unverified"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-1 p-4 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
          <dl className="flex items-center justify-between">
            <dt className="font-medium">Address:</dt>
            <dd className="font-mono">
              {message.address.slice(0, 6)}...{message.address.slice(-4)}
            </dd>
          </dl>
          <dl className="flex items-center justify-between">
            <dt className="font-medium">Signature:</dt>
            <dd className="font-mono">
              {message.signature.slice(0, 10)}...{message.signature.slice(-8)}
            </dd>
          </dl>
          <dl className="flex items-center justify-between">
            <dt className="font-medium">Time:</dt>
            <dd>{message.timestamp}</dd>
          </dl>
        </CardContent>
      </Card>
    </motion.div>
  );
}
