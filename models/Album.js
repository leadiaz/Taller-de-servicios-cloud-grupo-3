const IDAutoIncremental =  require("./IdAutoIncremental")
const idAutoIncremental = new IDAutoIncremental()
const Track = require("./track")

class Album{
    constructor(){
        this.id = IDAutoIncremental.getId()
        this.name;
        this.year;
        this.tracks = new Array()

    }

    
    
}
module.exports = Album;