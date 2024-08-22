// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract DeflationaryToken is ERC20, Ownable {
    uint256 public maxSupply;

    constructor(string memory _name, string memory _symbol, uint256 _initialSupply, uint256 _maxSupply, address _initialOwner)
        ERC20(_name, _symbol)
        Ownable(_initialOwner)
    {
        require(_initialSupply <= _maxSupply, "Initial supply cannot exceed max supply");
        maxSupply = _maxSupply;
        _mint(msg.sender, _initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Minting would exceed max supply");
        _mint(to, amount);
    }
}

contract InflationaryToken is ERC20, Ownable {
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply, address _initialOwner)
        ERC20(_name, _symbol)
        Ownable(_initialOwner)
    {
        _mint(msg.sender, _initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

contract MemeTokenFactory {
    event TokenCreated(address tokenAddress);
   
    function createInflationaryToken(string memory name, string memory symbol, uint256 initialSupply, address initialOwner) public {
        InflationaryToken newToken = new InflationaryToken(name, symbol, initialSupply, initialOwner);
        
        emit TokenCreated(address(newToken));
    }

     function createDeflationaryToken(string memory name, string memory symbol, uint256 initialSupply, uint256 maxSupply, address initialOwner) public {
        DeflationaryToken newToken = new DeflationaryToken(name, symbol, initialSupply, maxSupply, initialOwner);
        
        emit TokenCreated(address(newToken));
    }
}