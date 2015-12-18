class SubGenreJoin < ActiveRecord::Base
  belongs_to :sub_genre
  belongs_to :album
end
