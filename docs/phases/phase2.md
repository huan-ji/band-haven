# Phase 2: Flux Architecture and Note CRUD (2.0 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* AlbumsIndex
  - AlbumIndexItem
* AlbumForm
* SongsIndex
  - SongIndexItem
* SongForm

### Stores
* Album
* Song

### Actions
* ApiActions.receiveAllAlbums -> triggered by ApiUtil
* ApiActions.receiveSingleAlbum
* ApiActions.deleteAlbum
* AlbumActions.fetchAllAlbums -> triggers ApiUtil
* AlbumActions.fetchSingleAlbum
* AlbumActions.createAlbum
* AlbumActions.editAlbum
* AlbumActions.destroyAlbum
* ApiActions.receiveAllSongs -> triggered by ApiUtil
* ApiActions.receiveSingleSong
* ApiActions.deleteSong
* SongActions.fetchAllSongs -> triggers ApiUtil
* SongActions.fetchSingleSong
* SongActions.createSong
* SongActions.editSong
* SongActions.destroySong

### ApiUtil
* ApiUtil.fetchAllAlbums
* ApiUtil.fetchSingleAlbum
* ApiUtil.createAlbum
* ApiUtil.editAlbum
* ApiUtil.destroyAlbum
* ApiUtil.fetchAllSongs
* ApiUtil.fetchSingleSong
* ApiUtil.createSong
* ApiUtil.editSong
* ApiUtil.destroySong

## Gems/Libraries
* Flux Dispatcher (npm)
* Babel (npm)
* Flux Store (npm)
* Jquery-rails
