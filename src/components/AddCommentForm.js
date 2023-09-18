import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ articleId, onArticleUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser;

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    const response = await axios.post(
      `/api/articles/${articleId}/comments`,
      {
        postedBy: name,
        text: commentText,
      },
      { headers },
    );

    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setName("");
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add Comment</h3>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
      </label>

      <button onClick={addComment}>Add comment</button>
    </div>
  );
};
export default AddCommentForm;
