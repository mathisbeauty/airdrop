var SingDao = artifacts.require("./SingDao/SingDao.sol");
var SingNet = artifacts.require("./SingNet/SingularityNetToken.sol");

module.exports = async function(deployer) {
  await deployer.deploy(SingDao, '0x2428E42387373C4D3cECFEc76c0e1248b3D46447');
  await deployer.deploy(SingNet, 'Singularity Net token', 'AGIX');
  
  // Mint 1 million AGIX tokens
  var agixInstance = await SingNet.deployed();
  await agixInstance.mint('0x2428E42387373C4D3cECFEc76c0e1248b3D46447', 1000000 * Math.pow(10, 8));
};
