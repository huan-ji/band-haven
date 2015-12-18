class Api::SubGenresController < ApplicationController
  def index
    if params["filters"].nil?
      render json: SubGenre.all
    else
      sub_genres = SubGenre.joins(:genre).where("genres.name = ?", params["filters"])
      render json: sub_genres
    end
  end
end
