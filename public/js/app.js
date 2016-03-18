/**
  * - CommentBox
  *  - CommentList
  *   - Comment
  *  - CommentForm
  */

var comments = [
  { id: 1, author: "Jon", text: "React is swell!" },
  { id: 2, author: "Timmy", text: "*Timmah!*"}
];

var moreComments = [
  { id: 3, author: "Josh", text: "React is swell!" },
  { id: 4, author: "Jane", text: "*Huh?!?*"}
];

var CommentBox = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },
  loadCommentsFromServer: function() {
    var _this = this;
    $.ajax({
      url: this.props.url,
      method: 'GET',
      datatype: 'json',
      success: function(data) {
        _this.setState({ data: data })
      }
    });
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      method: 'POST',
      dataType: 'json',
      data: comment,
      success: function(data) {
        this.setState({ data: this.state.data.concat(data) });
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, 1000);
  },
  render: function() {
    return (
      <div className="commentBox">
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        <Comment key={index} author={comment.author}>{comment.text}</Comment>
      );
    })
    return(
      <div className="commentList">
        {commentNodes.reverse()}
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
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return { author: '', text: '' }
  },
  handleAuthorChange: function(e) {
    this.setState({ author: e.target.value })
  },
  handleTextChange: function(e) {
    this.setState({ text: e.target.value })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author;
    var text = this.state.text;
    this.props.onCommentSubmit({ author: author, text: text })
    this.setState({ author: '', text: '' })
    e.target.reset();
  },
  render: function() {
    return(
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
        <input type="text" placeholder="Speak!" value={this.state.text} onChange={this.handleTextChange} />
        <button type="submit">Post</button>
      </form>
    )
  }
});

ReactDOM.render(
  <CommentBox url="http://localhost:3000/comments" />,
  document.getElementById('content')
);