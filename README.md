# Airdrop Portal

This project contains:
- Smart contracts for the SingDao ERC-20 token (`./contracts/SingDao.sol`). These were downloaded from the official token source [here](https://etherscan.io/address/0x993864e43caa7f7f12953ad6feb1d1ca635b875f#code)
- Smart contracts for the SingNet ERC-20 token (`./contracts/SingDao.sol`). It was downloaded from the official token source [here](https://etherscan.io/address/0x5b7533812759b45c2b44c19e320ba2cd2681b542#code)
- Simple smart contract for simulating basic airdrop mechanics
- React frontend that acts as a simpler version of the airdrop portal

Project bootstrapped with Truffle CLI.

## Requirements

- Node >=14
- [Truffle CLI](https://www.trufflesuite.com/docs/truffle/getting-started/installation)

## Compile and deploy smart contracts

Compile the smart contracts:

```
truffle compile
```

**Note: Before migrating/deploying the smart contracts, make sure to have the Ganache blockchain running and accessible at `http://localhost:8545`.**

You can migrate the smart contracts to the development environment by running:

```
truffle migrate --network develop
```

## Start frontend

You can start the airdrop frontend by running:

```
cd client
yarn start
```
