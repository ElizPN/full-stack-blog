function CommentsList({ comments }) {
  return (
    <div>
      <h2>Comments:</h2>
      {comments.map(comment => {
        return (
          <div className="comment" key={comment.postedBy + ":" + comment.text}>
            <h3>{comment.postedBy}</h3>
            <p>{comment.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsList;
