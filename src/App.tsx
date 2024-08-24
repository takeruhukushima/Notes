import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProjectDetailPage from './pages/ProjectDetailPage/ProjectDetailPage';
import { ProjectProvider } from './contexts/ProjectContext';
import './styles/global.css'; // グローバルスタイルのインポート


const App: React.FC = () => {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
};

export default App;
