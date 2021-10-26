import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Web3Context } from "../Providers/Web3Provider";
import { useContext } from "react";
import { useState } from "react";

function Connect() {
  const { requestAccount, providerConnected } = useContext(Web3Context);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function handleClick() {
    setButtonDisabled(true);
    await requestAccount();
    //setButtonDisabled(false);
  }

  return (
    <div className="App-content-connect">
      <h1 id="title">Flight Surety</h1>
      <Button
        disabled={buttonDisabled}
        variant="primary"
        onClick={providerConnected ? handleClick : null}
      >
        {providerConnected ? "Connect Metamask" : "Loading Web3"}
      </Button>{" "}
    </div>
  );
}

export default Connect;
