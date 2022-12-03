import { Link, useNavigate } from "react-router-dom";
import NotFoundImg from "../assests/404.svg";

function NotFound() {
	const navigate = useNavigate();

	const handleWalletNavigate = () => {
		navigate("/wallet");
	};
	return (
		<div className="not-found">
			<img src={NotFoundImg} alt="" />

			<div className="not-found__navigate">
				<h2 className="pacifico">Go to working Pages</h2>

				<div className="not-found__navigate-links">
					<Link to="/">Home</Link>

					<div onClick={handleWalletNavigate} className="button">
						<Link to="/wallet">Launch App</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
