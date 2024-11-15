  import React from 'react';
  import { useParams } from 'react-router-dom'; // useParams をインポート
  import ReactMarkdown from 'react-markdown';
  import Header from '../../components/Header/Header';
  import Footer from '../../components/Footer/Footer';
  import styles from './PostDetailPage.module.css';
  import { useBlogContext } from '../../contexts/BlogContext'; // BlogContext をインポート

  const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // URLパラメータからIDを取得
    const { blogPosts } = useBlogContext(); // BlogContextからブログポストを取得
    
    // IDに基づいて特定のブログポストを検索
    const blogPost = blogPosts.find(post => post.id === id);

    if (!blogPost) {
      // ブログポストが見つからない場合の表示
      return <div className={styles.error}>Blog post not found</div>;
    }

    // Progress updates (footnotes)を取得
    const footnotes = blogPost.footnotes || [];

    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.topProject}>
            <h1 className={styles.projectTitle}>{blogPost.title}</h1>
            <p className={styles.projectDescription}>{blogPost.description}</p>
            <ReactMarkdown className={styles.projectContent}>{blogPost.content}</ReactMarkdown>
            
          </div>
          <section className={styles.progressSection}>
            <h2 className={styles.progressTitle}>Footnotes</h2>
            <div className={styles.progressList}>
              {footnotes.map(footnote => (
                <div key={footnote.id} className={styles.progressItem}>
                  <p className={styles.updateContent}>
                    <span className={styles.footnoteNumber}>{footnote.id}. </span>
                    <span className={styles.footnoteTitle}>{footnote.content} </span>
                    <a
                      href={footnote.link}
                      className={styles.footnoteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {footnote.link}
                    </a>
                  </p>
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
