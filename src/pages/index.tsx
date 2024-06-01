import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography, Card, CardContent } from '@mui/material';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  post: Post[];
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data: {error.message}</div>;
  if (!data) return <div>Loading....</div>;

  return (
    <Main>
      <Container className='profile-section'>
        <Card style={{ padding: '2rem', marginTop: '2rem', width: '80%', maxWidth: '800px', margin: 'auto' }}>
          <UserInfo user={data} />
          <PostList posts={data.post} />
        </Card>
      </Container>
    </Main>
  );
};

const UserInfo: React.FC<{ user: User }> = ({ user }) => (
  <div className="mb-40">
    <Typography variant="h3" gutterBottom>{user.name}</Typography>
    <Typography variant="h6" gutterBottom style={{ color: 'black' }}>{user.email}</Typography>
    <Typography variant="body2" gutterBottom style={{ color: 'black' }}>{user.bio}</Typography>
  </div>
);

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <>
    <Typography variant="h3" gutterBottom style={{ marginTop: '2rem'}}>Posts</Typography>
    {posts.map((post, index) => (
      <Post key={index} post={post} />
    ))}
  </>
);

const Post: React.FC<{ post: Post }> = ({ post }) => (
  <div style={{ marginBottom: '3rem' }}>
    <Typography variant="h6" gutterBottom style={{ color: 'black' }}>{post.title}</Typography>
    <Typography variant="body2" gutterBottom style={{ color: 'black' }}>{post.content}</Typography>
  </div>
);

export default Home;
