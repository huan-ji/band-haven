# Phase 4: Front page album index sorting (2 days)

## Rails
### Models

### Controllers

### Views
* AlbumsIndex
  - AlbumIndexItem

## Flux
### Views (React Components)
* AlbumsIndex
  - AlbumIndexItem
* AlbumForm

### Stores
TagStore

### Actions
* ApiActions.receiveAllAlbums -> triggered by ApiUtil
* AlbumActions.fetchAllAlbums -> triggers ApiUtil

## Gems/Libraries
