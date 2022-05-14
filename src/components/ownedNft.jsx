import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  useConnection,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { queryTokenState, config } from "stream-nft-sdk";
import { deleteListing, fetchListings } from "../services/firebase";
import {
  getParsedNftAccountsByOwner,
  isValidSolanaAddress,
} from "@nfteyez/sol-rayz";
import CardList from "./ListCards/cardList";
import axios from "axios";

function ownedNft() {
  const [ids, setids] = useState([]);
  const [listObject, setListObject] = useState([]);

  const [show, setShowLoader] = useState(true);
  const [nftList, setNftList] = useState(true)
  const { connection } = useConnection();
  const data = [
    {
      listed: false,
      listing: null,
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: false,
      listing: null,
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: false,
      listing: null,
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: false,
      listing: null,
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: false,
      listing: null,
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: false,
      listing: null,
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: false,
      listing: null,
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: false,
      listing: null,
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: false,
      listing: null,
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: true,
      listing: {
        isInitialized: true,
        initializerPubkey: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        initializerTempTokenAccountPubkey:
          "125gaQfDK2L9YxT7yNfJQv32muu5Qg2FhUCXVaA1qGkB",
        initializerReceivingTokenAccountPubkey:
          "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        tokenPubkey: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        rate: "0.1 SOL",
        expiry: "0",
        borrower: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        state: "0",
        minBorrowDuration: "10",
        maxBorrowDuration: "20",
      },
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: true,
      listing: {
        isInitialized: true,
        initializerPubkey: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        initializerTempTokenAccountPubkey:
          "125gaQfDK2L9YxT7yNfJQv32muu5Qg2FhUCXVaA1qGkB",
        initializerReceivingTokenAccountPubkey:
          "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        tokenPubkey: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        rate: "0.1 SOL",
        expiry: "0",
        borrower: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        state: "0",
        minBorrowDuration: "10",
        maxBorrowDuration: "20",
      },
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
    {
      listed: true,
      listing: {
        isInitialized: true,
        initializerPubkey: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        initializerTempTokenAccountPubkey:
          "125gaQfDK2L9YxT7yNfJQv32muu5Qg2FhUCXVaA1qGkB",
        initializerReceivingTokenAccountPubkey:
          "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        tokenPubkey: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        rate: "0.1 SOL",
        expiry: "0",
        borrower: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        state: "0",
        minBorrowDuration: "10",
        maxBorrowDuration: "20",
      },
      metadata: {
        key: 4,
        updateAuthority: "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
        mint: "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
        data: {
          name: "Number #0001",
          symbol: "NB",
          uri: "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
          sellerFeeBasisPoints: 500,
          creators: [
            {
              address: "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
              verified: 1,
              share: 0,
            },
            {
              address: "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
              verified: 0,
              share: 100,
            },
          ],
        },
        primarySaleHappened: 1,
        isMutable: 1,
        editionNonce: null,
      },
    },
  ];
  const w = useWallet();
  const { publicKey, sendTransaction, connected } = w;
  const init = async () => {
    if (connected) {
        setNftList(true)
      const listings = await getParsedNftAccountsByOwner({
        publicAddress: publicKey.toBase58(),
        connection,
        sanitize: true,
      });
      setids([]);
      if (listings.length) {
        for (let i in listings) {
          try {
            // const state = await getMetadata(connection, listings[i].token);
            setids((ids) => [...new Set([...ids, listings[i].mint])]);
          } catch (e) {
            await deleteListing(listings[i].token);
          }
        }
      }
      try {
        let nftData = listings;
        var data = Object.keys(nftData).map((key) => nftData[key]);
        let arr = [];
        let n = data.length;
        for (let i = 0; i < n; i++) {
          let val = await axios.get(data[i].data.uri);
          val = { ...val, id: listings[i].mint };
          arr.push(val);
        }
        setListObject(arr);
      } catch (error) {
        console.log(error);
      }
    }
    else{
        setNftList(false)
    }
    setShowLoader(false);
   
  };

  useEffect(() => {
    init();
  }, [w]);

  return (
    <div className="container mx-auto center">
      <div className="">
        {show ? (
          <div className="container mx-auto center">
            <center>
              <svg
                role="status"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </center>
          </div>
        ) : (
          ""
        )}

        { nftList?
        (<div>
          <CardList list={listObject} />
        </div>) :
        (<center>
        <div className="msg"> Connect your wallet to see your NFTs</div>
        </center>
        )}
        {/* 
            <button className="btn" onClick={init}>
              refresh
            </button> */}
      </div>
    </div>
  );
}

export default ownedNft;