import { useParams } from "react-router";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";

import { useEffect, useState } from "react";
import axios from "axios";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  // articleId - the value of articleId will be what we type in browser line
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
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
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;

    setArticleInfo(updatedArticle);
  };

  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      <button onClick={addUpvotes}>Add upvote</button>
      {article.content.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm
        articleId={articleId}
        onArticleUpdated={updatedArticle  => {setArticleInfo(updatedArticle);}}
      />
    </>
  );
};

export default ArticlePage;
