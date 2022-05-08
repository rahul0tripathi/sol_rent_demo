import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { TimeDurationInput } from "react-time-duration-input";
import {
  useConnection,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";
import React, { useEffect, useState } from "react";
import {
  queryTokenState,
  config,
  findAssociatedTokenAddress,
  sendTransaction,
  withdrawTx,
  rentTx,
} from "stream-nft-sdk";
const getMetadata = async (connection: Connection, token: string) => {
  return await queryTokenState({
    programId: config.DEVNET_PROGRAM_ID,
    tokenAddress: new PublicKey(token),
    connection,
  });
};
const rentInit = async (
  connection: Connection,
  token: PublicKey,
  wallet: WalletContextState,
  amount: number,
  time: number
) => {
  const resp = await rentTx({
    borrower: wallet,
    token,
    programId: config.DEVNET_PROGRAM_ID,
    amount: new BN(amount),
    time: new BN(time),
    connection
  });
  const txId = await sendTransaction({
    connection,
    wallet,
    txs: resp.tx,
    signers: [],
    options: { skipPreflight: false, preflightCommitment: "confirmed" },
  });
  return `rentTx Completed: ${txId}`;
};
const cancelRent = async (
  connection: Connection,
  token: PublicKey,
  wallet: WalletContextState
) => {
  const resp = await withdrawTx({
    token,
    programId: config.DEVNET_PROGRAM_ID,
    connection,
  });
  const txId = await sendTransaction({
    connection,
    wallet,
    txs: resp.tx,
    signers: [],
    options: { skipPreflight: false, preflightCommitment: "confirmed" },
  });
  return `withdrawEscrowTx Completed: ${txId}`;
};
function Rent() {
  const { connection } = useConnection();
  const w = useWallet();
  const { publicKey, sendTransaction } = w;
  const [token, setToken] = useState(null);
  const [err, setErr] = useState(null);
  const [log, setLog] = useState(null);
  const [bill, setBill] = useState(0);
  const [time, setTime] = useState(0);
  const initRent = async () => {
    setErr(null);
    setLog(null);
    try {
      const currentState = await getMetadata(connection, token);
      const amount = new BN(
        (currentState.getState().rate.toNumber() / LAMPORTS_PER_SOL) *
          parseInt(time) *
          LAMPORTS_PER_SOL
      );
      console.log(amount.toNumber());

      const BNtime = new BN(time);
      console.log(BNtime.toNumber());
      const resp = await rentInit(
        connection,
        new PublicKey(token),
        w,
        amount,
        BNtime
      );
      setLog(resp);
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
  };
  const calculateRent = async (e: number) => {
    try {
      console.log(e)
      setBill(0);
      setTime(e/1000);
      const currentState = await getMetadata(connection, token);
      setBill(
        (currentState.getState().rate.toNumber() / LAMPORTS_PER_SOL) *
          (e/1000)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = async () => {
    setErr(null);
    setLog(null);
    if (!publicKey) {
      setErr("Wallet not connected");
      return;
    }
    if (!token) setErr("no token found");
    console.log(publicKey.toBase58());
    try {
      const resp = await cancelRent(connection, new PublicKey(token), w);
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
    <div className="container mx-auto center">
      <div className="flex">
        <div className="flex-auto card w-96 max-w-1/2 bg-base-100 text-primary-content shadow-2xl">
          <div className="card-body">
            <h2 className="card-title">borrow SPL-TOKEN</h2>
            <div className="flex gap-4">
              <input
                type="text"
                onChange={(e) => setToken(e.target.value)}
                placeholder="Token address"
                className=" flex-auto input input-bordered input-accent "
              />
              <TimeDurationInput
              value = {60*1000}
                onChange={(e ) => {
                  //setTime(parseInt(e.target.value));
                  calculateRent(e);
                }}
                placeholder="Duration (seconds)"
                className=" flex-auto input input-bordered input-accent  max-w-xs s"
              />
            </div>
            <div className="justify-end card-actions">
              <button className="btn" onClick={initRent}>
                borrow It for {bill} SOL!!!
              </button>
              <button className="btn" onClick={cancel}>
                withdraw borrowed nft
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

export default Rent;