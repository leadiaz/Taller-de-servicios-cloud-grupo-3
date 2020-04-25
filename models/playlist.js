const IDAutoIncremental =  require("./IdAutoIncremental")
const idAutoIncremental = new IDAutoIncremental()


class PlayList{
    constructor(){
        this.id;
        this.name
        this.tracks = new Array()
    }

    duration(){
        let resul = 0
        for (let i = 0; i < this.tracks.length; i++) {
            resul = resul + this.tracks[i].duration
            
        }
        return resul;
    }

    hasTrack(aTrack){
       return this.tracks.includes(aTrack)
    }

}