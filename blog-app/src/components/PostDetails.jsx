import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';  // Assuming Material-UI

const PostDetails = ({ match }) => {
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

    if (error) {
        return <div>Error fetching post details</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body1">{post.content}</Typography>
                <Typography variant="caption">Created on: {post.date_created}</Typography>
            </CardContent>
        </Card>
    );
};

export default PostDetails;
