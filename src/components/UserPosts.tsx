// #region imports 
import React, { useCallback, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { PostForm } from './PostForm';
import { PostList } from './PostList';
import { getUserPosts } from '../services/posts';
// #endregion

type Props = {
  userId: number;
};

export const UserPosts: React.FC<Props> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(userId)
      .then(setPosts);
  }, [userId]);

  // #region add, delete, update
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const addPost = useCallback((post: Post) => {
    setPosts(currentPosts => {
      const maxId = Math.max(...currentPosts.map(post => post.id));
      const id = maxId + 1;

      return [...currentPosts, { ...post, id }];
    });
  }, []);

  const deletePost = useCallback((postId: number) => {
    setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  }, []);

  const updatePost = useCallback((updatedPost: Post) => {
    setPosts(currentPosts => {
      const newPosts = [...currentPosts];
      const index = newPosts.findIndex(post => post.id === updatedPost.id);

      newPosts.splice(index, 1, updatedPost);

      return newPosts;
    });
  }, []);
  // #endregion

  return (
    <div className="box">
      <h2 className="title is-4">User {userId} Posts</h2>

      <PostList posts={posts} />

      {selectedPost && (
        <PostForm
          key={selectedPost?.id}
          post={selectedPost}
          onSubmit={updatePost}
          onReset={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};
