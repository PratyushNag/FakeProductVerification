import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";
import ABI from "./contracts/ABI.json";

const CONTRACT_ADDRESS = "0x712B251D473c2f9f37B3A9A2CCA817F8A4248332";

const getCloudflareURL = url =>
	`https://cloudflare-ipfs.com/ipfs/${url?.replace("ipfs://", "")}`;

const SingleNFT = ({ data, ...props }) => {
	const { name, description, image } = data;

	const navigate = useNavigate();
	const { id } = useParams();

	const handleTransfer = () => {
		id ? navigate(`/transfer/${id}`) : navigate(`/transfer/${props.id}`);
	};

	return (
		<div className="Gallery__Container">
			<div className="File__Container">
				<img src={getCloudflareURL(image)} alt={name} />
			</div>
			<div className="Divider" />
			<div className="Info__Container">
				<div className="Info__Container--meta">
					<h2>{name}</h2>
					<p>{description}</p>
				</div>
				<div className="External__Container">
					<a
						href={``}
						target="_blank"
						rel="noreferrer"
						className="Link Link--External"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 90 90"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.288 48.204 18.756C48.663 19.224 48.951 19.863 48.951 20.574V24.939L49.482 25.083C49.518 25.101 49.563 25.119 49.599 25.146C49.725 25.236 49.914 25.38 50.148 25.56C50.337 25.704 50.535 25.884 50.769 26.073C51.246 26.46 51.822 26.955 52.443 27.522C52.605 27.666 52.767 27.81 52.92 27.963C53.721 28.71 54.621 29.583 55.485 30.555C55.728 30.834 55.962 31.104 56.205 31.401C56.439 31.698 56.7 31.986 56.916 32.274C57.213 32.661 57.519 33.066 57.798 33.489C57.924 33.687 58.077 33.894 58.194 34.092C58.554 34.623 58.86 35.172 59.157 35.721C59.283 35.973 59.409 36.252 59.517 36.522C59.85 37.26 60.111 38.007 60.273 38.763C60.327 38.925 60.363 39.096 60.381 39.258V39.294C60.435 39.51 60.453 39.744 60.471 39.987C60.543 40.752 60.507 41.526 60.345 42.3C60.273 42.624 60.183 42.93 60.075 43.263C59.958 43.578 59.85 43.902 59.706 44.217C59.427 44.856 59.103 45.504 58.716 46.098C58.59 46.323 58.437 46.557 58.293 46.782C58.131 47.016 57.96 47.241 57.816 47.457C57.609 47.736 57.393 48.024 57.168 48.285C56.97 48.555 56.772 48.825 56.547 49.068C56.241 49.437 55.944 49.779 55.629 50.112C55.449 50.328 55.251 50.553 55.044 50.751C54.846 50.976 54.639 51.174 54.459 51.354C54.144 51.669 53.892 51.903 53.676 52.11L53.163 52.569C53.091 52.641 52.992 52.677 52.893 52.677H48.951V57.726H53.91C55.017 57.726 56.07 57.339 56.925 56.61C57.213 56.358 58.482 55.26 59.985 53.604C60.039 53.541 60.102 53.505 60.174 53.487L73.863 49.527C74.124 49.455 74.376 49.644 74.376 49.914V52.812V52.812Z"
								fill="currentColor"
							/>
						</svg>
					</a>
					<a
						href={``}
						target="_blank"
						rel="noreferrer"
						className="Link Link--External"
					>
						<svg
							id="Layer_1"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 500 500"
						>
							<path
								fill="currentColor"
								d="m364.03,335.08l111.55-64.4c5.9-3.41,9.57-9.76,9.57-16.58V125.28c0-6.81-3.67-13.17-9.57-16.58l-111.55-64.4c-5.9-3.41-13.24-3.4-19.14,0l-111.55,64.4c-5.9,3.41-9.57,9.76-9.57,16.58v230.19l-78.22,45.15-78.22-45.15v-90.33l78.22-45.15,51.6,29.78v-60.59l-42.03-24.26c-2.9-1.67-6.21-2.55-9.57-2.55s-6.67.88-9.57,2.55L24.42,229.33c-5.9,3.41-9.57,9.76-9.57,16.58v128.81c0,6.81,3.67,13.17,9.57,16.58l111.55,64.41c5.9,3.4,13.23,3.4,19.14,0l111.55-64.4c5.9-3.41,9.57-9.77,9.57-16.58v-230.19l1.41-.81,76.81-44.34,78.22,45.16v90.32l-78.22,45.16-51.52-29.74v60.59l41.95,24.23c5.9,3.4,13.24,3.4,19.14,0Z"
							/>
						</svg>
					</a>
				</div>
			</div>
			<div className="Divider" />
			<div className="Btn__Container">
				<button className="btn FullWidth" onClick={handleTransfer}>
					Verify
				</button>
			</div>
		</div>
	);
};

