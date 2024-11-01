// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract DeflationaryToken is ERC20, Ownable {
    uint256 public maxSupply;
    string public uri;

    constructor(string memory _name, string memory _symbol, uint256 _initialSupply, uint256 _maxSupply, address _initialOwner, string memory _uri)
        ERC20(_name, _symbol)
        Ownable(_initialOwner)
    {
        require(_initialSupply <= _maxSupply, "Initial supply cannot exceed max supply");
        maxSupply = _maxSupply;
        uri = _uri;
        _mint(_initialOwner, _initialSupply);
    }

    function setUri(string memory _uri) public onlyOwner{
        uri = _uri;
    } 

    function getUri() public view returns (string memory) {
        return uri;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Minting would exceed max supply");
        _mint(to, amount);
    }
}

contract InflationaryToken is ERC20, Ownable {
    string public uri;

    constructor(string memory _name, string memory _symbol, uint256 _initialSupply, address _initialOwner, string memory _uri)
        ERC20(_name, _symbol)
        Ownable(_initialOwner)
    {
         uri = _uri;
        _mint(_initialOwner, _initialSupply);
    }

    function setUri(string memory _uri) public onlyOwner{
        uri = _uri;
    } 

    function getUri() public view returns (string memory) {
        return uri;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

contract MemeTokenFactory {
    event TokenCreated(address tokenAddress);

    enum Strategy {
        Inflationary,
        Deflationary 
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
   
    function createInflationaryToken(string memory name, string memory symbol, uint256 initialSupply, address initialOwner, string memory uri) public {
        InflationaryToken newToken = new InflationaryToken(name, symbol, initialSupply, initialOwner, uri);
        
        ownerToTokens[initialOwner].push(address(newToken));
        tokenToContractInfo[address(newToken)] = ContractInfo({
            name: name,
            symbol: symbol,
            initialSupply: initialSupply,
            maxSupply: 0,
            uri: uri,
            strategy: Strategy.Inflationary
        });
        emit TokenCreated(address(newToken));
    }

    function createDeflationaryToken(string memory name, string memory symbol, uint256 initialSupply, uint256 maxSupply, address initialOwner, string memory uri) public {
        DeflationaryToken newToken = new DeflationaryToken(name, symbol, initialSupply, maxSupply, initialOwner, uri);
        
        ownerToTokens[initialOwner].push(address(newToken));
        tokenToContractInfo[address(newToken)] = ContractInfo({
            name: name,
            symbol: symbol,
            initialSupply: initialSupply,
            maxSupply: maxSupply,
            uri: uri,
            strategy: Strategy.Deflationary
        });
        emit TokenCreated(address(newToken));
    }

    function getTokensForOwner(address owner) public view returns (address[] memory) {
        return ownerToTokens[owner];
    }
}