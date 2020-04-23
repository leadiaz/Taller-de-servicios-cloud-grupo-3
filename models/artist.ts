
class Artist{
    name:String;
    country:String;
    albumes:Array<Album>

    


    constructor(name,country){
        this.name = name;
        this.country = country;
        this.albumes = new Array()
    }
}

export{Artist}
import { Album } from "./album";