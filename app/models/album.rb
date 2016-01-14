# == Schema Information
#
# Table name: albums
#
#  id          :integer          not null, primary key
#  artist_id   :integer          not null
#  fan_id      :integer
#  title       :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Album < ActiveRecord::Base
  validates :artist, :title, :description, presence: true

  has_many :songs

  has_many :comments

  # belongs_to :artist,
  #   class_name: "User",
  #   foreign_key: :artist_id,
  #   primary_key: :id

  belongs_to :fan,
    class_name: "User",
    foreign_key: :fan_id,
    primary_key: :id

  has_many :genre_joins
  has_many :sub_genre_joins
  has_many :location_joins

  has_many :genres, through: :genre_joins, source: :genre
  has_many :sub_genres, through: :sub_genre_joins, source: :sub_genre
  has_many :locations, through: :location_joins, source: :location

  def self.filtered_albums(filters)
    genre_query = (filters["genre"] == "all genres" ? "'all genres'" : "genres.name")
    sub_genre_query = (filters["sub_genre"] == "all sub-genres" ? "'all sub-genres'" : "sub_genres.name")
    location_query = (filters["location"] == "all locations" ? "'all locations'" : "locations.name")
    total_query = "#{genre_query} = ? and #{sub_genre_query} = ? and #{location_query} = ?"
    Album.joins(:genres).joins(:sub_genres).joins(:locations)
      .where(total_query,
      filters["genre"],
      filters["sub_genre"],
      filters["location"])
      .uniq
  end
end
