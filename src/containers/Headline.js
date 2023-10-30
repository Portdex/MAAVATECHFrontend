import React , {useEffect , useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Headline = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
        data.sort((a, b) => b.id - a.id);
        setPosts(data)
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  const handleReadMoreClick = (username) => {
    navigate(`/details/${username}`);
  }; 
      
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
            <h4>{post.orphan_name ? post.orphan_name : '-'}</h4>
            <p>
            {post.description ? post.description : 'consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'}
            </p>
            <p>
            <a  onClick={() => handleReadMoreClick(post.orphan_name)} className='color-blue cursor-pointer'>
              Read More
            </a>
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
