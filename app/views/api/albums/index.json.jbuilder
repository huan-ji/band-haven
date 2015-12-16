json.array! @albums do |album|
  json.id album.id
  json.title album.title
  json.description album.description
  json.artist album.artist
  json.cover_image album.cover_image
end
