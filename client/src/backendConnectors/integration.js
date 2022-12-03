import { ethers } from "ethers";
import abi from "./abi/bequesterc20abi.json";
import ERC20 from "./abi/ERC20.json";
import { Web3Storage } from "web3.storage";
import detectEthereumProvider from "@metamask/detect-provider";
import { push } from "./push/push";

export async function approveRequest(address, amt) {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);

		const signer = provider.getSigner();
		const contract = new ethers.Contract(address, ERC20, signer);
		let chainAddress = await getChainAddress();
		let tx = await contract.approve(chainAddress, amt);
		await tx.wait();
		return { status: true };
	} catch (err) {
		let msg;
		if (err.code === -32603) {
			msg = "User rejected transaction!";
		} else msg = err.message.split("(")[0];

		return { status: false, msg };
	}
}

export async function signRequest(
	tokenName,
	time,
	amount,
	decimal,
	benificary,
	tokenAddress,
	message,
	videoLink = ""
) {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		let chainAddress = await getChainAddress()
		const contract = new ethers.Contract(
			chainAddress,
			abi,
			signer
		);
		let tx = await contract.signWill(
			tokenName,
			time,
			amount,
			benificary,
			tokenAddress,
			message,
			videoLink,
			decimal,
			{ value: "0x2386F26FC10000" }
		);
		await tx.wait();
		let from = await getAddress();
		await push("sign", from, benificary);
		return { status: true };
	} catch (err) {
		let msg;
		if (err.code === -32603) {
			msg = "User rejected transaction!";
		} else msg = err.message.split("(")[0];

		return { status: false, msg };
	}
}

export async function getAddress() {
	const provider = await detectEthereumProvider();
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	await delay(500);
	if (provider && provider.selectedAddress) {
		return provider.selectedAddress;
	} else {
		return;
	}
}
export async function getChainId() {
	const provider = await detectEthereumProvider();
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	await delay(500);
	if (provider && provider.selectedAddress) {
		return provider.networkVersion;
	} else {
		return false;
	}
}

export async function getView() {
	let obj = [];
	const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
	await provider.send("eth_requestAccounts", []);
	const signer = provider.getSigner();
	const address = await signer.getAddress();
	let chainAddress = await getChainAddress()
	const contract = new ethers.Contract(
		chainAddress,
		abi,
		signer
	);
	let data = await contract.getAllUsersId(address);

	for (let i = 0; i < data.length; i++) {
		let id = parseInt(data[i]._hex);
		let will = await contract.willList(id);
		obj.push(will);
	}

	return obj;
}

export async function getBenificary() {
	let obj = [];
	const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
	await provider.send("eth_requestAccounts", []);
	const signer = provider.getSigner();
	const address = await signer.getAddress();
	let chainAddress = await getChainAddress();
	const contract = new ethers.Contract(
		chainAddress,
		abi,
		signer
	);
	let data = await contract.getAllBeneficiaryId(address);

	for (let i = 0; i < data.length; i++) {
		let id = parseInt(data[i]._hex, 16);
		let will = await contract.willList(id);
		obj.push(will);
	}

	return obj;
}

export async function storeFiles(files) {
	try {
		const client = makeStorageClient();
		const cid = await client.put(files);
		return { success: true, cid };
	} catch (error) {
		return { success: false, msg: error.msg };
	}
}

function makeStorageClient() {
	return new Web3Storage({
		token: process.env.REACT_APP_FILECOIN_API_KEY,
	});
}

export async function stop(id) {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const address = await signer.getAddress();
		let chainAddress = await getChainAddress();
		const contract = new ethers.Contract(
			process.env.REACT_APP_BEQUEST_ADDRESS,
			abi,
			signer
		);
		let tx = await contract.stopWill(id);
		await tx.wait();
		return { success: true };
	} catch (err) {
		let msg;
		if (err.code === -32603) {
			msg = "User rejected transaction!";
		} else msg = err.message.split("(")[0];

		return { status: false, msg };
	}
}

