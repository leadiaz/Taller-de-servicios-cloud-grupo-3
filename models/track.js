const IDAutoIncremental =  require("./IdAutoIncremental")
const idAutoIncremental = new IDAutoIncremental()


class Track{
    constructor(){
        this.id;
        this.name;
        this.duration;
        this.genres = new Array()
    }
}

module.exports = Track;