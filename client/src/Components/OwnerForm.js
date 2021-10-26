import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import Form from "react-bootstrap/form";
import Alert from "react-bootstrap/alert";
import { ContractsContext } from "../Providers/ContractsProvider";
import { Web3Context } from "../Providers/Web3Provider";

function OwnerForm(props) {
  const { account } = useContext(Web3Context);
  const { appInstance, appStatus, dataInstance, dataStatus } =
    useContext(ContractsContext);

  async function onAppStatuschange(event) {
    console.log(event.target.value);

    if (appInstance) {
      appInstance.setOperational(!appStatus, {
        from: account,
      });
    }
  }

  async function onDataStatuschange(event) {
    console.log(event.target.value);

    if (appInstance) {
      dataInstance.setOperational(!dataStatus, {
        from: account,
      });
    }
  }

  return (
    <div className="App-content-dashboard">
      <h6> Current account {account} is the owner of the Dapp </h6>
      <Alert variant="danger">
        The following setting <strong>will impact users.</strong>
      </Alert>
      <Form>
        {props.app && (
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Set app operational status"
            checked={appStatus}
            onChange={onAppStatuschange}
            visible={props.app}
          />
        )}
        {props.data && (
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Set data operational status"
            checked={dataStatus}
            onChange={onDataStatuschange}
          />
        )}
      </Form>
    </div>
  );
}

export default OwnerForm;
