import { hashCode } from '../../utils/hash.string';

export class PlayerModel{

    name: string;
    score: number;
    addScore: number;
    
    constructor(public _name: string, public _score: number,public _addScore: number){
        this.name = _name;
        this.score = _score;
        this._addScore = _addScore;
    }

    get hashName(){
        return hashCode(this.name);
    }
}
