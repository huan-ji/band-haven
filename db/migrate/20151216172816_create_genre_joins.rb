class CreateGenreJoins < ActiveRecord::Migration
  def change
    create_table :genre_joins do |t|
      t.integer :album_id, null: false
      t.integer :genre_id, null: false
      t.timestamps null: false
    end
    add_index :genre_joins, :album_id
    add_index :genre_joins, :genre_id
  end
end
