import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { MdSettingsApplications } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { useContext } from "react";
import { ContractsContext } from "../Providers/ContractsProvider";
import Loader from "react-loader-spinner";

function ContractsInformations(props) {
  const { appInstance, appStatus, dataInstance, dataStatus } =
    useContext(ContractsContext);

  return (
    <div className="App-content-dashboard-user-account">
      <div>
        <FaDatabase className="Icon-grey" /> Data contract :{" "}
        <span className={dataInstance ? "green" : "red"}>
          {dataInstance === null && (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={30}
              width={60}
              visible={dataInstance === null}
            />
          )}
          {dataInstance !== null &&
            (dataInstance !== false ? "Deployed" : "Unreachable")}{" "}
        </span>
        /
        <span className={dataStatus ? "green" : "red"}>
          {dataStatus === null && (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={30}
              width={60}
              visible={dataStatus === null}
            />
          )}
          {dataStatus !== null &&
            (dataStatus !== false ? " Operational" : " Deactivated")}{" "}
        </span>
      </div>

      <div>
        <MdSettingsApplications className="Icon-grey" /> App contract:{" "}
        <span className={appInstance ? "green" : "red"}>
          {appInstance === null && (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={30}
              width={60}
              visible={appInstance === null}
            />
          )}
          {appInstance !== null &&
            (appInstance !== false ? "Deployed" : "Unreachable")}{" "}
        </span>
        /
        <span className={appStatus ? "green" : "red"}>
          {appStatus === null && (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={30}
              width={60}
              visible={appStatus === null}
            />
          )}
          {appStatus !== null &&
            (appStatus !== false ? " Operational" : " Deactivated")}{" "}
        </span>
      </div>
    </div>
  );
}

export default ContractsInformations;
