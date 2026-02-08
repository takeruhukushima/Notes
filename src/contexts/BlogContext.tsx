import React, { createContext, ReactNode, useContext } from 'react';
import { blogPostsData } from './postsData';

// BlogPost 型と Footnote 型のインターフェース
export interface Footnote {
  id: string;
  content: string;
  link?: string; // リンクはオプション
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  datePublished: string;
  tags?: string[];
  url?: string;
  footnotes?: Footnote[];
}

// BlogContext の型定義
interface BlogContextType {
  blogPosts: BlogPost[];
}

// BlogContext の作成
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// BlogProvider コンポーネント
const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const blogPosts: BlogPost[] = blogPostsData;

  return (
    <BlogContext.Provider value={{ blogPosts }}>
      {children}
    </BlogContext.Provider>
  );
};

// BlogContext のカスタムフック
const useBlogContext = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};

export { BlogProvider, useBlogContext };