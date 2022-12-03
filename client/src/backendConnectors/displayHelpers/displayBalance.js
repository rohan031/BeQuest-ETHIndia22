import { ethers } from "ethers";

const data = (num, decimal) => {
	let x = ethers.utils.formatUnits(num, decimal);
	return x;
};

export default data;
