import { Addressable } from "ethers"
import {ethers, run, network} from "hardhat"

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log('deploying..')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.waitForDeployment()

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction()?.wait(6) // wait for 6 blocks
    await verify(simpleStorage.target, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(currentValue)

  // Update
  const tx = await simpleStorage.store(1)
  await tx.wait(1)
  console.log(`Check your tx: sepolia.etherscan.io/tx/${tx.hash}`)
  const updatedValue = await simpleStorage.retrieve()
  console.log(updatedValue, tx)
}

async function verify(contractAddrtess: string | Addressable, args: any){
  console.log("Veryfying contract..")
  try {
    await run("verify:verify", {address: contractAddrtess, constructorArgsParams: args})
    
  } catch (error: any) {
    if(error.message.toLowerCase().includes("already verified")) console.log("Already verified") 
    else console.log(error)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
