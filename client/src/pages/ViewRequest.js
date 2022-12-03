import { useRef, useEffect, useState } from "react";
import RequestCard from "../components/request/RequestCard";
import { getView, getTime } from "../backendConnectors/integration";
import FetchingLoader from "../components/FetchingLoader";
import { ethers } from "ethers";
import Error from "../components/Error";
import Loader from "../components/Loader";

function ViewRequest() {
	const [willData, setWillData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [cardLoading, setCardLoading] = useState(false);

	const [err, setErr] = useState({
		state: false,
		message: "",
	});

	useEffect(() => {
		getView()
			.then((res) => {
				setWillData(res);
			})
			.catch((err) => {
				console.log(err);

				setErr({
					state: true,
					message: "Can't fetch request card!",
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

	const willCard = willData.map((card) => {
		let id = parseInt(card.id._hex);
		let amount = card.amt._hex.toString();

		let deadLine = parseInt(card.dedline._hex);
		deadLine = new Date(deadLine * 1000);

		let decimal = parseInt(card.decimal._hex);

		amount = ethers.utils.formatUnits(amount, decimal);

		return (
			<RequestCard
				key={id}
				id={id}
				tokenName={card.tokenName}
				amount={amount}
				timeOfExecution={deadLine.toString()}
				to={card.to}
				status={card.status}
				setCardLoading={setCardLoading}
			/>
		);
	});

	return (
		<div className={`view-will ${willCard.length > 0 ? "" : "center"}`}>
			{err.state && <Error message={err.message} />}

			{cardLoading && <Loader />}

			{loading ? (
				<FetchingLoader />
			) : willCard.length > 0 ? (
				willCard
			) : (
				<p>No BeQuest request created till now!</p>
			)}
		</div>
	);
}

export default ViewRequest;
