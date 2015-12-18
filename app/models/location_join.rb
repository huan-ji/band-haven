class LocationJoin < ActiveRecord::Base
  belongs_to :location
  belongs_to :album
end
