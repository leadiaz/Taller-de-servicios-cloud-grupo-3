class Artist{
  constructor(){
    this.id = 1;
    this.name;
    this.country;
    this.albumes = new Array();
  }
  addAlbum(album){
    this.albumes.push(album);
  }
}

module.exports = Artist;