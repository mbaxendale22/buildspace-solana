const anchor = require('@project-serum/anchor');
const { SystemProgram } = require('@solana/web3.js');

// describe('solanaproject', () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.Provider.env());

//   it('Is initialized!', async () => {
//     // Add your test here.
//     const program = anchor.workspace.Solanaproject;
//     const tx = await program.rpc.initialize();
//     console.log('Your transaction signature', tx);
//   });
// });

const { systemProgram } = anchor.web3;

const main = async () => {
  console.log('starting test');

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Solanaproject;

  //generating credentials for the baseAccount
  const baseAccount = anchor.web3.Keypair.generate();

  // note that Anchor auto formats the function/variable names correctly according to the lang,
  // so start_stuff_off in Rust can be references as startStuffOff isn JS.
  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log('your transaction signature', tx);

  // fetch the account and the total_gifs count held by the account
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('GIF Count', account.totalGifs.toString());

  //call the add gif function to incremenet the giff count by 1
  await program.rpc.addGif(
    'https://media.giphy.com/media/DgLsbUL7SG3kI/giphy.gif',
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('GIF Count', account.totalGifs.toString());

  console.log('Gif List', account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
