import BeQuestLogo from "../../assests/final-logo.png";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

function About() {
	const { ref, inView, entry } = useInView({
		threshold: 0.3,
	});
	const leftCardRef = useRef();
	const rightCardRef = useRef();

	useEffect(() => {
		if (inView) {
			leftCardRef.current.classList.add("left");
			rightCardRef.current.classList.add("right");
		}
	}, [inView]);

	return (
		<div ref={ref} className="about" id="about">
			<img src={BeQuestLogo} alt="BeQuest" />

			<div className="about-card">
				<div className="about-card-item" ref={leftCardRef}>
					<h2 className="about-card-item__head">About BeQuest Protocol</h2>
					<div className="about-car-item__text">
						<p className="about-card-item__text-p">
						BeQuest Protocol was created to protect digital assets in the event of the loss of a private key or death.
						</p>

						<p className="about-card-item__text-p">
						The assets will always be at the owner's address and will be transferred to their beneficiary according to their request.
						</p>
					</div>
				</div>

				<div className="about-card-item item-right" ref={rightCardRef}>
					<h2 className="about-card-item__head">
					Fully Decentralized : Web3 Solution
					</h2>

					<div className="about-car-item__text">
						<p className="about-card-item__text-p">
						The user doesn't have to share their precious private key with anyone. Just approve the asset and sign your request in Bequest Protocol's smart contract.
						</p>
						<p className="about-card-item__text-p">
						Your request will be carried out correctly by a smart contract.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
