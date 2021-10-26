import "bootstrap/dist/css/bootstrap.min.css";

import AccountInformations from "../Components/AccountInformations";
import ContractsInformations from "../Components/ContractsInformations";
import FlightForm from "../Components/FlightForm";
import InsuranceForm from "../Components/InsuranceForm";
import OwnerForm from "../Components/OwnerForm";
import TruffleContract from "@truffle/contract";
import { useContext } from "react";
import { Web3Context } from "../Providers/Web3Provider";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ContractsProvider } from "../Providers/ContractsProvider";

const dataABI = require("../contracts/FlightSuretyData.json");
const appABI = require("../contracts/FlightSuretyApp.json");

function Dashboard() {
  const { provider, account } = useContext(Web3Context);

  const [dataInstance, setDataInstance] = useState(null);
  const [appInstance, setAppInstance] = useState(null);
  const [appStatus, setAppStatus] = useState(null);
  const [dataStatus, setDataStatus] = useState(null);
  const [isAppOwner, setIsAppOwner] = useState(false);
  const [isDataOwner, setIsDataOwner] = useState(false);

  let dataContract = TruffleContract(dataABI);
  let appContract = TruffleContract(appABI);

  dataContract.setProvider(provider);
  appContract.setProvider(provider);

  useEffect(() => {
    checkDeployement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // TODO: Return function to cleanup event listeners
  }, [account]);

  const checkDeployement = async () => {
    let _dataInstance = dataInstance;
    let _dataStatus = dataStatus;
    let _appInstance = appInstance;
    let _appStatus = appStatus;
    let _isAppOwner = isAppOwner;
    let _isDataOwner = isDataOwner;

    try {
      _dataInstance = await dataContract.deployed();
      _dataStatus = await _dataInstance.isOperational.call({ from: account });
      _isDataOwner = await _dataInstance.isOwner.call({ from: account });
      await _dataInstance.OperationalChanged(onDataStatusChanged);
      setDataInstance(_dataInstance);
      setDataStatus(_dataStatus);
      setIsDataOwner(_isDataOwner);
    } catch (error) {
      console.log(error.message);
      setDataInstance(false);
      setIsDataOwner(false);
      setDataStatus(false);
      toast.error("Error on data contract : Not deployed", {
        position: "top-right",
      });
    }

    try {
      _appInstance = await appContract.deployed();
      _appStatus = await _appInstance.isOperational.call({ from: account });
      _isAppOwner = await _appInstance.isOwner.call({ from: account });
      await _appInstance.OperationalChanged(onAppStatusChanged);

      setAppInstance(_appInstance);
      setAppStatus(_appStatus);
      setIsAppOwner(_isAppOwner);
    } catch (error) {
      console.log(error.message);
      setAppInstance(false);
      setAppStatus(false);
      setIsAppOwner(false);
      toast.error("Error on app contract : Not deployed", {
        position: "top-right",
      });
    }
  };

  function onAppStatusChanged(error, value) {
    if (!error) {
      if (value.returnValues.operational) {
        toast.success("App contract activated", { position: "top-right" });
      } else {
        toast.error("App contract deactivated", { position: "top-right" });
      }
      setAppStatus(value.returnValues.operational);
    }
  }

  function onDataStatusChanged(error, value) {
    if (!error) {
      if (value.returnValues.operational) {
        toast.success("Data contract activated", { position: "top-right" });
      } else {
        toast.error("Data contract deactivated", { position: "top-right" });
      }
      setDataStatus(value.returnValues.operational);
    }
  }

  return (
    <div className="Wrapper">
      <ContractsProvider
        appInstance={appInstance}
        appStatus={appStatus}
        dataStatus={dataStatus}
        dataInstance={dataInstance}
      >
        <div className="App-content-dashboard">
          <AccountInformations></AccountInformations>
        </div>
        <div className="App-content-dashboard">
          <ContractsInformations></ContractsInformations>
        </div>
        {(isAppOwner || isDataOwner) && (
          <OwnerForm app={isAppOwner} data={isDataOwner}></OwnerForm>
        )}
        <FlightForm></FlightForm>
        <InsuranceForm></InsuranceForm>
      </ContractsProvider>
    </div>
  );
}

export default Dashboard;
