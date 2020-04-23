class Track {
    name:String;
    duration:Number;
    genres:Array<String>


    constructor(name,duration){
        this.name = name;
        this.duration = duration;
        this.genres = new Array()
    }



}
export{Track}