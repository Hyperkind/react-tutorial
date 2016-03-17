/**
  * - CommentBox
  *  - CommentList
  *   - Comment
  *  - CommentForm
  */

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <CommentList />
        <CommentForm />
        Hello, world! I am a CommentBox.
      </div>
    )
  }
});

var CommentList = React.createClass({
  render: function() {
    return(
      <div className="commentList">
        <Comment author="Jon">React is swell!</Comment>
        <Comment author="Timmy">*Timmah!*</Comment>
      </div>
    )
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return(
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
})

var CommentForm = React.createClass({
  render: function() {
    return(
      <div className="commentForm">
        Hello! This is the CommentForm!
      </div>
    )
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);