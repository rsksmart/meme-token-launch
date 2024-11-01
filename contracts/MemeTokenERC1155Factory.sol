// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC1155Token is ERC1155, Ownable {
    constructor(
        string memory _name,
        address initialOwner,
        string memory _uri
    ) ERC1155(_name) Ownable(initialOwner) {
        _setURI(_uri);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }
}

contract MemeTokenERC1155Factory {
    event TokenCreated(address tokenAddress);

    enum Strategy {
        ERC1155
    }

    struct ContractInfo {
        string name;
        string symbol;
        uint256 initialSupply;
        uint256 maxSupply;
        string uri;
        Strategy strategy;
    }

    mapping(address => address[]) public ownerToTokens;
    mapping(address => ContractInfo) public tokenToContractInfo;

    function createERC1155Token(
        string memory name,
        address initialOwner,
        string memory uri
    ) public {
        ERC1155Token newToken = new ERC1155Token(name, initialOwner,uri);
        ownerToTokens[initialOwner].push(address(newToken));
        tokenToContractInfo[address(newToken)] = ContractInfo({
            name: name,
            symbol: "",
            initialSupply: 0,
            maxSupply: 0,
            uri: uri,
            strategy: Strategy.ERC1155
        });
        emit TokenCreated(address(newToken));
    }

    function getTokensForOwner(
        address owner
    ) public view returns (address[] memory) {
        return ownerToTokens[owner];
    }
}