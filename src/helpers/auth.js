// check to  see if a phantom wallet is connected in the user's browser. Phantom injects a 'solana' property (itself an object) into the window object
// this function checks to see if that prop is present.
export const checkIfWalletIsConnected = async (setWalletAddress) => {
  try {
    const { solana } = window;
    if (solana) {
      // check for phantom wallet on solana object
      if (solana.isPhantom) {
        console.log('Phantom Wallet has been found!');

        // solana object provides this in built function to check if the this app is authorised on the users wallet
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log('connected with public key', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      } else {
        alert('Solana object not found! Get a Phantom Wallet');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const connectWallet = async (setWalletAddress) => {
  const { solana } = window;
  if (solana) {
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
  }
};
