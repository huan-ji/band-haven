# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Album.delete_all
Genre.delete_all
GenreJoin.delete_all
SubGenre.delete_all
SubGenreJoin.delete_all
Location.delete_all
LocationJoin.delete_all
Album.create(title: "PINK GUY", artist_id: 1, description: "test album 1", cover_image: "https://f1.bcbits.com/img/a0984029365_9.jpg")
Album.create(title: "Damn Near Grown", artist_id: 1, description: "test album 2", cover_image: "https://f1.bcbits.com/img/a0690813671_9.jpg")
Album.create(title: "THIRD SIDE OF TAPE", artist_id: 1, description: "test album 3", cover_image: "https://f1.bcbits.com/img/a0812955947_9.jpg")
Album.create(title: "Black Liberation Theology", artist_id: 1, description: "test album 4", cover_image: "https://f1.bcbits.com/img/a2071164300_9.jpg")
Album.create(title: "KING OF BUCK", artist_id: 1, description: "test album 5", cover_image: "https://f1.bcbits.com/img/a3398087942_9.jpg")
Album.create(title: "leftover 2", artist_id: 1, description: "test album 6", cover_image: "https://f1.bcbits.com/img/a0292926281_9.jpg")
Genre.create(name: "rock")
Genre.create(name: "hip-hop/rap")
Genre.create(name: "eletronic")
Genre.create(name: "pop")
Genre.create(name: "r&b/soul")
GenreJoin.create(album_id: 1, genre_id: 1)
GenreJoin.create(album_id: 2, genre_id: 1)
GenreJoin.create(album_id: 3, genre_id: 2)
GenreJoin.create(album_id: 4, genre_id: 2)
GenreJoin.create(album_id: 5, genre_id: 3)
GenreJoin.create(album_id: 6, genre_id: 4)
SubGenre.create(name: "indie", genre_id: 1)
SubGenre.create(name: "hard rock", genre_id: 1)
SubGenre.create(name: "psychadelic rock", genre_id: 1)
SubGenre.create(name: "rap", genre_id: 2)
SubGenre.create(name: "trap", genre_id: 2)
SubGenre.create(name: "underground hip-hop", genre_id: 2)
SubGenre.create(name: "house", genre_id: 3)
SubGenre.create(name: "dance", genre_id: 3)
SubGenre.create(name: "indie pop", genre_id: 4)
SubGenre.create(name: "new wave", genre_id: 4)
SubGenreJoin.create(album_id: 1, sub_genre_id: 1)
SubGenreJoin.create(album_id: 1, sub_genre_id: 2)
SubGenreJoin.create(album_id: 2, sub_genre_id: 3)
SubGenreJoin.create(album_id: 2, sub_genre_id: 4)
SubGenreJoin.create(album_id: 3, sub_genre_id: 5)
SubGenreJoin.create(album_id: 3, sub_genre_id: 6)
SubGenreJoin.create(album_id: 4, sub_genre_id: 7)
SubGenreJoin.create(album_id: 5, sub_genre_id: 8)
SubGenreJoin.create(album_id: 6, sub_genre_id: 9)
SubGenreJoin.create(album_id: 6, sub_genre_id: 3)
Location.create(name: "San Diego")
Location.create(name: "San Francisco")
Location.create(name: "Los Angeles")
Location.create(name: "New York")
LocationJoin.create(album_id: 1, location_id: 1)
LocationJoin.create(album_id: 2, location_id: 1)
LocationJoin.create(album_id: 3, location_id: 2)
LocationJoin.create(album_id: 4, location_id: 2)
LocationJoin.create(album_id: 5, location_id: 3)
LocationJoin.create(album_id: 6, location_id: 4)
Song.create(title: "Promise [Part 2]", lyrics: "Over and gone,
She waited.

(He would travel far to find her,
Finally she breathed her answer…)

Over and gone
A promise kept is all that's left.
Nothing changes.

Over and on,
over and gone, she…
over and on
over and gone… ", album_id: 1, duration: "8:53", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Unturning", lyrics: "Over and gone,
She waited.

(He would travel far to find her,
Finally she breathed her answer…)

Over and gone
A promise kept is all that's left.
Nothing changes.

Over and on,
over and gone, she…
over and on
over and gone… ", album_id: 1, duration: "08:53", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Instinc", lyrics: "", album_id: 1, duration: "08:25", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Womb (In Memoriam)", lyrics: "", album_id: 1, duration: "07:00", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Selfsame", lyrics: "", album_id: 1, duration: "02:26", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Holding Atropos", lyrics: "", album_id: 1, duration: "08:24", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Keeping Stone: Sound on Fire", lyrics: "", album_id: 1, duration: "04:09", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Learned", lyrics: "", album_id: 1, duration: "09:22", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Hunter, Heart & Home", lyrics: "", album_id: 1, duration: "23:15", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Little Burden", lyrics: "", album_id: 1, duration: "07:46", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Impatience and Slow Poison", lyrics: "", album_id: 1, duration: "07:46", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Known", lyrics: "", album_id: 1, duration: "07:02", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Nightingale's Weave", lyrics: "", album_id: 1, duration: "02:50", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Eyes for the Change", lyrics: "", album_id: 1, duration: "08:31", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Keeping Stone: Water Awake", lyrics: "", album_id: 1, duration: "06:19", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Promise [Part 1]", lyrics: "", album_id: 1, duration: "07:34", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Promise [Part 2]", lyrics: "Over and gone,
She waited.

(He would travel far to find her,
Finally she breathed her answer…)

Over and gone
A promise kept is all that's left.
Nothing changes.

Over and on,
over and gone, she…
over and on
over and gone… ", album_id: 2, duration: "8:53", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Unturning", lyrics: "Over and gone,
She waited.

(He would travel far to find her,
Finally she breathed her answer…)

Over and gone
A promise kept is all that's left.
Nothing changes.

Over and on,
over and gone, she…
over and on
over and gone… ", album_id: 2, duration: "08:53", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Instinc", lyrics: "", album_id: 2, duration: "08:25", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Womb (In Memoriam)", lyrics: "", album_id: 2, duration: "07:00", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Selfsame", lyrics: "", album_id: 2, duration: "02:26", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Holding Atropos", lyrics: "", album_id: 2, duration: "08:24", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Keeping Stone: Sound on Fire", lyrics: "", album_id: 2, duration: "04:09", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Learned", lyrics: "", album_id: 2, duration: "09:22", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Hunter, Heart & Home", lyrics: "", album_id: 2, duration: "23:15", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Little Burden", lyrics: "", album_id: 2, duration: "07:46", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Impatience and Slow Poison", lyrics: "", album_id: 2, duration: "07:46", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Known", lyrics: "", album_id: 2, duration: "07:02", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Nightingale's Weave", lyrics: "", album_id: 2, duration: "02:50", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Eyes for the Change", lyrics: "", album_id: 2, duration: "08:31", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Keeping Stone: Water Awake", lyrics: "", album_id: 2, duration: "06:19", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
Song.create(title: "Promise [Part 1]", lyrics: "", album_id: 2, duration: "07:34", song_url: "http://www.alexkatz.me/codepen/music/interlude.mp3", public: true)
