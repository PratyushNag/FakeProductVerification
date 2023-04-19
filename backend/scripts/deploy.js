const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    try {
        const NFT = await ethers.getContractFactory("MintProductNFT");
        const nft = await NFT.deploy("MintProductNFT", "MPN");
        await nft.deployed();
        console.log("Contract address:", nft.address);
        console.log("Contract published");

        console.log("Sleeping.....");
        await sleep(40000);

        await hre.run("verify:verify", {
            address: nft.address,
            constructorArguments: ["MintProductNFT", "MPN"],
        });
    }
    catch (error) {
        console.error(error);
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});