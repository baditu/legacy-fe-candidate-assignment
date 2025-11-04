import { motion } from "framer-motion";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Spotlight } from "./ui/spotlight";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Wallet, MessageSquareLock } from "lucide-react";

const Hero = () => {
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 dark:from-zinc-950 dark:to-black overflow-hidden relative"
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(6, 182, 212, 0.4)"
      />

      <div className="max-w-4xl mx-auto px-4 z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-lime-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-linear-to-r from-cyan-600 to-lime-500 p-6 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                <MessageSquareLock className="h-12 w-12 text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-400 mb-6 leading-tight px-4">
            Message Signer App
          </h1>

          <TextGenerateEffect
            words="Connect your wallet to get started with secure message authentication."
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer text-lg px-8 py-4"
              onClick={() => setShowAuthFlow(true)}
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Your Wallet
            </HoverBorderGradient>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-sm text-gray-500 dark:text-gray-500"
            >
              No wallet? No problem! We'll create one for you.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
