# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160113222833) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: :cascade do |t|
    t.integer  "fan_id"
    t.string   "title",       null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "cover_image", null: false
    t.string   "artist"
  end

  add_index "albums", ["fan_id"], name: "index_albums_on_fan_id", using: :btree
  add_index "albums", ["title"], name: "index_albums_on_title", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "album_id",   null: false
    t.string   "text",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["album_id"], name: "index_comments_on_album_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "genre_joins", force: :cascade do |t|
    t.integer  "album_id",   null: false
    t.integer  "genre_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "genre_joins", ["album_id"], name: "index_genre_joins_on_album_id", using: :btree
  add_index "genre_joins", ["genre_id"], name: "index_genre_joins_on_genre_id", using: :btree

  create_table "genres", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "location_joins", force: :cascade do |t|
    t.integer  "album_id",    null: false
    t.integer  "location_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "location_joins", ["album_id"], name: "index_location_joins_on_album_id", using: :btree
  add_index "location_joins", ["location_id"], name: "index_location_joins_on_location_id", using: :btree

  create_table "locations", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "songs", force: :cascade do |t|
    t.integer  "album_id",                   null: false
    t.string   "title",                      null: false
    t.text     "lyrics"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "public",     default: false, null: false
    t.string   "duration",                   null: false
    t.string   "song_url",                   null: false
  end

  add_index "songs", ["album_id"], name: "index_songs_on_album_id", using: :btree

  create_table "sub_genre_joins", force: :cascade do |t|
    t.integer  "album_id",     null: false
    t.integer  "sub_genre_id", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "sub_genre_joins", ["album_id"], name: "index_sub_genre_joins_on_album_id", using: :btree
  add_index "sub_genre_joins", ["sub_genre_id"], name: "index_sub_genre_joins_on_sub_genre_id", using: :btree

  create_table "sub_genres", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "genre_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "sub_genres", ["genre_id"], name: "index_sub_genres_on_genre_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "album_id",   null: false
    t.integer  "tag_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "taggings", ["album_id"], name: "index_taggings_on_album_id", using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "type",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.boolean  "artist",          null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
