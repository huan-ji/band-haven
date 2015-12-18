class SubGenre < ActiveRecord::Base
  belongs_to :genre
  has_many :sub_genre_joins

  has_many :albums, through: :sub_genre_joins, source: :album
end
