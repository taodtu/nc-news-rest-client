import React from 'react';
import { Link } from '@reach/router';

const Navigation = () => {
 const topics = ['coding', 'fottball', 'cooking']
 return (
  <nav>
   {topics.map(topic => <Link to="/topics/coding">Coding</Link>
   )}
  </nav>
 );
};

export default Navigation;