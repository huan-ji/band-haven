# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  type       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  validates :name, :type, presence: true

  has_many :taggings

  has_many :albums, through: :taggings, source: :album
end
