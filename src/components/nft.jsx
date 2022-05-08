import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { TimeDurationInput } from "react-time-duration-input";

import {
  useConnection,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import BN from "bn.js";
import React, { useEffect, useState } from "react";
import {
  queryTokenState,
  config,
  initNFTEscrowTx,
  findAssociatedTokenAddress,
  sendTransaction,
  cancelEscrowTx,
} from "stream-nft-sdk";
import { addDocument } from "../services/firebase";
const getMetadata = async (connection: Connection, token: string) => {
  return await queryTokenState({
    programId: config.DEVNET_PROGRAM_ID,
    tokenAddress: new PublicKey(token),
    connection,
  });
};
const initalizeEscrowHandler = async (
  rate: number,
  connection: Connection,
  token: PublicKey,
  wallet: WalletContextState,
  minBorrowTime: number,
  maxBorrowTime: number
) => {
  console.log(minBorrowTime, maxBorrowTime, rate);
  const tempAccount = new Keypair();
  const resp = await initNFTEscrowTx({
    owner: wallet,
    token,
    rate: new BN(rate * LAMPORTS_PER_SOL),
    minBorrowTime: new BN(minBorrowTime),
    maxBorrowTime: new BN(maxBorrowTime),
    connection,
    newAccount: tempAccount.publicKey,
    ownerTokenAccount: await findAssociatedTokenAddress(
      wallet.publicKey,
      token
    ),
    programId: config.DEVNET_PROGRAM_ID,
  });
  const txId = await wallet.sendTransaction(resp.tx, connection, {
    signers: [tempAccount],
    options: { skipPreflight: false, preflightCommitment: "confirmed" },
  });
  await addDocument(token.toBase58());
  return `initEscrowTx Completed: ${txId}`;
};
const cancelEscrowHandler = async (
  connection: Connection,
  token: PublicKey,
  wallet: WalletContextState
) => {
  const resp = await cancelEscrowTx({
    owner: wallet,
    token,
    programId: config.DEVNET_PROGRAM_ID,
    connection,
    ownerTokenAddress: await findAssociatedTokenAddress(
      wallet.publicKey,
      token
    ),
  });
  const txId = await sendTransaction({
    connection,
    wallet,
    txs: resp.tx,
    signers: [],
    options: { skipPreflight: false, preflightCommitment: "confirmed" },
  });
  return `cancelEscrowTx Completed: ${txId}`;
};
function Card() {
  const { connection } = useConnection();
  const w = useWallet();
  const { publicKey, sendTransaction } = w;
  const [token, setToken] = useState(null);
  const [err, setErr] = useState(null);
  const [log, setLog] = useState(null);
  const [escrowState, setEscrowState] = useState(null);
  const [rate, setRate] = useState(0.001);
  const [timeScale, setTimeScale] = useState(0);
  const [minDuration, setMinDuration] = useState(60);
  const [maxDuration, setMaxDuration] = useState(10 * 60);
  const getRate = () => {
    switch (timeScale) {
      case 1:
        //minutes
        return rate / 60;
      case 2:
        //hours
        return rate / 3600;
      case 3:
        //days
        return rate / 86400;
      default:
        return rate;
    }
  };
  const fetchMetadata = async () => {
    setErr(null);
    setLog(null);
    setEscrowState(null);
    if (!publicKey) {
      setErr("Wallet not connected");
      return;
    }
    if (!token) setErr("no token found");
    console.log(publicKey.toBase58());
    try {
      const state = await getMetadata(connection, token);
      await addDocument(token);
      setEscrowState(
        JSON.stringify(
          {
            ...state.getState(),
            rate: `${state.getState().rate.toNumber() / LAMPORTS_PER_SOL} SOL`,
            expiry: state.getState().expiry.toString(),
            state: state.getState().state.toString(),
            minBorrowDuration: state.getState().minBorrowDuration.toString(),
            maxBorrowDuration: state.getState().maxBorrowDuration.toString(),
          },
          null,
          2
        )
      );
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
  };
  const initalizeEscrow = async () => {
    setErr(null);
    setLog(null);
    setEscrowState(null);
    if (!publicKey) {
      setErr("Wallet not connected");
      return;
    }
    if (!token) setErr("no token found");
    console.log(publicKey.toBase58());
    try {
      const resp = await initalizeEscrowHandler(
        getRate(),
        connection,
        new PublicKey(token),
        w,
        minDuration,
        maxDuration
      );
      setLog(resp);
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
  };
  const cancelEscrow = async () => {
    setErr(null);
    setLog(null);
    setEscrowState(null);
    if (!publicKey) {
      setErr("Wallet not connected");
      return;
    }
    if (!token) setErr("no token found");
    console.log(publicKey.toBase58());
    try {
      const resp = await cancelEscrowHandler(
        connection,
        new PublicKey(token),
        w
      );
      setLog(resp);
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
  };
  useEffect(() => {
    setErr(null);
  }, []);
  return (
    <div className="container mx-auto center ">
      <div className="flex">
        <div className="flex-auto card w-32 max-w-32 bg-primary text-primary-content shadow-2xl">
          <div className="card-body">
            <h2 className="card-title">initialize SPL-TOKEN</h2>
            <div className="flex gap-4 ">
              <input
                type="text"
                onChange={(e) => setToken(e.target.value)}
                placeholder="Token address"
                className=" flex-auto input input-bordered input-accent"
              />
            </div>

            <div className="form-control flex flex-row gap-4 w-full ">
              <label className="label">
                <span className="label-text">Rate</span>
              </label>
              <input
                type="text"
                defaultValue={0.001}
                placeholder="Rate"
                className=" flex-auto input input-bordered input-accent "
                onChange={(e) => setRate(parseFloat(e.target.value))}
              />
              <label className="label">
                <span className="label-text">scale</span>
              </label>
              <select
                className="select select-info  "
                onChange={(e) => {
                  setTimeScale(parseInt(e.target.value));
                }}
              >
                <option value={0} defaultChecked={true}>
                  SOL/Second
                </option>
                <option value={1}>SOL/Minutes</option>
                <option value={2}>SOl/Hours</option>
                <option value={3}>SOL/Days</option>
              </select>
              <label className="label">
                <span className="label-text">Minimum Rent Duration</span>
              </label>
              <TimeDurationInput
                type="text"
                value={60 * 1000}
                className=" flex-auto input input-bordered input-accent w-full "
                onChange={(value) => setMinDuration(value / 1000)}
              />
              <label className="label">
                <span className="label-text">Minimum Rent Duration</span>
              </label>
              <TimeDurationInput
                type="text"
                value={10 * 60 * 1000}
                className=" flex-auto input input-bordered input-accent w-full "
                onChange={(value) => setMaxDuration(value / 1000)}
              />
            </div>
            <div className="justify-end card-actions">
              <button className="btn" onClick={initalizeEscrow}>
                Initialize Token Listing
              </button>
              <button className="btn" onClick={fetchMetadata}>
                Rented Token Status
              </button>
              <button className="btn" onClick={cancelEscrow}>
                Cancel Token Listing
              </button>
            </div>
            {err ? (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{err}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {escrowState ? (
          <div className="flex-auto card w-96 bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">RENTED NFT METADATA</h2>
              <p>
                <div className="mockup-code">
                  <pre data-prefix="$">
                    <code>{escrowState}</code>
                  </pre>
                </div>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {log ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{log}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Card;
