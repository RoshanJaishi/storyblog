import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/postList';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

const App = () => {
  return (
    <Router>
      <div>
        {/* Header component can be added here */}
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
        </Routes>
        {/* Footer component can be added here */}
      </div>
    </Router>
  );
};

export default App;
