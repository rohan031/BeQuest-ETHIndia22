import { useRef, useEffect, useState } from "react";
import BeneficiaryCard from "../components/request/BeneficiaryCard";
import { getBenificary } from "../backendConnectors/integration";
import FetchingLoader from "../components/FetchingLoader";
import { ethers } from "ethers";
import Error from "../components/Error";
import Loader from "../components/Loader";

function Beneficiary() {
	const [beneficiaryData, setBeneficiaryData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState({
		state: false,
		message: "",
	});

	const [cardLoading, setCardLoading] = useState(false);

	useEffect(() => {
		getBenificary()
			.then((res) => {
				setBeneficiaryData(res);
			})
			.catch((err) => {
				console.log(err);

				setErr({
					state: true,
					message: "Can't fetch benificary card!",
				});

				setTimeout(() => {
					setErr({
						state: false,
						message: "",
					});
				}, 2000);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const beneficiaryCard = beneficiaryData.map((card) => {
		let id = parseInt(card.id._hex);
		let amount = card.amt._hex.toString();

		let deadLine = parseInt(card.dedline._hex);
		deadLine = new Date(deadLine * 1000);

		let decimal = parseInt(card.decimal._hex);

		amount = ethers.utils.formatUnits(amount, decimal);

		return (
			<BeneficiaryCard
				key={id}
				id={id}
				tokenName={card.tokenName}
				amount={amount}
				from={card.from}
				timeOfExecution={deadLine.toString()}
				time={deadLine}
				status={card.status}
				message={card.message}
				video={card.video}
				setCardLoading={setCardLoading}
			/>
		);
	});

	return (
		<div
			className={`beneficiary ${beneficiaryCard.length > 0 ? "" : "center"}`}
		>
			{err.state && <Error message={err.message} />}

			{cardLoading && <Loader />}

			{loading ? (
				<FetchingLoader />
			) : beneficiaryCard.length > 0 ? (
				beneficiaryCard
			) : (
				"No one added you as a Beneficiary yet :("
			)}
		</div>
	);
}

export default Beneficiary;
