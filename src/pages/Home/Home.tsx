import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header'; // Header のインポート
import Footer from '../../components/Footer/Footer'; // Footer のインポート
import { useBlogContext } from '../../contexts/BlogContext'; // 修正済みのパス
import styles from './Home.module.css';

const Home: React.FC = () => {
  const { blogPosts } = useBlogContext();
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  // ブログポストをフィルタリングしてソートする
  const filteredAndSortedBlogPosts = blogPosts
    .filter(post =>
      post.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(filterText.toLowerCase())))
    )
    .sort((a, b) => {
      if (a.datePublished > b.datePublished) return -1; // 新しい投稿を上に
      if (a.datePublished < b.datePublished) return 1;
      return 0;
    });

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.pageTitle}>Posts</h1>
      <input
        type="text"
        placeholder="Filter posts by title or tag"
        value={filterText}
        onChange={handleFilterChange}
        className={styles.filterInput}
      />
      <section className={styles.blogSection}>
        {filteredAndSortedBlogPosts.map(post => (
          <Link key={post.id} to={`/posts/${post.id}`} className={styles.blogCardLink}>
            <div className={styles.blogCard}>
              <h2 className={styles.blogTitle}>{post.title}</h2>
              <p className={styles.blogDescription}>{post.description}</p>
              <p className={styles.blogDate}>{new Date(post.datePublished).toLocaleDateString()}</p>
              {post.tags && (
                <div className={styles.blogTags}>
                  {post.tags.map((tag, index) => (
                    <span key={index} className={styles.blogTag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Home;
