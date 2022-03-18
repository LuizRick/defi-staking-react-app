pragma solidity >0.5.0;

import './Reward.sol';
import './Tether.sol';

contract DecentralBank{
    string public name = 'DecentralBank';
    address public owner;
    Tether public tether;
    Reward public rwd;
    address[] public stakers;

    mapping(address => uint ) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(Reward _rwd, Tether _tether){
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }


    function depositTokens(uint _amount) public {
        //require staking amount to be greater than zero
        require(_amount > 0, 'amount cannot be 0');
        //Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //Update Staking Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;


        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //issue rewards
    function issueTokens() public {
        //require the owner to issue tokens only
        require(msg.sender == owner, 'caller must be the owner');

        for(uint i=0; i < stakers.length; i++){
            address recipient = stakers[i];
            if(stakingBalance[recipient] > 0){
                uint balance = stakingBalance[recipient]  / 9; // / 9 to create percentage incentive
                rwd.transfer(recipient, balance);
            }
        }
    }

    //unstake tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'staking balance cant be less tahn zero');

        // transfer the tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);

        //reset staking balance
        stakingBalance[msg.sender] = 0;
        isStaked[msg.sender] = false;
    }
}