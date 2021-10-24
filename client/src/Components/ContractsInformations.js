import "bootstrap/dist/css/bootstrap.min.css";
import { MdSettingsApplications } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { useContext } from "react";
import { ContractsContext } from "../Providers/ContractsProvider";

function ContractsInformations(props) {
  const { appInstance, appStatus, dataInstance } = useContext(ContractsContext);

  return (
    <div className="App-content-dashboard-user-account">
      <p>
        <FaDatabase className="Icon-grey" /> Data contract :{" "}
        <span className={dataInstance ? "green" : "red"}>
          {dataInstance ? "Deployed" : "Unreachable"}{" "}
        </span>
      </p>
      <p>
        <MdSettingsApplications className="Icon-grey" /> App contract:{" "}
        <span className={appInstance ? "green" : "red"}>
          {appInstance ? "Deployed" : "Unreachable"}{" "}
        </span>
      </p>
      <p>
        <MdSettingsApplications className="Icon-grey" /> App status :{" "}
        <span className={appStatus ? "green" : "red"}>
          {appStatus ? "Operational" : "Paused"}{" "}
        </span>
      </p>
    </div>
  );
}

export default ContractsInformations;
