class AddCoverToAlbum < ActiveRecord::Migration
  def change
    add_column :albums, :cover_image, :string, null: false
  end
end
