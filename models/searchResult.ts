import { Artist } from "./artist";
import { Album } from "./album";
import { Playlist } from "./playlist";
import { Track } from "./track";

export class SearchResult {
    constructor(
        public artists?:  Array<Artist>,
        public albums?: Array<Album>,
        public playlists?: Array<Playlist>,
        public tracks?: Array<Track>

    ){
        this.albums = new Array()
        this.artists = new Array()
        this.playlists = new Array()
        this.tracks = new Array()

    }

    addAbum(album){
      this.albums.push(album)
    }
    addArtist(artist){
        this.artists.push(artist)

    }

    addPlaylist(playlist){
        this.playlists.push(playlist)

    }

    addTrack(track){
        this.tracks.push(track)

    }
}