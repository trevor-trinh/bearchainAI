# Blockchain

The blockchain and smart contract development side of bearchainAI.

## Tech Stack

Smart contract made with a these technologies!

- [Solidity](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [OpenZeppelin](https://www.openzeppelin.com/)

## Local Development

To run the deploy contract script on the mumbai network

```bash
npx hardhat run scripts/deploy.ts --network mumbai
```

To verify deployed contract on the mumbai network

```bash
npx hardhat verify --network mumbai <contract address>
```

Contract ABI location: `artifacts/contracts/bearchainAI/bearchainAI.json`
