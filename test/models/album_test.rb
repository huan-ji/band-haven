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

require 'test_helper'

class AlbumTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
