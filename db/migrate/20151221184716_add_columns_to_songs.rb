class AddColumnsToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :duration, :string, null: false
    add_column :songs, :song_url, :string, null: false
  end
end
