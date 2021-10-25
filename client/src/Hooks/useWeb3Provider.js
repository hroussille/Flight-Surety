import Web3 from "web3";
import { Web3Context } from "../Providers/Web3Provider";

export default function useWeb3() {
  const { provider, providerConnected } = useContext(Web3Context);
}
