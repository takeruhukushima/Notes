import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProjectDetailPage from './pages/PostDetail/PostDetailPage';
import { BlogProvider } from './contexts/BlogContext'; // BlogProvider をインポート
import './styles/global.css'; // グローバルスタイルのインポート

const App: React.FC = () => {
  return (
    <BlogProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<ProjectDetailPage />} />
        </Routes>
      </Router>
    </BlogProvider>
  );
};

export default App;
