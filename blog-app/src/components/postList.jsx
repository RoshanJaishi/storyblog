import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import for Material-UI theme

const theme = createTheme(); // Create a default theme instance

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:3000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}> {/* Wrap the component with the theme provider */}
      <Grid container spacing={2}>
        {isLoading ? (
          <Typography variant="body1">Loading posts...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          posts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{post.title}</Typography>
                  <Typography variant="body2">{post.content.substring(0, 100)}...</Typography>
                  <a href={`/posts/${post.id}`}>Read More</a>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default PostList;
