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
  validates :title, :album_id, :public, presence: true

  belongs_to :album

  has_one :artist, through: :album, source: :artist
end
