import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { useState } from "react";

import { RiAccountCircleFill } from "react-icons/ri";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { Web3Context } from "../Providers/Web3Provider";
import Web3 from "web3";

function AccountInformations() {
  const { provider, account } = useContext(Web3Context);
  const [balance, setBalance] = useState(0);

  const test = new Web3(provider);

  test.eth.getBalance(account).then((value) => {
    setBalance(test.utils.fromWei(value, "ether"));
  });

  return (
    <div className="App-content-dashboard-user-account">
      <p>
        <RiAccountCircleFill className="Icon-grey" /> {account}{" "}
      </p>
      <p>
        <FaRegMoneyBillAlt className="Icon-grey" /> {balance} ETH{" "}
      </p>
      <p>
        Status :
        <AiFillCheckCircle className="Icon-green" />
      </p>
    </div>
  );
}

export default AccountInformations;
