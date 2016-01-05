class Api::AlbumsController < ApplicationController
  def index
    if params["filters"]
      @albums = Album.filtered_albums(params["filters"])
    else
      @albums = Album.all
    end
    render :index
  end

  def show
    @album = Album.find(params[:id])
    render :show
  end
end
