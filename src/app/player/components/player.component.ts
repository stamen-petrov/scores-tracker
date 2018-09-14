import { Component } from '@angular/core';
import { PlayerModel } from '../models/player.model';

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

        this.players.push({name: this.addPlayerName, score: 0, addScore: null});
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
        player.score = +player.score + +player.addScore;
        player.addScore = null;

        this.savePlayersData();
    }

    onNewGame(){
        this.players = [];

        this.savePlayersData();
    }

    onClearScores(){
        this.players.forEach( player => { player.score = 0; player.addScore = null; });        

        this.savePlayersData();
    }


    onRemovePlayer(player){
 
        this.players = this.players.filter( p => p.name !== player.name);

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
            return JSON.parse(playersStorage);
        }        
    }    

    isNumber(value: string | number): boolean {
        return !isNaN(Number(value.toString()));
    }

    isInt(n): boolean {
        return n % 1 === 0;
    }
}
