import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import Alert from "react-bootstrap/alert";
import { ContractsContext } from "../Providers/ContractsProvider";
import { Web3Context } from "../Providers/Web3Provider";
import Button from "react-bootstrap/Button";

function OwnerForm(props) {
  const [isAppButtonLoading, setIsAppButtonLoading] = useState(true);
  const [isDataButtonLoading, setIsDataButtonLoading] = useState(true);
  const { account } = useContext(Web3Context);
  const { appInstance, appStatus, dataInstance, dataStatus } =
    useContext(ContractsContext);

  useEffect(() => {
    setIsAppButtonLoading(false);
    setIsDataButtonLoading(false);
  }, [appStatus, dataStatus]);

  function getAppButtonVariant() {
    if (appStatus === true) {
      return "danger";
    } else if (appStatus === false) {
      return "success";
    }

    return "secondary";
  }

  function getDataButtonVariant() {
    if (dataStatus === true) {
      return "danger";
    } else if (dataStatus === false) {
      return "success";
    }

    return "secondary";
  }

  async function onAppStatuschange(event) {
    if (appInstance) {
      setIsAppButtonLoading(true);
      appInstance.setOperational(!appStatus, {
        from: account,
      });
    }
  }

  async function onDataStatuschange(event) {
    if (appInstance) {
      setIsDataButtonLoading(true);
      dataInstance.setOperational(!dataStatus, {
        from: account,
      });
    }
  }

  return (
    <div className="App-content-dashboard">
      <h6> Current account {account} is the owner of the Dapp </h6>
      <Alert variant="danger">
        <p>
          <strong> DANGER </strong> : The following setting will impact users
          ability to interact with your contracts.{" "}
        </p>
        <div style={{ display: "inline-block" }}>
          <Button
            variant={getDataButtonVariant()}
            type="submit"
            disabled={isDataButtonLoading}
            onClick={onDataStatuschange}
            id="Data-button"
          >
            {dataStatus ? "Disable" : "Activate "} data
          </Button>
          <Button
            variant={getAppButtonVariant()}
            type="submit"
            disabled={isAppButtonLoading}
            onClick={onAppStatuschange}
            id="App-button"
          >
            {appStatus ? "Disable" : "Activate "} app
          </Button>
        </div>
      </Alert>
    </div>
  );
}

export default OwnerForm;
