export default function main(artifacts: Truffle.Artifacts, web3: Web3) {
  type Network = "development" | "kovan" | "mainnet";
  return async (
    deployer: Truffle.Deployer,
    network: Network,
    accounts: string[]
  ) => {
    const Tether = artifacts.require("Tether");
    const RWD = artifacts.require("Reward");
    const DecentralBank = artifacts.require("DecentralBank");
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();
    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();
    //Transfer all RWD tokens to Decentral Bank
    await rwd.transfer(decentralBank.address, "1000000000000000000000000");
    // Distribute 100 Tether tokens to investor
    await tether.transfer(accounts[1], "1000000000000000000");
    console.log(`Defi Staking app deployed at ${decentralBank.address}`);
  };
}
