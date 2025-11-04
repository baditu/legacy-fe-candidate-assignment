import { AnimatePresence, motion } from "framer-motion";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import CustomMessageForm from "./components/CustomMessageForm";
import MessageHistory from "./components/MessageHistory";
import ConnectWallet from "./components/ConnectWallet";
import Hero from "./components/Hero";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Message } from "./lib/types";

const App = () => {
  const { user } = useDynamicContext();
  const [messages, setMessages] = useLocalStorage<Message[]>(
    "signedMessages",
    []
  );

  const handleMessageSigned = (newMessage: Message) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!user ? (
          <Hero key="hero" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 dark:from-zinc-900 dark:to-black"
          >
            <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
              <ConnectWallet />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
              <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
                <CustomMessageForm onMessageSigned={handleMessageSigned} />
                <MessageHistory messages={messages} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
