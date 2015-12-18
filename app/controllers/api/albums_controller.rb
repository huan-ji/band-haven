class Api::AlbumsController < ApplicationController
  def index
    @albums = Album.filtered_albums(params["filters"])
    render :index
  end
end
