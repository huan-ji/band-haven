# Phase 3: Comments and Tags (2 days)

## Rails
### Models
* Comment
* Tag
* Tagging

### Controllers
* Api::CommentsController (create, destroy, index, update)
* Api::TagsController (create, destroy, index, show)

### Views
* albums/comments/index.json.jbuilder
* albums/tags/index.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* CommentsIndex
* TagShow

### Stores
* CommentStore

### Actions
* ApiActions.receiveAllComments -> triggered by ApiUtil
* ApiActions.receiveSingleComment
* ApiActions.deleteComment
* CommentActions.fetchAllComments -> triggers ApiUtil
* CommentActions.fetchSingleComment
* CommentActions.createComment
* CommentActions.editComment
* CommentActions.destroyComment

### ApiUtil
* ApiUtil.fetchAllComments
* ApiUtil.fetchSingleComment
* ApiUtil.createComment
* ApiUtil.editComment
* ApiUtil.destroyComment

## Gems/Libraries
