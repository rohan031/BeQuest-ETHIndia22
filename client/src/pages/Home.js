import Intro from "../components/HomePage/Intro";
import Nav from "../components/HomePage/Nav";
import Sponsors from "../components/HomePage/Sponsors";
import About from "../components/HomePage/About";
import Why from "../components/HomePage/Why";
import Plans from "../components/HomePage/Plans";
import Footer from "../components/HomePage/Footer";
import Contributors from "../components/HomePage/Contributors.js";

function Home() {
	return (
		<>
			<Nav />

			<div className="main">
				<div className="intro-parent">
					<Intro />

					<Sponsors />
				</div>

				<About />

				<div className="why-parent">
					<Why />
				</div>

				<Plans />
				<Contributors />
				<Footer />
			</div>
		</>
	);
}

export default Home;
