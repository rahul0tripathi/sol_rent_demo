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
  EscrowState,
  initNFTEscrowTx,
  findAssociatedTokenAddress,
  sendTransaction,
  cancelEscrowTx,
} from "sol-rent";
const getMetadata = async (connection: Connection, token: string) => {
  return await queryTokenState({
    programId: config.TESTNET_PROGRAM_ID,
    tokenAddress: new PublicKey(token),
    connection,
  });
};
const initalizeEscrowHandler = async (
  connection: Connection,
  token: PublicKey,
  wallet: WalletContextState
) => {
  const tempAccount = new Keypair();
  const resp = await initNFTEscrowTx({
    owner: wallet,
    token,
    connection,
    newAccount: tempAccount.publicKey,
    ownerTokenAccount: await findAssociatedTokenAddress(
      wallet.publicKey,
      token
    ),
    programId: config.TESTNET_PROGRAM_ID,
  });
  const txId = await wallet.sendTransaction(resp.tx, connection, {
    signers: [tempAccount],
    options: { skipPreflight: false, preflightCommitment: "confirmed" },
  });
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
    programId: config.TESTNET_PROGRAM_ID,
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
      setEscrowState(JSON.stringify(state.getState(), null, 2));
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
    <div className="container mx-auto center">
      <div className="flex">
        <div className="flex-auto card w-96 max-w-1/2 bg-primary text-primary-content shadow-2xl">
          <div className="card-body">
            <h2 className="card-title">rent SPL-TOKEN</h2>
            <input
              type="text"
              onChange={(e) => setToken(e.target.value)}
              placeholder="Type here"
              className="input input-bordered input-primary w-full "
            />
            <div className="justify-end card-actions">
              <button className="btn" onClick={initalizeEscrow}>
                Initialize Token Listing
              </button>
              <button className="btn" onClick={fetchMetadata}>
                Rented Token Status
              </button>
              <button className="btn" onClick={cancelEscrow}>
                Withdraw Token Listing
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
