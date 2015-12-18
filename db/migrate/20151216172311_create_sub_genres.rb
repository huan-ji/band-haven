class CreateSubGenres < ActiveRecord::Migration
  def change
    create_table :sub_genres do |t|
      t.string :name, null: false
      t.integer :genre_id, null: false
      t.timestamps null: false
    end
    add_index :sub_genres, :genre_id
  end
end
