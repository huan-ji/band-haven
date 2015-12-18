class CreateSubGenreJoins < ActiveRecord::Migration
  def change
    create_table :sub_genre_joins do |t|
      t.integer :album_id, null: false
      t.integer :sub_genre_id, null: false

      t.timestamps null: false
    end
    add_index :sub_genre_joins, :album_id
    add_index :sub_genre_joins, :sub_genre_id
  end
end
