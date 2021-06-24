var SingDao = artifacts.require("./SingDao/SingDao.sol");

module.exports = function(deployer) {
  deployer.deploy(SingDao, '0x2428E42387373C4D3cECFEc76c0e1248b3D46447');
};
