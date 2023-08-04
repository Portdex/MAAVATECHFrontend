import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const textArray = [
  "will enable consumers to connect with service providers directly in real-time and enable businesses' real-time payments settlement through open banking API.",
  "will allow small companies to offer recurring payments such as monthly subscriptions, rent installments, monthly packages, and shopping.",
  "will enable businesses and customers to Port, anonymize & monetize commercial data, & financial data,",
  "will act as a comparison marketplace of local digital and physical products and sellers by porting data.",
  "will enable multicurrency transactions and will encrypt buyer and seller transactions.",
  "will protect consumers by scanning online product sellers."
];

const Container = styled.div`
  font-size: 18px;
  text-align: center;
  margin: 20px auto;
  width: 80%; /* Adjust container width as needed */
  white-space: nowrap;
  overflow: hidden;
`;

const Text = styled.div`
  display: inline-block;
  animation: slide 6s linear infinite;
`;

const Main = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 6000); // Change to desired duration for each text to display

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <div>portdex</div>
      {textArray.map((text, idx) => (
        <Text
          key={idx}
          style={{
            animationDelay: `${idx * 6}s`,
            transform: `translateX(${index === idx ? "0%" : "100%"})`,
          }}
        >
          {text}
        </Text>
      ))}
    </Container>
  );
};

export default Main;
