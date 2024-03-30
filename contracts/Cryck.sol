// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Cryck is ERC20{
    struct Bet{
        bool isWon;
        uint256 betId;
        uint256 reward; // replace to make it generic
        uint256 betAmount;
        uint256 betOption;
        uint256 betZone;
        uint256 betOver;
        uint256 betBallNumber;
        uint256 betPrediction;
    }

    uint256 private constant TOKENS_PER_ETH = 1000;

    mapping(address => Bet[]) public userBets;
    mapping(uint256 => address[]) public betIdToAddress;
    mapping(uint256 => uint256) public betIdToBetPool;
    mapping(uint256 => uint256) public betIdToAnswers;
    mapping(uint256 => uint256) public betIdToRewards;

    uint256 public totalBets;
    uint256 public constant TOTAL_OPTIONS = 43;

    constructor() ERC20("Cryck","CRC"){
    }

    function mintCoins(uint256 CRCAmount) external payable{
        require(CRCAmount > 0, "Requested CRC amount must be greater than 0");
        uint256 requiredEth = (CRCAmount * 1 ether) / TOKENS_PER_ETH;
        require(msg.value >= requiredEth, "Not enough ETH sent");

        _mint(msg.sender,CRCAmount);
    }

    function convertCRCToEth(uint256 ethAmount) external {
        require(ethAmount > 0, "ETH amount must be greater than 0");
        uint256 requiredCRCTokens = (ethAmount * TOKENS_PER_ETH)/ 1 ether;
        
        require(balanceOf(msg.sender) >= requiredCRCTokens, "Insufficient CRC token balance");
        require(address(this).balance >= ethAmount, "Contract does not have enough ETH");

        _burn(msg.sender, requiredCRCTokens);
        payable(msg.sender).transfer(ethAmount);
    }

    function bet(uint256 _betAmount,uint256 _betId,uint256 _betOption,uint256 _betZone,uint256 _betOver,uint256 _betBallNumber,uint256 _betPrediction) external {
        require(betIdToAnswers[_betId]==0,"Bet is over");
        require(balanceOf(msg.sender) >= _betAmount, "Insufficient tokens for the bet");

        Bet memory newBet = Bet({
            betId: _betId,
            betAmount: _betAmount,
            betOption : _betOption,
            betZone:_betZone,
            betOver:_betOver,
            betBallNumber:_betBallNumber,
            betPrediction:_betPrediction,
            reward : 0,
            isWon: false
        });

        if(betIdToAddress[_betId].length == 0){
            totalBets++;
        }

        Bet[] memory allUserBets = userBets[msg.sender];
        if(allUserBets.length > 0){
            Bet memory lastBet = allUserBets[allUserBets.length - 1];
            if(lastBet.betId == _betId){
                userBets[msg.sender].pop();
            }
        }

        userBets[msg.sender].push(newBet);
        betIdToBetPool[_betId] += _betAmount;
        betIdToAddress[_betId].push(msg.sender);

        _transfer(msg.sender, address(this), _betAmount);
    }

    function uploadAnswerForBet(uint256 _betId,uint256 _optionId) external{
        require(_optionId >0 && _optionId < TOTAL_OPTIONS, "Incorrect optionId");
        require(betIdToAnswers[_betId]==0,"Bet settled");
        require(betIdToAddress[_betId].length > 0, "No bets placed by anyone");

        betIdToAnswers[_betId] = _optionId;
        _calculateRewards(_betId);
    }

    function getBetsByAddress(address user) external view returns(Bet[] memory bets){
        return userBets[user];
    }

    function canWithdrawTokens(uint256 _betId) external view returns(bool){
        return betIdToAnswers[_betId] > 0;
    }

    function resolveBet(uint256 _betId) external {
        require(betIdToAnswers[_betId] > 0, "Bet not resolved");

        bool betFound = false;
        uint256 betIndex;

        // Start from the end of the userBets array for the caller
        for (int256 i = int256(userBets[msg.sender].length) - 1; i >= 0; i--) {
            if (userBets[msg.sender][uint256(i)].betId == _betId) {
                betFound = true;
                betIndex = uint256(i);
                break; // Break once the relevant bet is found
            }
        }

        // Ensure a bet was found
        require(betFound, "No bet placed");
        
        // Access the bet directly now that we have the index
        Bet storage bet = userBets[msg.sender][betIndex];
        
        // Perform the checks on the found bet
        require(bet.betAmount > 0, "No bet placed");
        require(bet.isWon, "You lost bet");

        // Mark the bet as won
        bet.isWon = false;

        // Transfer the winnings + original bet amount back to the user
        _transfer(address(this), msg.sender, betIdToRewards[_betId] + bet.betAmount);
    }

    function _calculateRewards(uint256 _betId) internal {
        uint256 correctOptionId = betIdToAnswers[_betId];
        uint256 totalLoserBetAmount = 0;
        uint256 totalWinners = 0;

        // Iterate over each address that participated in the bet
        for (uint256 i = 0; i < betIdToAddress[_betId].length; i++) {
            address bettor = betIdToAddress[_betId][i];
            // Start from the end of the userBets array for the bettor
            for (int256 j = int256(userBets[bettor].length) - 1; j >= 0; j--) {
                Bet storage bet = userBets[bettor][uint256(j)]; // Convert j back to unsigned int
                if (bet.betId == _betId) {
                    if (bet.betOption != correctOptionId) {
                        totalLoserBetAmount += bet.betAmount;
                        bet.isWon = false;
                    } else {
                        bet.isWon = true; // Mark as won
                        totalWinners++;
                    }
                    break; // Break the loop once the relevant bet is found
                }
            }
        }

        // If there are no winners or loser bet amount is 0, no need to proceed further
        if (totalWinners == 0 || totalLoserBetAmount == 0) return;

        // Calculate the reward to be added to each winner's reward based on losers' total bet amount
        uint256 rewardPerWinner = totalLoserBetAmount / totalWinners;
        betIdToRewards[_betId] = rewardPerWinner;
    }
}