export async function resume(id) {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		// const address = await signer.execution();
		let chainAddress = await getChainAddress();
		const contract = new ethers.Contract(
			chainAddress,
			abi,
			signer
		);
		let tx = await contract.resumeWill(id);
		await tx.wait();
		return { success: true };
	} catch (err) {
		let msg;
		if (err.code === -32603) {
			msg = "User rejected transaction!";
		} else msg = err.message.split("(")[0];

		return { status: false, msg };
	}
}

export async function changeTime(id, days) {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const address = await signer.getAddress();
		let chainAddress = await getChainAddress();
		const contract = new ethers.Contract(
			chainAddress,
			abi,
			signer
		);

		let seconds = days * 24 * 60 * 60;
		let tx = await contract.extendtWill(id, seconds);
		await tx.wait();
		return { success: true };
	} catch (err) {
		let msg;
		if (err.code === -32603) {
			msg = "User rejected transaction!";
		} else msg = err.message.split("(")[0];

		return { status: false, msg };
	}
}
export async function execute(id) {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const address = await signer.getAddress();
		let chainAddress = await getChainAddress();
		const contract = new ethers.Contract(
			chainAddress,
			abi,
			signer
		);
		let tx = await contract.executeWill(id);
		await tx.wait();
		return { success: true };
	} catch (err) {
		let msg;
		if (err.code === -32603) {
			msg = "User rejected transaction!";
		} else msg = err.message.split("(")[0];

		return { status: false, msg };
	}
}
export async function getTime(id) {
	const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
	await provider.send("eth_requestAccounts", []);
	const signer = provider.getSigner();
	const address = await signer.getAddress();
	let chainAddress = await getChainAddress();
	const contract = new ethers.Contract(
		chainAddress,
		abi,
		signer
	);
	let data = await contract.getTimeReamaing(id);
	return data;
}

export async function changeChain(id) {
	try {
		let provider = await detectEthereumProvider();
		if (provider)
			await provider.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: id }],
			});
		console.log("You have succefully switched to Binance Test network");
	} catch (switchError) {
		// This error code indicates that the chain has not been added to MetaMask.
		if (switchError.code === 4902) {
			let provider = await detectEthereumProvider();
			if (provider) {
				let obj;
				if (id == "0x13881") {
					//polygon
					obj = {
						chainId: "0x13881",
						chainName: "Polygon Mumbai",
						rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
						blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
						nativeCurrency: {
							symbol: "Matic",
							decimals: 18,
						},
					};
				}
				if (id == "0x507") {
					//moonbeam
					obj = {
						chainId: "0x507",
						chainName: "moonbase-alphanet",
						rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
						blockExplorerUrls: ["https://moonbase.moonscan.io"],
						nativeCurrency: {
							symbol: "DEV",
							decimals: 18,
						},
					};
				}
				if (id == "0x27d8") {
					//gnosis
					obj = {
						chainId: "0x27d8",
						chainName: "Chiado (Gnosis)",
						rpcUrls: [
							"https://rpc.eu-central-2.gateway.fm/v3/gnosis/archival/chiado",
						],
						blockExplorerUrls: ["https://blockscout.chiadochain.net"],
						nativeCurrency: {
							symbol: "xDAI",
							decimals: 18,
						},
					};
				}
				if (id == "0x152") {
					//cronos
					obj = {
						chainId: "0x152",
						chainName: "Cronos Testnet",
						rpcUrls: ["https://evm-t3.cronos.org"],
						blockExplorerUrls: ["https://testnet.cronoscan.com"],
						nativeCurrency: {
							symbol: "tCRO",
							decimals: 18,
						},
					};
				}
				await provider.request({
					method: "wallet_addEthereumChain",
					params: [obj],
				});
			}
		}
		console.log("Failed to switch to the network");
	}
}




export async function getChainAddress(){

	let provider = await detectEthereumProvider()
	if(provider){

		const id = await provider.networkVersion

		if(id == 80001){
			return "0xf97eee8955437C3d89977599e1B76D9f07D6b114"
		}
		if(id == 5){
			return "0xEcDCa539396fC1EFd3828c7b0D4f6dEDBcBbBbB1"
		}
		if(id == 338){
			//genosis
		}
		if(id == 1287){
			//moonbeam
		}
		if(id == 1338){
		//cronos
		}

	}

}

