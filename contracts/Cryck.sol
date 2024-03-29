// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Cryck is ERC20,Ownable {
    struct Bet{
        uint256 betId;
        uint256 betAmount;
        uint256 betOption;
        uint256 reward;
        bool isWon;
    }

    uint256 private constant TOKENS_PER_ETH = 1000;

    mapping(address => Bet) public userBets;
    mapping(uint256 => address[]) public betIdToAddress;
    mapping(uint256 => uint256) public betIdToBetPool;
    mapping(uint256 => uint256) public betIdToAnswers;

    uint256 public totalBets;
    uint256 public constant TOTAL_OPTIONS = 43;

    constructor() ERC20("Cryck","CRC") {
        // can bet for first 6 balls
        totalBets=6;
    }

    function mintCoins() external payable{
        uint256 ethAmount = msg.value;
        require(ethAmount > 0,"Sent 0 ETH for coins");
        uint256 tokensToMint = (msg.value * TOKENS_PER_ETH) / 1 ether;
        _mint(msg.sender,tokensToMint);
    }

    function mintEthBack(uint256 tokenAmount) external payable{
        require(tokenAmount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient token balance");
        uint256 ethToReturn = tokenAmount * 1 ether / TOKENS_PER_ETH;
        _burn(msg.sender, tokenAmount);
        payable(msg.sender).transfer(ethToReturn);
    }

    function bet(uint256 _betAmount,uint256 _betId,uint256 _betOption) external{
        require(betIdToAnswers[_betId]>0,"Bet is over");
        require(balanceOf(msg.sender) >= _betAmount, "Insufficient tokens for the bet");

        Bet memory newBet = Bet({
            betId: _betId,
            betAmount: _betAmount,
            betOption : _betOption,
            reward : 0,
            isWon: false
        });

        userBets[msg.sender] = newBet;
        betIdToBetPool[_betId] += _betAmount;
        betIdToAddress[_betId].push(msg.sender);

        _transfer(msg.sender, address(this), _betAmount);
    }

    function uploadAnswerForBet(uint256 _betId,uint256 _optionId) external onlyOwner{
        require(_betId < totalBets,"Incorrect betId");
        require(_optionId >0 && _optionId < TOTAL_OPTIONS, "Incorrect optionId");
        require(betIdToAnswers[_betId]==0,"Bet settled");

        totalBets+=6;
        betIdToAnswers[_betId] = _optionId;
        _calculateRewards(_betId);
    }

    function canWithdrawTokens(uint256 _betId) external view returns(bool){
        return betIdToAnswers[_betId] > 0;
    }

    function resolveBet(uint256 _betId) external returns (bool) {
        require(userBets[msg.sender].betAmount > 0, "No bet placed");
        require(!userBets[msg.sender].isWon, "Already won");
        require(betIdToAnswers[_betId] > 0, "Bet Not resolved");
        
        if(userBets[msg.sender].reward == 0){
            return false;
        }
        userBets[msg.sender].isWon = true;

        _transfer(address(this), msg.sender, userBets[msg.sender].reward);
        return true;
    }

    // function _calculateRewards(uint256 _betId) internal {
    //     // loop over betIdToAddress[_betId]
    //     // get the Bet from userBet of each address and check if the optionId and betIdToAnswers[_betId] matches
    //     // if yes put isWon as true;
    //     // keep track of total losers amount
    //     // at the end loop again and send the total losers amount to reward part of to people with isWon 
    // }

    function _calculateRewards(uint256 _betId) internal {
        uint256 correctOptionId = betIdToAnswers[_betId];
        uint256 totalLoserBetAmount = 0;
        uint256 totalWinners = 0;

        // Calculate the total amount bet by losers and count winners
        for (uint256 i = 0; i < betIdToAddress[_betId].length; i++) {
            address bettor = betIdToAddress[_betId][i];
            Bet storage bet = userBets[bettor];
            if (bet.betId == _betId) {
                if (bet.betOption != correctOptionId) {
                    totalLoserBetAmount += bet.betAmount;
                    bet.isWon = false;
                } else {
                    bet.isWon = true; // Mark as won
                    totalWinners++;
                }
            }
        }

        // If there are no winners, no need to proceed further
        if (totalWinners == 0 || totalLoserBetAmount == 0) return;

        // Calculate the reward to be added to each winner's reward based on losers' total bet amount
        uint256 rewardPerWinner = totalLoserBetAmount / totalWinners;

        // Distribute the loser's pool to the winners
        for (uint256 i = 0; i < betIdToAddress[_betId].length; i++) {
            address bettor = betIdToAddress[_betId][i];
            Bet storage bet = userBets[bettor];
            if (bet.betId == _betId && bet.betOption == correctOptionId) {
                bet.reward += rewardPerWinner; // Add the calculated reward
            }
        }
    }


}