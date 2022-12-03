import Logo from "../../assests/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function Nav() {
	const navigate = useNavigate();
	const navRef = useRef();

	useEffect(() => {
		var prevScrollpos = window.pageYOffset;

		window.onscroll = function () {
			var currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				navRef.current.style.transform = "translateY(0)";
			} else {
				navRef.current.style.transform = "translateY(-6.5rem)";
			}
			prevScrollpos = currentScrollPos;
		};
	});

	const handleLogoClick = () => {
		navigate("/");
	};

	const handleWalletNavigate = () => {
		navigate("/wallet");
	};

	

	return (
		<nav className="home-nav" ref={navRef}>
			<div className="home-nav__logo">
				<img onClick={handleLogoClick} src={Logo} alt="" />
			</div>

			<div className="home-nav__links">
				<ul className="home-nav__links-ul">
					<li className="home-nav__links-ul__li">
						<a href="#about">About</a>
					</li>

					<li className="home-nav__links-ul__li">
						<a href="#why">Why</a>
					</li>

					<li className="home-nav__links-ul__li">
						<a href="#plans">Features</a>
					</li>
				</ul>
			</div>

			<div onClick={handleWalletNavigate} className="button home-nav__launch">
				<Link to="/wallet">Launch App</Link>
			</div>
		</nav>
	);
}

export default Nav;
