# E-Prescription-Application build on Ethereum Blockchain

**Table of Contents:**
- [E-Prescription-Application build on Ethereum Blockchain](#e-prescription-application-build-on-ethereum-blockchain)
  - [Prerequisites for the installation](#prerequisites-for-the-installation)
  - [Installation](#installation)
  - [First start](#first-start)

---

## Prerequisites for the installation

1. Download and install Ganache 
   - Download Link: https://www.trufflesuite.com/ganache
   
2. Download and install the Webbrowser Google Chrome
   - Download Link: https://www.google.com/intl/de_de/chrome/

3. Download and install the browser extension MetaMask for your browser:
   - Download Link: https://metamask.io/download.html


---

## Installation

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

---

## First start

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

---


