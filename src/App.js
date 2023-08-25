import "./App.css";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import ArticlesListPage from "./pages/ArticlesListPage";

function App() {
  return (
    <div className="App">
      <h1>My Blog</h1>
      <div id="page-body">
        <HomePage />
        <AboutPage />
        <ArticlesListPage />
        <ArticlePage />
      </div>
    </div>
  );
}

export default App;
