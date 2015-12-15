# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  album_id   :integer          not null
#  text       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :user_id, :album_id, :text, presence: true

  belongs_to :album

  belongs_to :user
end
