// src/components/ProjectList/ProjectList.tsx
import React from 'react';
import styles from './ProjectList.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className={styles.list}>
      <h1 className={styles.title}>Projects</h1>
      <ul className={styles.projectList}>
        {projects.map(project => (
          <li key={project.id} className={styles.projectItem}>
            <a href={project.link} className={styles.projectLink}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDescription}>{project.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
