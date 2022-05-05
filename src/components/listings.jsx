import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  useConnection,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import {
  queryTokenState,
  config,
} from "stream-nft-sdk";
import { deleteListing, fetchListings } from "../services/firebase";
const getMetadata = async (connection: Connection, token: string) => {
  return await queryTokenState({
    programId: config.DEVNET_PROGRAM_ID,
    tokenAddress: new PublicKey(token),
    connection,
  });
};
function Listing() {
  const { connection } = useConnection();
  const [ids, setids] = useState([]);
  const init = async () => {
    setids([]);
    const listings = await fetchListings();
    console.log(listings);
    listings.forEach(async (listing) => {
      try {
        const state = await getMetadata(connection, listing.token);
        console.log(state);
        setids((ids) => [...ids, listing.token]);
      } catch (e) {
        await deleteListing(listing.token);
      }
    });
  };
  useEffect(() => {
   // init();
  }, [connection]);
  return (
    <div className="container mx-auto center">
      <div className="flex">
        <div className="flex-auto card w-96 max-w-1/2 bg-accent text-primary-content shadow-2xl">
          <div className="card-body">
            <h2 className="card-title">listed SPL-TOKEN</h2>
            <div>
              {ids.map((id) => {
                return (
                  <div className="alert shadow-lg" key={id}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info flex-shrink-0 w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <div>
                        <h3 className="font-bold">{id}</h3>
                      </div>
                    </div>
                    <div className="flex-none">
                      <button
                        className="btn btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `https://explorer.solana.com/address/${id}/largest?cluster=devnet`
                          );
                        }}
                      >
                        view
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="btn" onClick={init}>
              refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
