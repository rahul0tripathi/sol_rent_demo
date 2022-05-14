import React, { useEffect, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import Card from "./components/nft";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import Rent from "./components/rent";
import Listing from "./components/listings";
import Toggle from "./components/borrow";
import Init from "./components/init";
import CardList from "./components/ListCards/cardList";
import OwnedList from "./components/ownedList";
import OwnedNft from "./components/ownedNft";
import BorrowedNft from "./components/borrowedNft";



require("@solana/wallet-adapter-react-ui/styles.css");
function App() {
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );
  //states
  const [listActive, setListActive] = React.useState(true);
  const data = [{
    "listed": false,
    "listing": null,
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },
  {
    "listed": false,
    "listing": null,
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },{
    "listed": false,
    "listing": null,
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },{
    "listed": false,
    "listing": null,
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },{
    "listed": false,
    "listing": null,
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },{
    "listed": false,
    "listing": null,
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },{
    "listed": false,
    "listing": null,
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },{
    "listed": false,
    "listing": null,
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },{
    "listed": false,
    "listing": null,
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },
  {
    "listed": true,
    "listing": {
      "isInitialized": true,
      "initializerPubkey": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "initializerTempTokenAccountPubkey": "125gaQfDK2L9YxT7yNfJQv32muu5Qg2FhUCXVaA1qGkB",
      "initializerReceivingTokenAccountPubkey": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "tokenPubkey": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "rate": "0.1 SOL",
      "expiry": "0",
      "borrower": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "state": "0",
      "minBorrowDuration": "10",
      "maxBorrowDuration": "20"
    },
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },
  {
    "listed": true,
    "listing": {
      "isInitialized": true,
      "initializerPubkey": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "initializerTempTokenAccountPubkey": "125gaQfDK2L9YxT7yNfJQv32muu5Qg2FhUCXVaA1qGkB",
      "initializerReceivingTokenAccountPubkey": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "tokenPubkey": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "rate": "0.1 SOL",
      "expiry": "0",
      "borrower": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "state": "0",
      "minBorrowDuration": "10",
      "maxBorrowDuration": "20"
    },
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  },{
    "listed": true,
    "listing": {
      "isInitialized": true,
      "initializerPubkey": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "initializerTempTokenAccountPubkey": "125gaQfDK2L9YxT7yNfJQv32muu5Qg2FhUCXVaA1qGkB",
      "initializerReceivingTokenAccountPubkey": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "tokenPubkey": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "rate": "0.1 SOL",
      "expiry": "0",
      "borrower": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "state": "0",
      "minBorrowDuration": "10",
      "maxBorrowDuration": "20"
    },
    "metadata": {
      "key": 4,
      "updateAuthority": "7YeSmq9njjsyr4Axb1LDzdooUaVJThXdgHE4Z6Gpaa3h",
      "mint": "EPNCTFGQgNwuwyvABSxvTD2SsKFvB5phtkS1ATkXEZyU",
      "data": {
        "name": "Number #0001",
        "symbol": "NB",
        "uri": "https://arweave.net/vj88qCRUsQOhkpbf4UFEy4PE5l4RpjJInm6xopFXOAE?ext=png",
        "sellerFeeBasisPoints": 500,
        "creators": [
          {
            "address": "HakaQEauRmZQbVU3wg7hmT1318UTR8YopTSuWAbj3b1g",
            "verified": 1,
            "share": 0
          },
          {
            "address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw",
            "verified": 0,
            "share": 100
          }
        ]
      },
      "primarySaleHappened": 1,
      "isMutable": 1,
      "editionNonce": null
    }
  } 
]
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="flex flex-col items-center">
            <Navbar></Navbar>
            <div className="tabs tabs-boxed">
              <a
                className={`tab tab-lg ${listActive ? "tab-active" : ""}`}
                onClick={() => {
                  setListActive(!listActive);
                }}
              >
                List
              </a>
              <a
                className={`tab tab-lg ${listActive ? "" : "tab-active"}`}
                onClick={() => {
                  setListActive(!listActive);
                }}
              >
                Borrow
              </a>
            </div>
            {listActive ? <OwnedNft /> : <BorrowedNft />}
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
