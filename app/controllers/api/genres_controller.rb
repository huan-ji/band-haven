class Api::GenresController < ApplicationController
  def index
    render json: Genre.all
  end
end
