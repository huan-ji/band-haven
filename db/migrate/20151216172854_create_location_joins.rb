class CreateLocationJoins < ActiveRecord::Migration
  def change
    create_table :location_joins do |t|
      t.integer :album_id, null: false
      t.integer :location_id, null: false

      t.timestamps null: false
    end
    add_index :location_joins, :album_id
    add_index :location_joins, :location_id
  end
end
