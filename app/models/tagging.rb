# == Schema Information
#
# Table name: taggings
#
#  id         :integer          not null, primary key
#  album_id   :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tagging < ActiveRecord::Base
  validates :album_id, :tag_id, presence: true

  belongs_to :album

  belongs_to :tag
end
