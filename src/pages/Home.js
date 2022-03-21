import React from 'react';
import './Home.css';
import Upload from '../components/Upload';

const Home = (props) => {

  return (
    <div className="home-container">
      <div className="upload-container">
        <Upload />
      </div>
    </div>
  );
}

export default Home;
