import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  // check to  see if a phantom wallet is connected in the user's browser. Phantom injects a 'solana' property (itself an object) into the window object
  // this function checks to see if that prop is present.
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        // check for phantom wallet on solana object
        if (solana.isPhantom) {
          console.log('Phantom Wallet has been found!');

          // solana object provides this in built function to check if the this app is authorised on the users wallet
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'connected with public key',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        } else {
          alert('Solana object not found! Get a Phantom Wallet');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  // have this function run on page load

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    // wait until the page is loaded before running the function (recomended by Phantom)
    return () => window.removeEventListener('load', onLoad);
  });

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {/* Add the condition to show this only if we don't have a wallet address */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
