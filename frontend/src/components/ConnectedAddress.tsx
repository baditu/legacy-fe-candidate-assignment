import { useMemo } from "react";
import { User } from "lucide-react";
import type { Wallet } from "@dynamic-labs/sdk-react-core";

type ConnectedAddressProps = {
  primaryWallet: Wallet | null | undefined;
};

const ConnectedAddress = ({ primaryWallet }: ConnectedAddressProps) => {
  const formattedAddress = useMemo(() => {
    if (!primaryWallet?.address) {
      return "No address";
    }

    const address = primaryWallet.address;
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
  }, [primaryWallet?.address]);

  if (!primaryWallet?.address) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm transition-shadow hover:shadow-md">
      <User className="h-4 w-4 text-gray-600 dark:text-gray-400 shrink-0" />
      <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px] sm:max-w-none">
        {formattedAddress}
      </span>
    </div>
  );
};

export default ConnectedAddress;
