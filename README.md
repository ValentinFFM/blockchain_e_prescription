# E-Prescription-System build on Ethereum Blockchain

- [E-Prescription-System build on Ethereum Blockchain](#e-prescription-system-build-on-ethereum-blockchain)
  - [Used Technologies and Templates](#used-technologies-and-templates)
  - [Installation](#installation)

----

## Used Technologies and Templates

- **Ethereum:**
  - Open-Access Blockchain
  - Documentation: https://ethereum.org/en/developers/docs/

- **Truffle:**
  - Development and Testing Environment for Smart Contracts using Ethereum Virtual Machine
  - Download: https://www.trufflesuite.com/truffle

- **Truffle Box React:**
  - Basic Template for a React Application working with Ethereum Smart Contracts
  - Download: https://www.trufflesuite.com/boxes/react

- **Ganache:**
  - Local Ethereum Blockchain
  - Download: https://www.trufflesuite.com/ganache

- **React:**
  - JavaScript Library for building user interfaces
  - Documentation: https://reactjs.org/docs/getting-started.html

----

## Installation

1. Clone the repository:
```
$ git clone https://github.com/ValentinFFM/blockchain_e_prescription.git
```

2. Install truffle globally or within the repository:
```
$ npm install -g truffle
```

3. Download and install ganache (https://www.trufflesuite.com/ganache)
 
4. Open ganache and click on "New workspace"
   1. Give your workspace a name
   2. Click on "Add procject" and choose the file "truffle-config.js" in the repository
   3. Change the Port-Number in the tab "Server" to 8545
   4. Click on "Save workspace"

5. Open a command line within the repository and execute:
```
$ truffle develop
$ compile
$ migrate
```

6. Open a second command line within the repository and execute:
```
$ cd client
$ npm run start
```

7. The application is now available in the browser via localhost:3000
