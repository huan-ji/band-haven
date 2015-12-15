class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.integer :album_id, null: false
      t.string :title, null: false
      t.text :lyrics

      t.timestamps null: false
    end
    add_index :songs, :album_id
  end
end
