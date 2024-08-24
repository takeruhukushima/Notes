import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './ProjectDetailPage.module.css';
import { useProjectContext } from '../../contexts/ProjectContext';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjectContext();
  
  // Ensure that id is a string and compare it with project.id
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  // Determine the class for progression
  let progressionClass = '';
  switch (project.progression) {
    case '進行中':
      progressionClass = styles.progressionInProgress;
      break;
    case 'deploy済':
      progressionClass = styles.progressionDeployed;
      break;
    case '構想中':
      progressionClass = styles.progressionIdeas;
      break;
    default:
      progressionClass = '';
  }

  // Progress updates in the original order
  const progressUpdates = project.progress || [];

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.topProject}>
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <p className={styles.projectDescription}>{project.description}</p>
          <p className={`${styles.projectProgression} ${progressionClass}`}>{project.progression}</p>
          {project.appUrl && (
            <p>
              <a href={project.appUrl} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                View Application
              </a>
            </p>
          )}
          {project.githubUrl && (
            <p>
              <a href={project.githubUrl} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                View GitHub Repository
              </a>
            </p>
          )}
          <p className={styles.projectContent}>{project.content}</p>
        </div>
        <section className={styles.progressSection}>
          <h2 className={styles.progressTitle}>Progress Updates</h2>
          <div className={styles.progressList}>
            {progressUpdates.map((update, index) => (
              <div key={index} className={styles.progressItem}>
                <h3 className={styles.updateTitle}>{update.title}</h3>
                <p className={styles.updateDate}>{update.date}</p>
                <p className={styles.updateContent}>{update.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
