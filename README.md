# The Rick & Mortyverse - A Rust/React Solana App 

### Deployed on Netlify [here](https://reverent-jepsen-7b8b5d.netlify.app/)

## Overview
This project was developed as part of Buildspace's Solana GIF Portal Project. The front end for the project is simply a repository for Rick & Morty Gifs. Users can post new Gifs and see the collection, once they authenticate via their Phantom Wallet. The project's main learning goals were to gain an understanding have how key concepts work when building apps on the Solona Blockchain. My own specific learning goals were as follows:

* Learn about how 'Accounts' are created and used to store data on the Solana blockchain
* Learn how authentication might work on web3 apps
* An introduction to the Rust programming language
* Practice Test Driven Development


## Tech Stack 

* Javascript
* Rust
* React.js
* Web3.js
* Anchor 

# App Snapshot 

Users are prompted to connect their Phantom Wallet in order to be authenticated and gain access to the site

![connect wallet](readme_assets/connect_wallet.png)


Once connected, users have access to the Rick & Morty Gifs

![landing page](readme_assets/landingpage.png)

Users can submit new Rick & Morty Gifs to the site. In order to do 
so they must pay for the computing cost in SOL. Once approved, the 
Gif is added to the site.

![submit link](readme_assets/submit_link.png)

## Known bugs
The 'connect to wallet' button on the landing page should not be white as it makes the text hard to read (will fix on next re-deploy)

## Development Challenges & Wins
There will several steps in this project that proved very challenging. Firstly, building Solona from source in order to use it on an M1 Mac was difficult. It was a good exercise in de-bugging as there simply is not that much information available on how to fix problems when getting set-up, given the novelty of building on the Solana blockchain. Secondly, 

### Rust
using Rust was a new experience for me when developing here. I learnt about 'borrowing' and 'lending' in Rust, meaning that, when declared, all variables are immutable in Rust but can be 'borrowed' in, for example, a function by prefixing with ``` &mut ```. Similarly I learnt more about static typing, having largely worked only with Javascript & Python prior to this project. I also learnt about structs and vectors, at least insofar as they share characteristics with JS Objects and Arrays. 

### Authentication 
Certaintly a big win was understanding how authentication can be handled on the blockchain, the process was streamlined and fairly straightfoward to implement. As in other projects seperated out the functions required to handle the processes required for auth into an [Auth.js](src/helpers/auth.js) file. However, one main function took care of the authentication. The Phantom Wallet provides a global solana object, which provides built in methods for connecting from the app to the Wallet, allowing a request for authentication and confirmation of it achievable using far less code than standard authentication.  


### Test Driven Development
Another key learning experience was implementing a form of test driven development. The process developed as follows. First a function - or aspect of one - was written in the [lib.rs](solanaproject/programs/solanaproject/src/lib.rs) file, which handles the backend for the project. Then, in the [solanaproject.js](solanaproject/tests/solanaproject.js) JavaScript was used to simulate making requests to the back from the client side. The actual testing was handled by Anchor, which provides the means to run the code and check for the desired response. This process made implementing the frontend React code very smooth as most of the testing code could be implemented directly in React and you can be assured that the functions will work as intended. 

## Future Goals
I would like to add further features to the app, ideas include: 

* allowing users to 'like' or 'upvote' gifs to create a hierarchy of gifs.
* allow users to remove gifs they have added.
* generally better UI, with a more interesting way of displaying the gifs. 


