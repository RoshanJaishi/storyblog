import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';  // Assuming Material-UI

const EditPost = ({ match }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${match.params.id}`);
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [match]);

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/posts/${post.id}`, post);
      // Redirect to the updated post details page
      window.location.href = `/posts/${response.data.id}`;
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div>Error fetching post details</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4">Edit Post</Typography>
      {error && <div>Error updating post: {error.message}</div>}
      <form onSubmit={handleSubmit}>
        <TextField label="Title" variant="outlined" value={post.title} name="title" onChange={handleChange} required />
        <TextField label="Content" variant="outlined" multiline rows={4} value={post.content} name="content" onChange={handleChange} required />
        <Button type="submit" variant="contained">Update Post</Button>
      </form>
    </div>
  );
};

export default EditPost;
