import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import BequestLogo from "../assests/logo-name.png";
import { useState, useEffect, useRef } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { getChainId } from "../backendConnectors/integration";
import Error from "../components/Error";

function Dashboard() {
	const [navState, setNavState] = useState(false);
	const navRef = useRef();
	const navigate = useNavigate();
	const [err, setErr] = useState({
		state: false,
		message: "",
	});

	const walletCheck = async () => {
		const provider = await detectEthereumProvider();
		const delay = (ms) => new Promise((res) => setTimeout(res, ms));
		await delay(500);
		if (provider && provider.selectedAddress) {
			//connect
			provider.on("connect", (ConnectInfo) => window.location.reload());
			//disconect
			provider.on("disconnect", (ProviderRpcError) => window.location.reload());
			//change address
			provider.on("accountsChanged", (accounts) => window.location.reload());
			//chain change
			provider.on("chainChanged", (_chainId) => window.location.reload());

			// chain error handling

			getChainId().then((chainId) => {
				if (chainId) {
					if (
						chainId != 80001 &&
						chainId != 1287 &&
						chainId != 10200 &&
						chainId != 338 &&
						chainId != 5
					) {
						setErr({
							state: true,
							message: "Unsupported chain. Redirecting you to wallet page.",
						});

						setTimeout(() => {
							setErr({
								state: false,
								message: "",
							});

							navigate("/wallet");
						}, 2000);
					}
				} else {
					console.log("Error loading chain details");

					setErr({
						state: true,
						message: "Error loading chain details!",
					});

					setTimeout(() => {
						setErr({
							state: false,
							message: "",
						});
					}, 2000);
				}
			});
		} else {
			navigate("/wallet");
		}
	};

	useEffect(() => {
		walletCheck();
	}, []);

	useEffect(() => {
		if (navState) {
			navRef.current.classList.add("open");
		} else {
			navRef.current.classList.remove("open");
		}
	}, [navState]);

	const handleChange = (e) => {
		setNavState(e.target.checked);
	};

	const hideNav = () => {
		setNavState(false);
	};

	return (
		<div className="dashboard">
			{err.state && <Error message={err.message} />}

			<div className="dashboard-nav">
				<Link to="/">
					<img src={BequestLogo} alt="" />
				</Link>

				<div className="dashboard-nav__links">
					<div className="dashboard-nav__links-toggle">
						<input
							type="checkbox"
							id="toggle"
							onChange={handleChange}
							checked={navState}
						/>
						<label htmlFor="toggle">
							<span></span>
							<span></span>
							<span></span>
						</label>
					</div>

					<ul className="dashboard-nav__links-ul" ref={navRef}>
						<li>
							<NavLink
								to="/dashboard/create-request"
								className={(navData) => (navData.isActive ? "active" : "")}
								onClick={hideNav}
							>
								Create
							</NavLink>
						</li>

						<li>
							<NavLink
								to="/dashboard/view-request"
								className={(navData) => (navData.isActive ? "active" : "")}
								onClick={hideNav}
							>
								View
							</NavLink>
						</li>

						<li>
							<NavLink
								to="/dashboard/beneficiary"
								className={(navData) => (navData.isActive ? "active" : "")}
								onClick={hideNav}
							>
								Beneficiary
							</NavLink>
						</li>

						<li>
							<a
								target="_blank"
								href="https://drive.google.com/file/d/1k7oVW-qV1vxp7pPidyastOgYSmrfKHFx/view?usp=sharing"
								onClick={hideNav}
							>
								Docs
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="dashboard-content">
				<Outlet></Outlet>
			</div>
		</div>
	);
}

export default Dashboard;
