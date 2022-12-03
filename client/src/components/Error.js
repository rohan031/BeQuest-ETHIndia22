import { useRef } from "react";
import ErrorImg from "../assests/error.svg";

function Error({ message }) {
	const errRef = useRef();

	const handleClose = () => {
		errRef.current.style.display = "none";
	};

	return (
		<div id="error-modal" ref={errRef}>
			<img src={ErrorImg} alt="" />

			<div id="error-modal__div">
				<h3 id="error-modal__div-head">Something went wrong</h3>

				<p id="error-modal__div-message">{message}</p>

				{/* <span id="error-close" onClick={handleClose}>
					OK
				</span> */}
			</div>
		</div>
	);
}

export default Error;
