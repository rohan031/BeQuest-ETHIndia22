import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";

import Dashboard from "./pages/Dashboard";

import CreateRequest from "./pages/CreateRequest";
import ViewRequest from "./pages/ViewRequest";
import Beneficiary from "./pages/Beneficiary";

import NotFound from "./pages/NotFound";

function Path() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/wallet" element={<Wallet />} />

				<Route path="/dashboard" element={<Dashboard />}>
					<Route index element={<Navigate to="create-request" />} />
					<Route path="create-request" element={<CreateRequest />} />
					<Route path="view-request" element={<ViewRequest />} />
					<Route path="beneficiary" element={<Beneficiary />} />
				</Route>
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</HashRouter>
	);
}

export default Path;
