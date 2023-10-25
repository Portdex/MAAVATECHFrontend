import React , {useEffect , useState} from 'react';
import { Col, Row } from 'react-bootstrap';

const SchoolTimeline = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getPosts")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        data = data.data;
        data.sort((a, b) => b.id - a.id);
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []); 
      
  return (
    <div className="headline-segment">
        <div className="container mb-5">
            <div className='section-title'>
                <h3>
                   School Posts
                </h3>
            </div>
            {posts.map((post, index) => (
        <Row className='headline-row' key={index}>
          <Col className="col-2 headline-image">
          <img src={post.image? post.image : '/img/favi.jpg'} alt="" />
          </Col>
          <Col className='col-10 headline-text'>
            <h4>{post.name ? post.name : '-'}</h4>
            <p>
            {post.description ? post.description : 'No description Available'}
            </p>
            <h6 className='mb-0'>Looking For:</h6>
            <p className='mb-0'>
              {post.looking_for ? post.looking_for : '-'}
            </p>
            <p className='mb-0'>
              {post.grade ? post.grade : '-'}
            </p>
            <span className='category-tag'>
            {post.email ? post.email : '-'}
              <i className="fas fa-circle"></i>
            </span>
            <span className="date">
            {post.country ? post.country : '-'}
            </span>
          </Col>
        </Row>
      ))}
            
        </div>
    </div>
  );
};

export default SchoolTimeline;
