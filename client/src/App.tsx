import React, { useState, useEffect, useCallback } from "react";
import "./css/App.css";
import { Contract } from "web3-eth-contract";
import NumberFormat from "react-number-format";
import SingDaoContract from "./contracts/SingDao.json";
import SingularityNetTokenContract from "./contracts/SingularityNetToken.json";
import useWeb3 from "./hooks/web3";

const App: React.VFC = () => {
  const { isLoading, isWeb3, web3, accounts } = useWeb3();
  const [agixInstance, setAgixInstance] = useState<Contract>();
  const [sdaoInstance, setSdaoInstance] = useState<Contract>();
  const [agixBalance, setAgixBalance] = useState(0);
  const [sdaoBalance, setSdaoBalance] = useState(0);
  const [agixDecimals, setAgixDecimals] = useState(0);
  const [sdaoDecimals, setSdaoDecimals] = useState(0);

  const getBalances = useCallback(async () => {
    // --- SDAO ---

    // Get the value from the contract to prove it worked.
    const sdaoBalanceResponse = await sdaoInstance?.methods
      .balanceOf(accounts[0])
      .call();
    const sdaoDecimalsResponse = await sdaoInstance?.methods.decimals().call();

    // Update state with the result.
    setSdaoBalance(sdaoBalanceResponse || 0);
    setSdaoDecimals(sdaoDecimalsResponse ? Number(sdaoDecimalsResponse) : 0);

    // --- AGIX ---

    // Get the value from the contract to prove it worked.
    const agixBalanceResponse = await agixInstance?.methods
      .balanceOf(accounts[0])
      .call();
    const agixDecimalsResponse = await agixInstance?.methods.decimals().call();

    // Update state with the result.
    setAgixBalance(agixBalanceResponse || 0);
    setAgixDecimals(agixDecimalsResponse || 0);
  }, [accounts, agixInstance?.methods, sdaoInstance?.methods]);

  const getDisplayedBalance = (
    amount: number,
    symbol: string,
    decimals: number
  ) => (
    <span>
      <NumberFormat
        thousandSeparator=","
        decimalSeparator="."
        displayType="text"
        value={amount / Math.pow(10, decimals)}
      />{" "}
      {symbol}
    </span>
  );

  useEffect(() => {
    (async () => {
      if (web3 !== null) {
        const networkId = await web3.eth.net.getId();

        const sdaoAbi: any = SingDaoContract.abi;
        const agixAbi: any = SingularityNetTokenContract.abi;
        const sdaoDeployedNetwork = (
          SingDaoContract.networks as { [id: number]: any }
        )[networkId];
        const agixDeployedNetwork = (
          SingularityNetTokenContract.networks as { [id: number]: any }
        )[networkId];
        const sdaoInstance = new web3.eth.Contract(
          sdaoAbi,
          sdaoDeployedNetwork && sdaoDeployedNetwork.address
        );
        setSdaoInstance(sdaoInstance);
        const agixInstance = new web3.eth.Contract(
          agixAbi,
          agixDeployedNetwork && agixDeployedNetwork.address
        );
        setAgixInstance(agixInstance);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isWeb3]);

  useEffect(() => {
    if (sdaoInstance && agixInstance) {
      getBalances();
    }
  }, [sdaoInstance, agixInstance, getBalances]);

  return (
    <div className="App">
      {isLoading ? (
        <div>Loading Web3, accounts, and contract...</div>
      ) : isWeb3 ? (
        <>
          <h1>Airdrop Portal</h1>
          <div>Eth Address: {accounts[0]}</div>
          <div>
            Your AGIX balance is:{" "}
            <b>{getDisplayedBalance(agixBalance, "AGIX", agixDecimals)}</b>
          </div>
          <div>
            Your SDAO balance is:{" "}
            <b>{getDisplayedBalance(sdaoBalance, "SDAO", sdaoDecimals)}</b>
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
