import ConsenSy from "../../assests/consenSy.svg";
import Covalent from "../../assests/covalent.svg";
import Push from "../../assests/push.svg";
import GnosisSafe from "../../assests/gnosis-safe.png";
import FileCoin from "../../assests/filecoin.png";
import QuickNode from "../../assests/quicknode.svg";
import Ens from "../../assests/ens.svg";
import EnsLogo from "../../assests/ens-logo.svg";
import Polygon from "../../assests/polygon.png";
import worldCoin from "../../assests/worldcoin.png";
import valist from "../../assests/valist.svg";
import Moonbeam from "../../assests/moonbeam.png";
import Gnosis from "../../assests/gnosis.png";
import Cronos from "../../assests/cronos.svg";
import Goreil from "../../assests/goerli.svg";

function Sponsors() {
	return (
		<div className="sponsors">
			<div className="marquee">
				<div class="sponsors-item">
					<img src={ConsenSy} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={Covalent} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={Push} style={{ width: "7rem" }} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={GnosisSafe} style={{ width: "7rem" }} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={FileCoin} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={QuickNode} alt="" />
				</div>

				<div class="sponsors-item ens">
					<div>
						<img src={EnsLogo} alt="" />
						<img src={Ens} alt="" />
					</div>
				</div>

				<div class="sponsors-item">
					<img src={worldCoin} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={Polygon} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={Moonbeam} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={Gnosis} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={Cronos} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={Goreil} style={{ width: "4rem" }} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={valist} alt="" style={{ width: "7rem" }} />
				</div>

				<div class="sponsors-item">
					<img src={ConsenSy} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={Covalent} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={Push} style={{ width: "7rem" }} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={GnosisSafe} style={{ width: "7rem" }} alt="" />
				</div>

				<div class="sponsors-item">
					<img src={FileCoin} alt="" />
				</div>
			</div>
		</div>
	);
}

export default Sponsors;
