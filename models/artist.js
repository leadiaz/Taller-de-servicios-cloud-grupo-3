const IDAutoIncremental =  require("./IdAutoIncremental")
const idAutoIncremental = new IDAutoIncremental()


class Artist{
    
    constructor(){
        this.id = IDAutoIncremental.getId();
        this.name;
        this.country;
        this.albumes = new Array()
    }

    addAlbum(album){
        this.albumes.push(album)
    }

}

module.exports = Artist;