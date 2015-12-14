# FresherNote

[Heroku link][heroku]

[heroku]: https://band-haven.herokuapp.com/

## Minimum Viable Product

BandHaven is a web application inspired by BandCamp built using Ruby on Rails
and React.js. BandCamp allows users to:


- [ ] Create a fan account or an artist account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete albums as artist
- [ ] Browse albums of other artists as a fan or an artist
- [ ] Filter artists by categories and sub-categories of music as well as location
- [ ] Play songs from albums while browsing
- [ ] Discover new music with music recommendations on front page
- [ ] Purchase and add albums to your personal collection of music

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Note Model and JSON API (2.0 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Users, Albums, and Songs.

[Details][phase-one]

### Phase 2: Flux Architecture and Album CRUD (2.0 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, an Album store and a Song store will be implemented and a set of actions
corresponding to the needed CRUD functionality created. Once this is done, I
will create React views for the Albums and Songs `Index`, `IndexItem` and `Form`.
At the end of Phase 2, Albums and Songs can be created, read, edited and destroyed
in the browser. Albums and songs should save to the database when the form loses
focus or is left idle after editing. Lastly, while constructing the views I will
start using basic bootstrap for styling.

[Details][phase-two]

### Phase 3: Comments and Tags (2 days)

Phase 3 adds additional features for the albums show page of comments and tags.
Each album can be tagged to be different styles by the album creator, as well as
location tags. Fans who support albums can also leave a comment on the comment
show page and have their icon displayed at a supporter icon section beneath the
comments.

[Details][phase-three]

### Phase 4: Front page album index sorting (2 days)

Front page albums index will have a sorting feature that takes in album tags
created by the artist and sort albums based on a genre, sub-genre or location.
These three different types of tags are indicated in the type column for the tag
model.

[Details][phase-four]

### Phase 5: Styling Cleanup and Seeding (1 day)

Bootstrap and CSS will be heavily used to make the site look professional.
Transitions will be heavily used. Seeding of albums and album covers will be
added.

[Details][phase-five]



### Bonus Features (TBD)
- [ ] Custom artist pages
- [ ] Following artists and artist announcements
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
