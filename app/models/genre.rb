class Genre < ActiveRecord::Base
  has_many :sub_genres
  has_many :genre_joins

  has_many :albums, through: :genre_joins, source: :album
end
