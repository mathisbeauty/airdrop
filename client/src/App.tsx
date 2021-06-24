import React, { useState, useEffect } from "react";
import "./css/App.css";
import { Contract } from "web3-eth-contract";
import NumberFormat from "react-number-format";
import SingDaoContract from "./contracts/SingDao.json";
import useWeb3 from "./hooks/web3";

const App: React.VFC = () => {
  const { isLoading, isWeb3, web3, accounts } = useWeb3();
  const [instance, setInstance] = useState<Contract>();
  const [value, setValue] = useState(0);

  const abi = SingDaoContract.abi;

  const getBalance = async () => {
    // Get the value from the contract to prove it worked.
    const response = await instance?.methods.balanceOf(accounts[0]).call();

    // Update state with the result.
    console.log(response, instance);
    setValue(response || 0);
  };

  console.log(value, web3?.utils);

  const displayedBalance = (
    <span>
      <NumberFormat
        thousandSeparator=","
        decimalSeparator="."
        displayType="text"
        value={value / Math.pow(10, 18)}
      />{" "}
      SDAO
    </span>
  );

  useEffect(() => {
    (async () => {
      if (web3 !== null) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = (
          SingDaoContract.networks as { [id: number]: any }
        )[networkId];
        const instance = new web3.eth.Contract(
          abi as any,
          deployedNetwork && deployedNetwork.address
        );
        setInstance(instance);
      }
    })();
  }, [isLoading, isWeb3]);

  useEffect(() => {
    if (instance) {
      getBalance();
    }
  }, [instance]);

  return (
    <div className="App">
      {isLoading ? (
        <div>Loading Web3, accounts, and contract...</div>
      ) : isWeb3 ? (
        <>
          <h1>Airdrop Portal</h1>
          <div>Eth Address: {accounts[0]}</div>
          <div>
            Your SDAO balance is: <b>{displayedBalance}</b>
          </div>
        </>
      ) : (
        <div>
          <p>Metamask is not installed</p>
        </div>
      )}
    </div>
  );
};

export default App;
