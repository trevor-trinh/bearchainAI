import { ethers } from 'hardhat';

const main = async () => {
  const bearchainAI = await ethers.getContractFactory('bearchainAI');
  const bearchainai = await bearchainAI.deploy();
  await bearchainai.deployed();

  console.log('bearchainAI deployed to: ', bearchainai.address);
};
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
