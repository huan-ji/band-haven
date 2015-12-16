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
  validates :artist_id, :title, :description, presence: true

  has_many :songs

  has_many :comments

  belongs_to :artist,
    class_name: "User",
    foreign_key: :artist_id,
    primary_key: :id

  belongs_to :fan,
    class_name: "User",
    foreign_key: :fan_id,
    primary_key: :id

end
