import { Component } from 'react';

import './styles.css';

import { Posts } from '../../Components/Posts';
import { loadPosts } from '../../Utils/load-post';
import { Button } from '../../Components/Button';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 2,
    searchValue: '',
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos
    })
  };

  loadMorePosts = () => {
    const {
      page, postPerPage, allPosts, posts
    } = this.state;
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage })
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({searchValue: value});
  }

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;
    const filteredPosts = 

    return (
      <section className='container'>
        {!!searchValue && (
          <>
            <h1>Search Value: {searchValue}</h1> <br />
          </>
        )}

        

        <input 
        onChange={this.handleChange} onChenage={(event) => event.terget.value}
        value={searchValue}
        type='search' 
        />
        <br /> <br /> <br />

        <Posts posts={posts} />

        <div className='button-container'>
          {!searchValue && (
            <Button text='Load More Posts'
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
export default Home;
