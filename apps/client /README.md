[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/rsksmart/meme-token-launch/badge)](https://scorecard.dev/viewer/?uri=github.com/rsksmart/meme-token-launch)
[![CodeQL](https://github.com/rsksmart/rskj/workflows/CodeQL/badge.svg)](https://github.com/rsksmart/meme-token-launch/actions?query=workflow%3ACodeQL)
<img src="rootstock-logo.png" alt="RSK Logo" style="width:100%; height: auto;" />

# *(Meme) Token Launch*

This project is an open-source proof of concept implementing a (Meme) Token Launch project. The primary goal is to allow users to mint ERC20 tokens as "Meme Tokens" on the Rootstock (RSK) network.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Future Development](#future-development)
- [Contributing](#contributing)
- [Support](#support)

## Overview

## Technologies Used

- **OpenZeppelin Standards**: [OpenZeppelin](https://www.openzeppelin.com/)
- **Ethers.js**: [Ethers.js Documentation](https://docs.ethers.org/v5/)

## Project Structure

```
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── connectedWallet
│   ├── deployToken
│   ├── footer
│   ├── icons
│   ├── navbar
│   └── ui
├── components
├── constants
│   └── index.ts
├── context
│   └── AuthContext.tsx
├── contracts
│   ├── abi
│   └── MemeTokenFactory.sol
├── hooks.json
│   ├── useConnectWallet.tsx
│   └── useDeployERC20Token.tsx
├── utils
└── package.json
```

## Installation

To clone and run this project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/rsksmart/meme-token-launch.git
   cd meme-token-launch
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add necessary environment variables. Example:

   ```sh
   NEXT_PUBLIC_FACTORY_ADDRESS=0xdBd55bbE2A8f5cEb213Ef0f1ea27446b86f9E554
   NEXT_PUBLIC_TOKEN_CREATED_EVENT=TokenCreated
   NEXT_PUBLIC_EXPLORER_TX_BASE_URL=https://explorer.testnet.rootstock.io/tx/
   NEXT_PUBLIC_EXPLORER_ADDRESS_BASE_URL=https://explorer.testnet.rootstock.io/address/
   ```

4. **Run the development server**:

   ```sh
   npm run dev
   ```

## Usage

1. **Access the application**: Open [http://localhost:3000](http://localhost:3000) in your browser.
2. **Connect your wallet**: Click on "Go to the app" and connect your wallet.
3. **Complete the form and create your meme token**: Complete the form with the configuration for your meme token and click on "Deploy". Wait until the process finishes, then copy and save your contract address.

## Contributing

We welcome contributions from the community. Please fork the repository and submit pull requests with your changes. Ensure your code adheres to the project's main objective.

## Support

For any questions or support, please open an issue on the repository or reach out to the maintainers.


# Disclaimer
The software provided in this GitHub repository is offered “as is,” without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
- **Testing:** The software has not undergone testing of any kind, and its functionality, accuracy, reliability, and suitability for any purpose are not guaranteed.
- **Use at Your Own Risk:** The user assumes all risks associated with the use of this software. The author(s) of this software shall not be held liable for any damages, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of or inability to use this software, even if advised of the possibility of such damages.
- **No Liability:** The author(s) of this software are not liable for any loss or damage, including without limitation, any loss of profits, business interruption, loss of information or data, or other pecuniary loss arising out of the use of or inability to use this software.
- **Sole Responsibility:** The user acknowledges that they are solely responsible for the outcome of the use of this software, including any decisions made or actions taken based on the software’s output or functionality.
- **No Endorsement:** Mention of any specific product, service, or organization does not constitute or imply endorsement by the author(s) of this software.
- **Modification and Distribution:** This software may be modified and distributed under the terms of the license provided with the software. By modifying or distributing this software, you agree to be bound by the terms of the license.
- **Assumption of Risk:** By using this software, the user acknowledges and agrees that they have read, understood, and accepted the terms of this disclaimer and assumes all risks associated with the use of this software.