const NFTComponent = ({ id }) => {
	const { data: signer } = useSigner();
	const [data, setData] = useState(null);

	const { data: tokenURI } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI.abi,
		functionName: "getTokenURI",
		args: [id],
	});

	useEffect(() => {
		id &&
			fetch(getCloudflareURL(tokenURI))
				.then(res => res.json())
				.then(data => setData(data));
	}, [id]);

	return (
		<div>
			{data !== null ? (
				<SingleNFT data={data} />
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					width="24"
					height="24"
					viewBox="0 0 100 100"
					preserveAspectRatio="xMidYMid"
				>
					<circle
						cx="50"
						cy="50"
						fill="none"
						stroke="currentColor"
						strokeWidth="8"
						r="35"
						strokeDasharray="164.93361431346415 56.97787143782138"
					>
						<animateTransform
							attributeName="transform"
							type="rotate"
							repeatCount="indefinite"
							dur="1s"
							values="0 50 50;360 50 50"
							keyTimes="0;1"
						></animateTransform>
					</circle>
				</svg>
			)}
		</div>
	);
};

const GalleryForUser = () => {
	const navigate = useNavigate();
	const { address } = useAccount();
	const { data: signer } = useSigner();

	const [nfts, setNfts] = useState([]);

	const { data: supply } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI.abi,
		functionName: "totalSupply",
	});

	const contract = useContract({
		address: CONTRACT_ADDRESS,
		abi: ABI.abi,
		signerOrProvider: signer,
	});

	useEffect(() => {
		const getNFTs = async () => {
			try {
				const nfts = [];
				for (let i = 0; i < supply.toNumber(); i++) {
					const res = await contract?.ownerOf(i);
					if (res.toLowerCase() === address.toLowerCase()) {
						const uri = await contract?.getTokenURI(i);
						const data = await fetch(getCloudflareURL(uri));
						const json = await data.json();
						const nft = { tokenId: i, ...json };
						nfts.push(nft);
					}
				}
				setNfts(nfts);
			} catch (err) {
				console.log(err);
			}
		};
		getNFTs();
	}, [address, contract, supply]);

	return (
		<>
			{nfts.length > 0 ? (
				<div className="Gallery__Wrapper">
					{nfts.map(nft => (
						<SingleNFT
							data={nft}
							id={nft.tokenId}
							key={nft.tokenId}
						/>
					))}
				</div>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					width="24"
					height="24"
					viewBox="0 0 100 100"
					preserveAspectRatio="xMidYMid"
				>
					<circle
						cx="50"
						cy="50"
						fill="none"
						stroke="currentColor"
						strokeWidth="8"
						r="35"
						strokeDasharray="164.93361431346415 56.97787143782138"
					>
						<animateTransform
							attributeName="transform"
							type="rotate"
							repeatCount="indefinite"
							dur="1s"
							values="0 50 50;360 50 50"
							keyTimes="0;1"
						></animateTransform>
					</circle>
				</svg>
			)}
		</>
	);
};

const Gallery = () => {
	const { id } = useParams();

	return id !== undefined ? <NFTComponent id={id} /> : <GalleryForUser />;
};

export default Gallery;