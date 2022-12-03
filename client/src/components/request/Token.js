import { useRef } from "react";
import { ethers } from "ethers";
import data from "../../backendConnectors/displayHelpers/displayBalance";

function Token({
	decimal,
	name,
	logo,
	balance,
	symbol,
	contractAddress,
	onClick,
}) {
	const imgRef = useRef();
	const tokenRef = useRef();

	const handleImgErr = () => {
		imgRef.current.style.display = "none";
		tokenRef.current.style.display = "block";
	};

	return (
		<div
			className="token"
			onClick={() => onClick(name, contractAddress, decimal)}
		>
			<div className="token-logo">
				<img src={logo} alt={name} onError={handleImgErr} ref={imgRef} />
				<p ref={tokenRef} style={{ display: "none" }}>
					{symbol}
				</p>
			</div>

			<div className="token-info">
				<h4 className="token-info__balance">{data(balance, decimal)}</h4>

				<p className="token-info__name">{name}</p>
			</div>
		</div>
	);
}

export default Token;
