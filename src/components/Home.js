import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My New Website', body: 'lorem ipsum...', author: 'john', id: 1 },
    { title: 'Welcome Party', body: 'lorem ipsum...', author: 'Miller', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'Trump', id: 3 },
  ]);

  const [name, setName] = useState('John');

  const handleDelete = (id) => {
    const newBlog = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlog);
  };

  useEffect(() => {
    console.log('user effect run');
    console.log(name);
  }, [name]);

  return (
    <div className="home">
      <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete} />
      <button onClick={() => setName('luigi')}>Change name</button>
      <p>{name}</p>
    </div>
  );
};

export default Home;
