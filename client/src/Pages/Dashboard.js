import "bootstrap/dist/css/bootstrap.min.css";

import AccountInformations from "../Components/AccountInformations";
import ContractsInformations from "../Components/ContractsInformations";
import FlightForm from "../Components/FlightForm";
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
  const { provider } = useContext(Web3Context);

  let dataContract = TruffleContract(dataABI);
  let appContract = TruffleContract(appABI);

  const [dataInstance, setDataInstance] = useState(null);
  const [appInstance, setAppInstance] = useState(null);
  const [appStatus, setAppStatus] = useState(false);

  dataContract.setProvider(provider);
  appContract.setProvider(provider);

  useEffect(() => {
    checkDeployement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkDeployement = async () => {
    try {
      let _dataInstance = await dataContract.deployed();
      let _appInstance = await appContract.deployed();
      let _appStatus = await _appInstance.isOperational();

      setDataInstance(_dataInstance);
      setAppInstance(_appInstance);
      setAppStatus(_appStatus);
    } catch (error) {
      toast.error("Error on contract : " + error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="Wrapper">
      <ContractsProvider
        appInstance={appInstance}
        appStatus={appStatus}
        dataInstance={dataInstance}
      >
        <div className="App-content-dashboard">
          <AccountInformations></AccountInformations>
          <ContractsInformations></ContractsInformations>
        </div>
        <div className="App-content-dashboard">
          <FlightForm></FlightForm>
        </div>
        <div className="App-content-dashboard">
          <FlightForm></FlightForm>
        </div>
      </ContractsProvider>
    </div>
  );
}

export default Dashboard;
