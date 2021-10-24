import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

const Web3Context = React.createContext(null);

class Web3Provider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      provider: null,
      providerConnected: false,
      account: null,
      accountConnected: false,
    };
  }

  async componentDidMount() {
    try {
      const provider = await detectEthereumProvider();

      provider.on("chainChanged", this.onChainChanged);
      provider.on("connect", this.onConnect);
      provider.on("disconnect", this.onDisconnect);
      provider.on("accountsChanged", this.onAccountsChanged);

      this.setState({ provider: provider, providerConnected: true });
      toast.success("Web3 Provider detected", { position: "top-right" });
    } catch (error) {
      toast.error("Could not detect any Ethereum Provider", {
        position: "top-right",
      });
    }
  }

  onChainChanged = (chainId) => {
    toast.error("Chain changed ! A reload required.", {
      position: "top-right",
    });
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  onAccountsChanged = (accounts) => {
    console.log(accounts);

    if (accounts.length > 0) {
      this.setState({ account: accounts[0], accountConnected: true });
      toast.success(
        "Account connected !\n" + accounts[0].substring(0, 10) + "...",
        { position: "top-right" }
      );
    } else {
      this.setState({ account: null, accountConnected: false });
    }
  };

  onConnect() {}

  onDisconnect() {}

  requestAccount = async () => {
    if (this.state.providerConnected) {
      let accounts = await this.state.provider.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        this.setState({ account: accounts[0], accountConnected: true });
        toast.success(
          "Account connected !\n" + accounts[0].substring(0, 10) + "...",
          { position: "top-right" }
        );
        return accounts[0];
      }
    }

    return null;
  };

  render() {
    const { provider, providerConnected, account, accountConnected } =
      this.state;

    if (!providerConnected) {
      return (
        <div>
          <Button variant="primary">Connect</Button>{" "}
        </div>
      );
    }

    return (
      <Web3Context.Provider
        value={{
          provider: provider,
          providerConnected: providerConnected,
          account: account,
          accountConnected: accountConnected,
          requestAccount: this.requestAccount,
        }}
      >
        {this.props.children}
      </Web3Context.Provider>
    );
  }
}

export { Web3Provider, Web3Context };
