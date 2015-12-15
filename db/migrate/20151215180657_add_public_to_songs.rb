class AddPublicToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :public, :boolean, default: false, null: false
  end
end
