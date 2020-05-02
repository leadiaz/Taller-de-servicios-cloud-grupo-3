import {Artist} from "./artist";
import {Album} from "./album";
import {Playlist} from "./playlist";
import {Track} from "./track";
import {AlbumExistsInArtistError} from "../Exceptions/albumException";

export class SearchResult {
    constructor(
        public artists?: Array<Artist>,
        public albums?: Array<Album>,
        public playlists?: Array<Playlist>,
        public tracks?: Array<Track>
    ) {
        this.albums = new Array()
        this.artists = new Array()
        this.playlists = new Array()
        this.tracks = new Array()

    }

    toJSON() {
        return {artists: this.artists, albums: this.albums, tracks: this.tracks, playlists: this.playlists}
    }

    addAbum(album) {
        if (this.existeAlbum(album.name)) {
            throw new AlbumExistsInArtistError(album.name)
        }
        this.albums.push(album)
    }

    addArtist(artist) {
        this.artists.push(artist)

    }

    addPlaylist(playlist) {
        this.playlists.push(playlist)

    }

    addTrack(track) {
        this.tracks.push(track)

    }

    private existeAlbum(name: any) {
        return this.albums.some(album => {
            return album.name === name
        })
    }
}