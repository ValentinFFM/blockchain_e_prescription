# E-Prescription-Application build on Ethereum Blockchain

**Table of Contents:**
- [E-Prescription-Application build on Ethereum Blockchain](#e-prescription-application-build-on-ethereum-blockchain)
  - [Message from the project team](#message-from-the-project-team)
    - [Introduction](#introduction)
    - [Stage of the project](#stage-of-the-project)
  - [Prerequisites for the installation](#prerequisites-for-the-installation)
  - [How to install!](#how-to-install)
  - [How to start the application!](#how-to-start-the-application)
  - [How to interact with the application!](#how-to-interact-with-the-application)
  - [How it works](#how-it-works)


---

## Message from the project team

### Introduction

Please read the readme carefully before you use the application and dive deeper into it!

The sections [Prerequisites for the installation](#prerequisites-for-the-installation), [How to install!](#how-to-install) and [How to start the application!](#how-to-start-the-application) guide you step-for-step through the first installation process. Afterwards we recommend you to read the section [How to interact with the application!](#how-to-interact-with-the-application) to learn more about the possibilities of the application and how to work with different accounts. If you want to know which technologies where used, checkout the [How it works](#how-it-works) section.<br><br>

### Stage of the project

The project is in an early stage of development. This means that you might come across bugs or individual problems during the usage of the project. Therefore we would like to ask you for your help to support our work. 

On one hand, if you find a bug, just simply raise an issue in our repository and describe the steps to reproduce it. 
On the other hand, if you also have a solution for the bug, then just propose it by sending a pull request.

Thanks a lot! ❤️<br><br>

---

## Prerequisites for the installation

1. Download and install Ganache 
   - Download Link: https://www.trufflesuite.com/ganache
   
2. Download and install the Webbrowser Google Chrome
   - Download Link: https://www.google.com/intl/de_de/chrome/

3. Download and install the browser extension MetaMask for your browser:
   - Download Link: https://metamask.io/download.html <br><br>


---

## How to install!

1. Clone the repository:
```
$ git clone https://github.com/ValentinFFM/blockchain_e_prescription.git
```

2. Open the command line in the cloned repository and install truffle globally or within the repository:
```
$ npm install -g truffle
```

3. Navigate within the command line into the folder "client" and run "npm install":
```
$ cd client
$ npm install
```
<br>

---

## How to start the application!

1. Open Ganache and create a new workspace:
   1. Click on "New workspace".
   2. Give your workspace a name.
   3. Click on "Add project" and choose the file "truffle-config.js" from the cloned repository.
   4. Check in the tab "Server" that the port is configured on 7545.
   5. Click on "save workspace".

2. Open the command line in cloned repository and execute
```
$ truffle develop
$ compile
$ migrate
```

3. Open a second command line within the repository and execute:
```
$ cd client
$ npm run start
```

4. Open the webbrowser Google Chrome and navigate to "localhost:3000"

5. The MetaMask browser extension should automatically start otherwise click on the MetaMask icon in the upper, right corner. Follow the steps described in MetaMask to create a new account. 

6. Import a blockchain account from Ganache into MetaMask. You can repeat that step multiple times.
   1. Click on the profile icon within Metamask.
   2. Click on "Import Account".
   3. Click on one of the "key-icons" on the right of the accounts in Ganache.
      - The first account listed in Ganache is automatically assigned as admin account
      - All other accounts can be used and assigned to any role with the E-Prescription-Application
   4. Copy the private key into the form in MetaMask and click "import". 

7. Connect the Smart Contract "Prescription" with the Smart Contract "User"
   1. Choose the admin account in MetaMask.
   2. Navigate to "localhost:3000/admin". 
   3. Go to "contracts" in Ganache and copy the address of the Smart Contract "User".
   4. Insert the address in the form in the browser and click on "Connect".

  ➔ Now you can use the application!
<br><br>

---

## How to interact with the application!

---

## How it works

- **Ethereum:**
  - Open-Access Blockchain
  - Documentation: https://ethereum.org/en/developers/docs/

- **Ganache:**
  - Local Ethereum Blockchain
  - Download: https://www.trufflesuite.com/ganache

- **React:**
  - JavaScript Library for building user interfaces
  - Documentation: https://reactjs.org/docs/getting-started.html

- **React-Bootstrap:**
  - Front-End Framework
  - Documentation: https://react-bootstrap.github.io

- **React-Router:**
  - Library for implementing routing functionality in react
  - Documentation: https://reactrouter.com/web/guides/quick-start

- **Solidity:**
  - Programming language for Smart Contracts using Ethereum Virtual Machine
  - Documentation: https://docs.soliditylang.org/en/latest/

- **Truffle:**
  - Development and Testing Environment for Smart Contracts using Ethereum Virtual Machine
  - Download: https://www.trufflesuite.com/truffle

- **Web3.js:**
  - Collection of libraries to interact with Ethereum
  - Documentation: https://web3js.readthedocs.io/en/v1.3.0/

<br>

---
