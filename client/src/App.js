import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Web3Context } from "./Providers/Web3Provider";
import { useContext } from "react";
import Connect from "./Pages/Connect";
import Dashboard from "./Pages/Dashboard";

function App() {
  const { providerConnected, accountConnected } = useContext(Web3Context);

  return (
    <div className="App">
      {!providerConnected || !accountConnected ? (
        <Connect></Connect>
      ) : (
        <Dashboard></Dashboard>
      )}
    </div>
  );
}

export default App;
