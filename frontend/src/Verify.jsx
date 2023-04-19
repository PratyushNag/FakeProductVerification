import React, { useState, useEffect, useMemo } from "react";
import ABI from "./contracts/ABI.json";
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";
import MD5 from 'crypto-js/md5';
import { useParams } from "react-router-dom";
import Confetti from 'react-confetti'

const CONTRACT_ADDRESS = "0x712B251D473c2f9f37B3A9A2CCA817F8A4248332";

const NFT_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_KEY;

const Verify = () => {
	const { address } = useAccount();
	const { data: signer } = useSigner();
	const [hash, setHash] = useState("")

	const getCloudflareURL = url =>
		`https://cloudflare-ipfs.com/ipfs/${url?.replace("ipfs://", "")}`;

	const contract = useContract({
		address: CONTRACT_ADDRESS,
		abi: ABI.abi,
		signerOrProvider: signer,
	});
	const { data: supply } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI.abi,
		functionName: "totalSupply",
	});

	const [nfts, setNfts] = useState({});

	const { id } = useParams();

	const isVerified = useMemo(() => hash === nfts.hash, [nfts, hash]);

	console.log(nfts.id)

	useEffect(() => {
		const getNFTs = async () => {
			try {
				const uri = await contract?.getTokenURI(id);
				const data = await fetch(getCloudflareURL(uri));
				const json = await data.json();
				const nft = { tokenId: id, ...json };
				setNfts(nft);

			} catch (err) {
				console.log(err);
			}
		};
		getNFTs();
	}, [address, contract, supply]);
	return (
		<div className="NFT__Container" style={{
			width: "50%",
			border: isVerified && `2px solid rgba(27, 207, 27,0.2`
		}}>
			<h2>Verify Your Product</h2>
			<div className="File__Container">
				<img src={nfts.image}></img>
				<div className="File__Metadata" style={{
					flexDirection: "column",
					alignItems: "flex-start"
				}}>
					<p style={{
						paddingBlockEnd: "0.75rem",
						paddingBlockStart: "0.25rem",
						color: "hsl(260, 15%, 80%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
						flexGrow: "1"
					}}>
						<label style={{
							fontSize: "14px"
						}}>Name </label><span>{nfts.name}</span>
					</p>
					<p style={{
						borderTop: "solid 1px #e0e0e01a",
						width: "calc(100% + 1rem)",
						transform: "translateX(-0.5rem)",
						paddingInline: "0.5rem",
						paddingBlockStart: "0.5rem",
						flexGrow: "1",
						fontSize: "0.75rem",
						fontWeight: "200",
						color: "hsl(260, 15%, 66%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between"
					}}>
						<label>Description </label><span>{nfts.description}</span>
					</p>
				</div>
			</div>
			<div className="File__Container">
				<div className="Input__Container">
					<label>Verification Key <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="none" style={{
						width: 16,
						display: "inline"
					}}>

						<path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />


					</svg>
					</label>
					<input
						type="text"
						name="id"
						placeholder="Paste key to verify"
						onChange={e => setHash(MD5(e.target.value).toString())}
					/>
				</div>
				<div className={`Match__Container ${isVerified ? `` : `Match__Container--mismatch`}`} >
					{!isVerified ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" height={16}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					) : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" height={16}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					}
					<span>{isVerified ? `Congratulations! This product is verified` : `This product is not verified`}</span>
				</div>
			</div>
			{
				isVerified && <Confetti
					tweenDuration={1000}
					numberOfPieces={600}
					initialVelocityY={{ min: 2, max: 8 }}
					gravity={0.075}
					recycle={false}
					width={window.innerWidth}
					height={window.innerHeight}
				/>
			}
		</div >

	);
};

export default Verify;