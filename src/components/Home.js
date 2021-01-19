import { useState } from 'react';
import BlogList from './BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My New Website', body: 'lorem ipsum...', author: 'john', id: 1 },
    { title: 'Welcome Party', body: 'lorem ipsum...', author: 'Miller', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'Trump', id: 3 },
  ]);

  return (
    <div className="home">
      <BlogList blogs={blogs} title="All Blogs!" />
    </div>
  );
};

export default Home;
