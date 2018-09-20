import { Component } from '@angular/core';
import { PlayerModel } from '../models/player.model';
import { PlayerHistoryItem } from '../models/player_history_item.model';

@Component({
  selector: 'player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})
export class PlayerComponent {

    addPlayerName: string = '';    
    players: Array<PlayerModel> = [];

    localStorageKey = '[players]';

    confirmRemovePlayerId: string = "confirmRemovePlayerModalIff";
    confirmRemovePlayerHeader: string = "Delete Player";
    confirmRemovePlayerBody: string = "Are you sure you want to delete the player?";

    confirmClearPlayersId: string = "confirmClearPlayersId";
    confirmClearPlayersHeader: string = "New Game";
    confirmClearPlayersBody: string = "Are you sure you want to start a new game?";

    confirmClearScoresId: string = "confirmClearScoresId";
    confirmClearScoresHeader: string = "Clear Scores";
    confirmClearScoresBody: string = "Are you sure you want to clear the scores?";


    constructor() {
        this.players = this.getPlayersData();
    }

    onAddPlayer(){
        if (!this.addPlayerName){
            return;
        }

        if (this.players.filter(x => x.name == this.addPlayerName).length){
            return;
        }

        this.players.push( new PlayerModel(this.addPlayerName, 0, null));
        this.addPlayerName = '';

        this.savePlayersData();
    }

    onAddScores(player: PlayerModel){        
        if (!player.addScore){
            return;
        }

        if (!this.isNumber(player.addScore)){
            return;
        }

        if (!this.isInt(player.addScore)){
            return;
        }

        let playerScore =  +player.score;
        let playerAddScore = +player.addScore;
        let playerTotalScore = playerScore + playerAddScore;

        let playerHistoryItem = new PlayerHistoryItem(playerScore, playerAddScore, playerTotalScore);

        player.score = playerScore + playerAddScore;
        player.addScore = null;
        player.playerHistory.push(playerHistoryItem);

        this.savePlayersData();
    }

    onNewGame(){
        this.players = [];

        this.savePlayersData();
    }

    onClearScores(){
        this.players.forEach( player => { player.score = 0; player.addScore = null, player.playerHistory = []; });        

        this.savePlayersData();
    }


    onRemovePlayer(player){
 
        this.players = this.players.filter( p => p.hashName !== player.hashName);

        this.savePlayersData();
    }

    savePlayersData(){
        
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.players));
    }

    getPlayersData(): Array<PlayerModel> {        
        
        let playersStorage = localStorage.getItem(this.localStorageKey);
        if (!playersStorage){
            return new Array<PlayerModel>();
        }
        else{
            let rawPlayersArray = JSON.parse(playersStorage);
            let playersArray: Array<PlayerModel> = [];
            rawPlayersArray.forEach(player => {
                let currentPlayer = new PlayerModel(player._name, player._score, player._addScore);
                if (player.playerHistory){
                    player.playerHistory.forEach(item => {
                        let playerHistoryItem = new PlayerHistoryItem(item.previousScore, item.currentScore, item.totalScore);
                        currentPlayer.playerHistory.push(playerHistoryItem); 
                     });     
                }
                else{
                    player.playerHistory = new Array<PlayerHistoryItem>();
                }
                playersArray.push(currentPlayer);                
            });
            return playersArray;
        }        
    }    

    isNumber(value: string | number): boolean {
        return !isNaN(Number(value.toString()));
    }

    isInt(n): boolean {
        return n % 1 === 0;
    }
}
