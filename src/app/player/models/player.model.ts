import { hashCode } from '../../utils/hash.string';
import { PlayerHistoryItem } from './player_history_item.model';

export class PlayerModel {

    _hashName: number;
    get hashName(){
        return this._hashName;
    }    

    get name(){        
        return this._name;
    }
    set name(value){
        this._name = value;
        this._hashName = hashCode(value);        
    }

    get score(){
        return this._score;
    }
    set score(value){
        this._score = value;
    }

    get addScore(){
        return this._addScore;
    }
    set addScore(value){
        this._addScore = value;
    }

    playerHistory: Array<PlayerHistoryItem> = [];

    constructor(private _name: string, private _score: number, private _addScore: number){
        this._hashName = hashCode(_name);     
    }
}
