import Web3 from "web3";

export default function useWeb3() {
  const { provider, providerConnected } = useWeb3Provider();

  if (providerConnected) {
    return new Web3(web3Provider);
  }

  return null;
}
