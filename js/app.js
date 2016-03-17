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

var comments = [
  { id: 1, author: "Jon", text: "React is swell!" },
  { id: 2, author: "Timmy", text: "*Timmah!*"}
];

var CommentList = React.createClass({
  render: function() {
    var commentNodes = comments.map(function(comment, index) {
      return (
        <Comment key={index} author={comment.author}>{comment.text}</Comment>
      );
    })
    return(
      <div className="commentList">
        {commentNodes}
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