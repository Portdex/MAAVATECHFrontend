import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Headline = () => {
    const headlines = [
        {
            title: "Lida D.",
            post: "consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
            date: "December 02",
            image: "https://bootdey.com/img/Content/avatar/avatar1.png",
          },
        {
          title: "Lucy Moon",
          post: "Duis autem vel eum iriure dolor in hendrerit in vulputate ?",
          date: "December 02",
          image: "https://bootdey.com/img/Content/avatar/avatar3.png",
        },
        
        {
            title: "ABC",
            post: "Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
            date: "December 02",
            image: "./img/locals/blood.jpg",
          },
          {
            title: "DEF",
            post: "Duis autem vel eum iriure dolor in hendrerit in vulputate ?",
            date: "December 02",
            image: "./img/book.jpg",
          },
          {
            title: "user",
            post: "Duis autem vel eum iriure dolor in hendrerit in vulputate ?",
            date: "December 02",
            image: "./img/school.jpg",
          },
          {
            title: "John",
            post: "consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
            date: "2023-09-02",
            image: "./img/college.jpg",
          },
        // Add more headlines as needed
      ];
      
  return (
    <div className="headline-segment">
        <div className="container">
            <div className='section-title'>
                <h3>
                    Headline
                </h3>
            </div>
            {headlines.map((headline, index) => (
        <Row className='headline-row' key={index}>
          <Col className="col-2 headline-image">
            <img src={headline.image} alt="" />
          </Col>
          <Col className='col-10 headline-text'>
            <h4>{headline.title}</h4>
            <p>
              {headline.post}
            </p>
            <span className='category-tag'>
              {headline.title}
              <i className="fas fa-circle"></i>
            </span>
            <span className="date">
              {headline.date}
            </span>
          </Col>
        </Row>
      ))}
            
        </div>
    </div>
  );
};

export default Headline;
