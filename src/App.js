import React, { useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import './App.css';
import idl from './idl.json';
import WalletConnected from './components/WalletConnected';
import { checkIfWalletIsConnected, connectWallet } from './helpers/auth';
import kp from './keypair.json';

// Constants

// reference to the Solana program which handles accounts etc.,
const { SystemProgram, KeyPair } = web3;

//use the keypair generated in createKeyPair.js as the account for reading and writing data from/to
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// grab the solanaprogram id from the IDL file
const programID = new PublicKey(idl.metadata.address);

//set the network to devnet
const network = clusterApiUrl('devnet');

//options for marking a transaction as complete - soloana gives a variety of options for marking a transaction as complete including how long to wait for it.
// this option chooses to wait for the connected node to confirm the transaction. A further option would be 'finalized' which waits longer.
const opts = {
  preflightCommitment: 'processed',
};

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  // const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet button"
      onClick={() => connectWallet(setWalletAddress)}
    >
      Connect to Wallet
    </button>
  );

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const getGifList = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      console.log('retrieved account', account);
      setGifList(account.gifList);
    } catch (error) {
      console.log('error in getGifList: ', error);
      setGifList(null);
    }
  };

  const createGifAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log('ping');
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        'Created a new BaseAccount w/ address:',
        baseAccount.publicKey.toString()
      );
      await getGifList();
    } catch (error) {
      console.log('Error creating BaseAccount account:', error);
    }
  };

  const handleGifSubmit = async (inputValue, setInputValue) => {
    if (inputValue.length === 0) {
      console.log('no link provided');
      return;
    }
    setInputValue('');
    console.log('gif link:', inputValue);
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log('Gif successfully sent to the program', inputValue);
      await getGifList();
    } catch (error) {
      console.log('Error sending Gif: ', error);
    }
  };

  // have this function run on page load

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected(setWalletAddress);
    };
    window.addEventListener('load', onLoad);
    // wait until the page is loaded before running the function (recomended by Phantom)
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list');
      // call solana program here, this will fetch the data like a axios request
      getGifList();
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">The Rick & Mortyverse</p>
          <p className="sub-text">
            The Home of Rick & Morty GIFS in the metaverse
          </p>
          {/* Add the condition to show this only if we don't have a wallet address */}
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && (
            <WalletConnected
              gifList={gifList}
              createGifAccount={createGifAccount}
              handleGifSubmit={handleGifSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
