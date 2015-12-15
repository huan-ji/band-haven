class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :album_id, null: false
      t.string :text, null: false

      t.timestamps null: false
    end
    add_index :comments, :user_id
    add_index :comments, :album_id
  end
end
