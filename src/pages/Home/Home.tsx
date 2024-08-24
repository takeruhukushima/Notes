import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header'; // Header のインポート
import Footer from '../../components/Footer/Footer'; // Footer のインポート
import { useProjectContext } from '../../contexts/ProjectContext';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const { projects } = useProjectContext();

  // プロジェクトをソートする
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.id === "1") return -1; // id=1のプロジェクトを最上部に
    if (b.id === "1") return 1;  // id=1のプロジェクトが最上部でない場合
    return a.progression.localeCompare(b.progression); // 進捗でソート
  });

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.pageTitle}>Projects</h1>
      <section className={styles.projectSection}>
        {sortedProjects.map(project => (
          <Link key={project.id} to={`/projects/${project.id}`} className={styles.projectCardLink}>
            <div className={styles.projectCard}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDescription}>{project.description}</p>
              <p className={`${styles.projectProgression} ${getProgressionClass(project.progression)}`}>
                {project.progression}
              </p>
            </div>
          </Link>
        ))}
      </section>
      <Footer />
    </div>
  );
};

// progression のクラスを決定するヘルパー関数
const getProgressionClass = (progression: '進行中' | 'deploy済' | '構想中') => {
  switch (progression) {
    case '進行中':
      return styles['progression-in-progress'];
    case 'deploy済':
      return styles['progression-deployed'];
    case '構想中':
      return styles['progression-ideas'];
    default:
      return '';
  }
};

export default Home;