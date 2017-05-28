var data = [
    { id: 1, author: "Daniel Lo Nigro", text: "Hello ReactJS.NET World!" },
    { id: 2, author: "Pete Hunt", text: "This is one comment" },
    { id: 3, author: "Jordan Walke", text: "This is *another* comment" }
];

// Learn to use this json data blob.


// Our React Components.
// In ascending hierarchical order.
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

// Our CommentList is being fed an "author" property.
var CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                <Comment author="Daniel Lo Nigro"> Hello ReactJS.NET World!</Comment>
                <Comment author="Pete Hunt">This is one comment</Comment>
                <Comment author="Jordan Walke">This is *another* comment</Comment>
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
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                <CommentForm />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox data={data} />,
    document.getElementById('content')
);