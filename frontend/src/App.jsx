import { useEffect, useState } from "react";
import NFT from "./NFT";
import { NavLink, Route, Routes } from "react-router-dom";
import Gallery from "./Gallery";
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import Verify from "./Verify";


export default function App() {
	const { isConnected } = useAccount();
	return (
		<div className="App">
			<nav className="header">
				<h1>Fake Product Verification Using Blockchain</h1>
				<div className="Link__Container">
					<NavLink
						to="/"
						className={({ isActive, isPending }) =>
							`Link${isPending
								? "--pending"
								: isActive
									? "--active"
									: ""
							}`
						}
					>
						Create
					</NavLink>
					<NavLink
						to="/gallery"
						className={({ isActive, isPending }) =>
							`Link${isPending
								? "--pending"
								: isActive
									? "--active"
									: ""
							}`
						}
					>
						Your Products
					</NavLink>
				</div>
			</nav>
			<div className="container">
				{isConnected ? (
					<Routes>
						<Route path="/" element={<NFT />} />
						<Route path="verify/:id?" element={<Verify />} />
						<Route path="gallery/:id?" element={<Gallery />} />
					</Routes>
				) : (
					<Web3Button />
				)}
			</div>
			<footer>
				<div className="Logo__Container">
					<span>|</span>
				</div>
			</footer>
		</div>
	);
}
