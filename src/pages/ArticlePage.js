import { useParams } from "react-router";
import articles from "./article-content";

const ArticlePage = () => {
  // articleId - the value of articleId will be what we type in browser line
  const { articleId } = useParams();

  // if value of articleId equel article.name
  // articles - is array of article conetent
  const article = articles.find(article => article.name === articleId);
  console.log(article);

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
};

export default ArticlePage;
