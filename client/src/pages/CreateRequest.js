import { useState, useEffect } from "react";
import Token from "../components/request/Token";
import CreateRequestForm from "../components/request/CreateRequestForm";
import { getAddress, getChainId } from "../backendConnectors/integration";
import Loader from "../components/Loader";
import FetchingLoader from "../components/FetchingLoader";
import Error from "../components/Error";

import Polygon from "../assests/polygon.png";
import Moonbeam from "../assests/moonbeam.png";
import Gnosis from "../assests/gnosis.png";
import Cronos from "../assests/cronos.svg";
import Goerli from "..//assests/goerli.svg";
import { WorldIDWidget } from "@worldcoin/id";

function CreateRequest() {
	const [userTokens, setUserTokens] = useState([]);
	const [tokenDetails, setTokenDetails] = useState({
		name: "",
		address: "",
		decimal: "",
	});
	const [loading, setLoading] = useState(false);
	const [fetchLoading, setFetchingLoading] = useState(true);
	const [metamaskDetails, setMetamaskDetails] = useState({
		chainId: "",
		address: "",
		img: "",
	});

	const [err, setErr] = useState({
		state: false,
		message: "",
	});

	useEffect(() => {
		getAddress()
			.then((address) => {
				getChainId()
					.then((chainId) => {
						let tempImg;
						const userTokenEndpoint = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?&key=${process.env.REACT_APP_API_KEY}`;

						if (chainId == 80001) {
							tempImg = Polygon;
						} else if (chainId == 1287) {
							tempImg = Moonbeam;
						} else if (chainId == 10200) {
							tempImg = Gnosis;
						} else if (chainId == 338) {
							tempImg = Cronos;
						} else if (chainId == 5) {
							tempImg = Goerli;
						}

						setMetamaskDetails({
							chainId,
							address,
							img: tempImg,
						});

						fetch(userTokenEndpoint)
							.then((res) => res.json())
							.then((tokenList) => {
								if (tokenList.data) setUserTokens(tokenList.data.items);
								setFetchingLoading(false);
							});
					})
					.catch((err) => {
						console.log(err);
						setErr({
							state: true,
							message: "Can't fetch user token!",
						});

						setTimeout(() => {
							setErr({
								state: false,
								message: "",
							});
						}, 2000);

						setFetchingLoading(false);
					});
			})
			.catch((err) => {
				console.log(err);
				setErr({
					state: true,
					message: "Can't fetch user address!",
				});

				setTimeout(() => {
					setErr({
						state: false,
						message: "",
					});
				}, 2000);

				setFetchingLoading(false);
			});
	}, []);

	const handleClick = (name, address, decimal) => {
		setTokenDetails({
			name,
			address,
			decimal,
		});
	};

	const [tokenFees, setTokenFees] = useState("0x2386F26FC10000");

	const Tokens = userTokens.map((item, index) => {
		if (
			item.contract_address !== "0x0000000000000000000000000000000000001010" &&
			item.contract_address !== "0x0000000000006d6f6f6e626173652d616c706861" &&
			item.contract_address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
		)
			return (
				<Token
					key={item.contract_address}
					decimal={item.contract_decimals}
					name={item.contract_name}
					logo={item.logo_url}
					balance={item.balance}
					symbol={item.contract_ticker_symbol}
					contractAddress={item.contract_address}
					onClick={handleClick}
				/>
			);
	});

	return (
		<div className={`create-will ${loading ? "relative" : ""}`}>
			{err.state && <Error message={err.message} />}

			{loading && <Loader />}

			<div className="create-will__token">
				<div className="create-will__token-list">
					<h3 className="create-will__head">My tokens</h3>

					<div
						className={`create-will__token-list__items ${
							userTokens.length <= 1 ? "flex" : ""
						} ${fetchLoading ? "column" : ""}`}
					>
						<h3
							title="Click on any token to get its details"
							// className={`${userTokens.length === 1 ? "none" : ""}`}
						>
							Select your token
						</h3>

						{fetchLoading ? (
							<FetchingLoader />
						) : userTokens.length <= 1 ? (
							<p>
								You don't have any tokens. Get some ERC20 token to try our Dapp
							</p>
						) : (
							Tokens
						)}
					</div>
				</div>

				<div className="create-will__token-form">
					<div className="metamask-details">
						<div>
							<h3 className="create-will__head">Network:</h3>

							{/* {metamaskDetails.chainId && <p>{metamaskDetails.chainId}</p>} */}
							<img
								src={metamaskDetails.img}
								className={`${metamaskDetails.chainId == 5 ? "goerli" : ""}`}
								alt=""
							/>
						</div>

						<div>
							<h3 className="create-will__head">Address:</h3>

							{metamaskDetails.address && (
								<p title={metamaskDetails.address}>
									{metamaskDetails.address.slice(0, 5) +
										"....." +
										metamaskDetails.address.slice(-5)}
								</p>
							)}
						</div>
					</div>

					<div className="create-will__token-form__input">
						<h3 className="pacifico">Create your BeQuest request</h3>

						<CreateRequestForm
							tokenDetails={tokenDetails}
							setLoading={setLoading}
							tokenFees={tokenFees}
							setTokenFees={setTokenFees}
							address={metamaskDetails.address}
						/>
						<br />
						<div className="world-coin">
							<WorldIDWidget
								actionId="wid_staging_9f3a190dcfd6bcd9a27f6f88bc31793e" // obtain this from developer.worldcoin.org
								signal={metamaskDetails.address}
								enableTelemetry={true}
								theme={"dark"}
								onSuccess={(verificationResponse) => {
									console.log(verificationResponse);

									setTokenFees("0x0");

									// fetch("https://developer.worldcoin.org/api/v1/verify", {
									// 	method: "POST",
									// 	headers: { "Content-type": "application/json" },
									// 	body: JSON.stringify({
									// 		merkle_root: verificationResponse.merkle_root,
									// 		nullifier_hash: verificationResponse.nullifier_hash,
									// 		action_id: "wid_staging_9f3a190dcfd6bcd9a27f6f88bc31793e",
									// 		signal: metamaskDetails.address,
									// 		proof: verificationResponse.proof,
									// 	}),
									// })
									// 	.then((res) => res.json())
									// 	.then((res) => {
									// 		console.log(res);
									// 	})
									// 	.catch((err) => {
									// 		console.log(err);
									// 	});
								}} // you'll actually want to pass the proof to the API or your smart contract
								onError={(error) => setTokenFees("0x2386F26FC10000")}
								onInitSuccess={() => console.log("Init successful")}
								onInitError={(error) =>
									console.log("Error while initialization World ID", error)
								}
							/>

							<p>
								Optional: Verify yourself with WorldCoin and get one BeQuest
								request for free.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* <a
				className="test-faucet"
				href="https://ismaventuras.github.io/ERC20-Faucet/"
				target="_blank"
			>
				Click here to get test faucet
			</a> */}
		</div>
	);
}

export default CreateRequest;
