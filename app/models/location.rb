class Location < ActiveRecord::Base
  has_many :location_joins

  has_many :albums, through: :location_joins, source: :album
end
