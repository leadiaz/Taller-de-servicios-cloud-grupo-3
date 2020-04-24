class Album{
  constructor(){
    this.id;
    this.name;
    this.year;
    this.tracks = new Array();
  }
  addTrack(track){
    this.tracks.push(track);
  }
}

module.exports = Album;