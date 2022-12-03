import Web3Img from "../../assests/Bitcoin-bro.svg";
import { Link, useNavigate } from "react-router-dom";

function Intro() {
	const navigate = useNavigate();

	const handleWalletNavigate = () => {
		navigate("/wallet");
	};
	return (
		<div className="intro">
			<div className="intro-img">
				<img src={Web3Img} alt="" />
			</div>

			<div className="intro-text">
				<h1 className="intro-text__head bequest-gradient">
					Bequest your legacy now
				</h1>

				<p className="intro-text__p">
				More than $20 billion in digital assets (coins, tokens, and nfts) have already been lost as a result of the loss of private keys or death.
				</p>

				<p className="intro-text__p">
				Bequest Protocol enables users to leave their digital assets, such as wrapped coins, tokens, NFTs, and so on, to their next wallet or beneficiary's address.
				</p>

				<div className="intro-text__launch">
					<button className="button" onClick={handleWalletNavigate}>
						<Link to="/wallet">Launch App</Link>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Intro;
