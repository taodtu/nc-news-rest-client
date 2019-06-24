import React from 'react';
import { Link } from '@reach/router';

const Navigation = () => {
 const topics = ['coding', 'fottball', 'cooking']
 return (
  <nav >
   <Link to={`/`} className="title-link">Home</Link>
   {topics.map(topic => <Link to={`/topics/${topic}`} key={topic} className="title-link">{topic}</Link>
   )}
  </nav>
 );
};

export default Navigation;