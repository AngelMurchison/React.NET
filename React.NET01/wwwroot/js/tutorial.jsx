var data = [
    { id: 1, author: "Daniel Lo Nigro", text: "Hello ReactJS.NET World!" },
    { id: 2, author: "Pete Hunt", text: "This is one comment" },
    { id: 3, author: "Jordan Walke", text: "This is *another* comment" }
];

// Our React Components.
// In hierarchical order, starting with the smallest component.
var Comment = React.createClass({
    // Remarkable is a package. It allows you to add HTML Markup inline with your react components.
    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    // dangerouslySetInnerHTML is used with remarkable to properly compile the HTML it adds/modifies.
    // Our comment is using its author property as a display name in h2.
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

// Our CommentList is being generated dynamically from the data we've supplied.
// Each comment MUST have a key prop to make commentNodes possible to iterate? I guess.
// Why is commentNodes inside render unlike some of the other things we've declared?
// Also, it is a var. Are everything else we've declared properties of the var we made with 
// React. createClass()?
var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm
            </div>
        );
    }
})

var CommentBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
});

// in a real app, we should generate the URL server-side via Url.Action. Either that or
// use RouteJs
ReactDOM.render(
    <CommentBox url="/comments" />,
    document.getElementById('content')
);