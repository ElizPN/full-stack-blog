import articles from "./article-content";
import { Link } from "react-router-dom";

const ArticlesListPage = () => {
  return (
    <>
      <h1>Articles List</h1>
      {articles.map(article => (
        <Link
          className="article-list-item"
          to={`./${article.name}`}
          key={article.name}
        >
          <div>
            <h3>{article.title}</h3>
            <p>{article.content[0].substring(0, 150)}...</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ArticlesListPage;
