# *(Meme) Token Launch*

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/rsksmart/meme-token-launch/badge)](https://scorecard.dev/viewer/?uri=github.com/rsksmart/meme-token-launch)
[![CodeQL](https://github.com/rsksmart/rskj/workflows/CodeQL/badge.svg)](https://github.com/rsksmart/meme-token-launch/actions?query=workflow%3ACodeQL)

<img src="rootstock-logo.png" alt="RSK Logo" style="width:100%; height: auto;" />

This project is an open-source proof of concept implemnting a (Meme) Token Launch project on Rootstock using Thirdweb. The primary goal is to allow users to deploy their own ERC20 or ERC721 contracts on Rootstock testnet.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)

## Overview

A full-stack decentralized application that simplifies meme token creation on Rootstock testnet. The platform provides an intuitive web interface for deploying and managing both ERC20 tokens and ERC721 NFT collections without requiring deep blockchain development knowledge.

### What You Can Do

- **Deploy ERC20 Tokens**: Create fungible tokens with custom name, symbol, and metadata
- **Deploy ERC721 Collections**: Launch NFT drops with configurable properties
- **Manage Your Tokens**: View and track all tokens deployed from your wallet address
- **One-Click Deployment**: Streamlined deployment process powered by Thirdweb SDK

### Application Architecture

**Frontend (Next.js App)**

- Landing page with project introduction and feature overview
- `/deploy-token` - Interactive form for token creation and deployment
- `/my-tokens` - Dashboard showing user's deployed contracts
- Wallet connection and Rootstock testnet integration

**Backend (Hono API)**

- `POST /v1/deploy/erc20` - Deploy ERC20 token contracts
- `POST /v1/deploy/erc721` - Deploy ERC721 NFT contracts  
- `GET /v1/deploys/:walletAddress` - Query user's deployed contracts
- Server-side deployment using secure private key management

## Technologies Used

- **Thirdweb**: [Thirdweb](https://www.openzeppelin.com/)

## Project Structure

```bash
├── apps
│   ├── api // Hono API using Thirdweb SDK to deploy contracts and query the ownership
│   └── client // Nextjs API using Thirdweb React SDK 
├── docker-compose.yml
├── LICENSE
├── Makefile
├── package.json
├── README.md
├── rootstock-logo.png
├── SECURITY.MD
└── turbo.json
```

## Installation

To clone and run this project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/rsksmart/meme-token-launch.git
   cd meme-token-launch
   ```

2. **Configure environment variables**:

   Navigating to both projects, you'll find .env files dependent on Thirdweb credentials. These can be obtained from <https://thirdweb.com/team>, including a private key responsible for server interactions such as deployments and querying owned contracts.

   ### Client

   ```sh
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=
   ```

   ### API

   ```sh
   THIRDWEB_CLIENT_ID=
   THIRDWEB_SECRET_KEY=
   PRIVATE_KEY=
   ```

3. **Run the development enviroment**:

   ```sh
   make dev
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

The software provided in this GitHub repository is offered "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.

- **Testing:** The software has not undergone testing of any kind, and its functionality, accuracy, reliability, and suitability for any purpose are not guaranteed.
- **Use at Your Own Risk:** The user assumes all risks associated with the use of this software. The author(s) of this software shall not be held liable for any damages, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of or inability to use this software, even if advised of the possibility of such damages.
- **No Liability:** The author(s) of this software are not liable for any loss or damage, including without limitation, any loss of profits, business interruption, loss of information or data, or other pecuniary loss arising out of the use of or inability to use this software.
- **Sole Responsibility:** The user acknowledges that they are solely responsible for the outcome of the use of this software, including any decisions made or actions taken based on the software's output or functionality.
- **No Endorsement:** Mention of any specific product, service, or organization does not constitute or imply endorsement by the author(s) of this software.
- **Modification and Distribution:** This software may be modified and distributed under the terms of the license provided with the software. By modifying or distributing this software, you agree to be bound by the terms of the license.
- **Assumption of Risk:** By using this software, the user acknowledges and agrees that they have read, understood, and accepted the terms of this disclaimer and assumes all risks associated with the use of this software.
