import { useParams } from "react-router";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

import { useEffect, useState } from "react";
import axios from "axios";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { user, isLoading } = useUser();

  // articleId - the value of articleId will be what we type in browser line
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};

      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    loadArticleInfo();
  }, []);

  // if value of articleId equel article.name
  // articles - is array of article conetent
  const article = articles.find(article => article.name === articleId);

  if (!article) {
    return <NotFoundPage />;
  }

  const addUpvotes = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      { headers },
    );
    const updatedArticle = response.data;

    setArticleInfo(updatedArticle);
  };

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvotes}>Add upvote</button>
        ) : (
          <button>Log in to upvote</button>
        )}

        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>

      {article.content.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleId={articleId}
          onArticleUpdated={updatedArticle => {
            setArticleInfo(updatedArticle);
          }}
        />
      ) : (
        <button>Log in to upvote</button>
      )}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
