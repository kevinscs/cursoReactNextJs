import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Posts } from '../../Components/Posts';
import { loadPosts } from '../../Utils/load-post';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';

export const Home = () => {

  const [ posts, setPosts ] = useState([]);
  const [ allPosts, setAllPosts ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ postPerPage ] = useState(10);
  const [ searchValue, setSearchValue ] = useState('');

  const noMorePosts = page + postPerPage >= allPosts.length;

  const filteredPosts = searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
  : posts;

  const handleLoadPosts = useCallback(async (page, postPerPage) => {
    const postsAndPhotos = await loadPosts();
    
    setPosts(postsAndPhotos.slice(page, postPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postPerPage);
  }, [handleLoadPosts, postPerPage]);
  
  const loadMorePosts = () => {
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }
  
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  }

  return (
    <section className='container'>
      <div className='search-container'>
        {!!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange}/>
      </div>

      <br /> <br /> <br />

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )}

      <div className='button-container'>
        {!searchValue && (
          <Button text='Load More Posts'
          onClick={loadMorePosts}
          disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
