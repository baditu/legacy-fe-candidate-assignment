import { motion } from "motion/react";
import type { Message } from "../lib/types";
import MessageCard from "./MessageCard";

type MessageHistoryProps = {
  messages: Message[];
};

const MessageHistory = ({ messages }: MessageHistoryProps) => {
  return (
    <div className="shadow-input mx-auto w-full rounded-none bg-white p-4 sm:rounded-2xl sm:p-6 lg:p-8 dark:bg-black">
      <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-200">
        Message History
      </h2>
      <div className="space-y-3 sm:space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto pr-2">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <MessageCard message={message} />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 sm:py-12 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            No messages yet. Sign your first message above!
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageHistory;
