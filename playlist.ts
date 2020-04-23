class Playlist{
    name:String;
    tracks:Array<Track>



    constructor(name){
        this.name = name;
        this.tracks = new Array();
    }


    duration():Number{
     return 0;
    }

    hasTrack(aTrack):Boolean{
        return null;
    }
}


import{Track} from "./track"