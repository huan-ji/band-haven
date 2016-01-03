class Api::AlbumsController < ApplicationController
  def index
    @albums = Album.filtered_albums(params["filters"])
    render :index
  end

  def show
    @album = Album.find(params[:id])
    render :show
  end
end
