import { Wallet, LogOut } from "lucide-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ConnectedAddress from "./ConnectedAddress";

const ConnectWallet = () => {
  const { setShowAuthFlow, user, handleLogOut, primaryWallet } =
    useDynamicContext();

  if (user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <ConnectedAddress primaryWallet={primaryWallet} />

        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer text-xs sm:text-sm px-3 sm:px-4 py-2"
          onClick={handleLogOut}
        >
          <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span>Disconnect</span>
        </HoverBorderGradient>
      </div>
    );
  }

  return (
    <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer text-xs sm:text-sm px-3 sm:px-4 py-2"
      onClick={() => setShowAuthFlow(true)}
    >
      <Wallet className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
      <span className="hidden sm:inline">Connect Wallet</span>
      <span className="sm:hidden">Connect</span>
    </HoverBorderGradient>
  );
};

export default ConnectWallet;
