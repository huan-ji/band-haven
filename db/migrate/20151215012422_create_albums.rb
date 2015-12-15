class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.integer :artist_id, null: false
      t.integer :fan_id
      t.string :title, null: false
      t.text :description, null: false

      t.timestamps null: false
    end
    add_index :albums, :fan_id
    add_index :albums, :artist_id
    add_index :albums, :title
  end
end
