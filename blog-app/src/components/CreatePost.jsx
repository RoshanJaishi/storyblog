import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';  // Assuming Material-UI

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/posts', { title, content });
      // Redirect to the newly created post details page
      window.location.href = `/posts/${response.data.id}`;
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Create New Post</Typography>
      {error && <div>Error creating post: {error.message}</div>}
      <form onSubmit={handleSubmit}>
        <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextField label="Content" variant="outlined" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
        <Button type="submit" variant="contained">Create Post</Button>
      </form>
    </div>
  );
};

export default CreatePost;
