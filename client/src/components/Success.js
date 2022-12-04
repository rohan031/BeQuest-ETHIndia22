import { useRef } from "react";

function Success() {
	const errRef = useRef();

	return (
		<div id="error-modal" className="success" ref={errRef}>
			<div id="error-modal__div">
				<h3 id="error-modal__div-head" className="success">
					🥳 Success
				</h3>

				<p id="error-modal__div-message">
					Successfully created BeQuest request.
				</p>
			</div>
		</div>
	);
}

export default Success;
