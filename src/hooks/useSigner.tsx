import { providers } from "ethers";
import { useWallet } from "use-wallet";

const useSigner = () => {
  const wallet = useWallet();
  if (!wallet?.ethereum || !wallet?.account) return null;

  const provider = new providers.Web3Provider(wallet.ethereum);
  return provider.getSigner(wallet.account);
};

export default useSigner;
