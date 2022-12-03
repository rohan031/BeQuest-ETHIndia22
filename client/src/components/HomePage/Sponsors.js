import PolygonLogo from "../../assests/polygon.png";
import ChainlinkLogo from "../../assests/chainlink.png";

function Sponsors() {
	return (
		<div className="sponsors">
			<div className="sponsors-logo">
				<img
					src={PolygonLogo}
					style={{
						objectFit: "contain",
					}}
					alt=""
				/>
				<span className="sponsors-logo__seperator"> </span>
				<img src={ChainlinkLogo} alt="" />
			</div>

			<div className="sponsors-text">
				<p className="sponsors-text__p">
					* chainlink automation : asset transfering using chainlink keeper
				</p>
				<p className="sponsors-text__p">
					* polygon chain's digital assets supported : ERC20 Tokens Like USDT,
					etc.
				</p>
			</div>
		</div>
	);
}

export default Sponsors;
