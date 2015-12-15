# == Schema Information
#
# Table name: songs
#
#  id         :integer          not null, primary key
#  album_id   :integer          not null
#  title      :string           not null
#  lyrics     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Song < ActiveRecord::Base
  validates :title, :album_id, presence: true

  belongs_to :album

  belongs_to :artist, through: :album, source: :artist

  belongs_to :fan, through: :album, source: :fan
end
