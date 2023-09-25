import React , {useEffect , useState} from 'react';
import { Col, Row } from 'react-bootstrap';

const Headline = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getFundRaiseForms")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        data = data.data;
        // Filter data where the email matches currentEmail
        setPosts(data)
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []); 
      
  return (
    <div className="headline-segment">
        <div className="container">
            <div className='section-title'>
                <h3>
                    Posts
                </h3>
            </div>
            {posts.map((post, index) => (
        <Row className='headline-row' key={index}>
          <Col className="col-2 headline-image">
          <img src={post.image? post.image : '/img/favi.jpg'} alt="" />
          </Col>
          <Col className='col-10 headline-text'>
            <h4>{post.orphanName ? post.orphanName : '-'}</h4>
            <p>
            {post.description ? post.description : '-'}
            </p>
            <p>
              {post.amount_to_raise ? post.amount_to_raise : '-'}
            </p>
            <span className='category-tag'>
            {post.name ? post.name : '-'}
              <i className="fas fa-circle"></i>
            </span>
            <span className="date">
            {post.city ? post.city : '-'}
            </span>
          </Col>
        </Row>
      ))}
            
        </div>
    </div>
  );
};

export default Headline;
