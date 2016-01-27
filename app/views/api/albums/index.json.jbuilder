json.array! @albums do |album|
  json.id album.id
  json.title album.title
  json.description album.description
  json.artist album.artist
  json.cover_image album.cover_image
  json.songs album.songs, :id, :title, :album, :duration, :lyrics, :public, :song_url, :album_id
end
