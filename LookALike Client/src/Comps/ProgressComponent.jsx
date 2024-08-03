// ProgressComponent.jsx
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const ProgressComponent = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 15000); //15000ms = 15 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Container>
      <Title>Your outfit is getting ready
      please wait...</Title>
      <ProgressBar className="progress-7" />
    </Container>
  );
};

export default ProgressComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 25px;
  color: #333;
`;

const progressAnimation = keyframes`
  100% {background-size:100%}
`;

const ProgressBar = styled.div`
  width: 120px;
  height: 24px;
  -webkit-mask: radial-gradient(circle closest-side, #000 94%, #0000) 0 0/25% 100%,
    linear-gradient(#000 0 0) center/calc(100% - 12px) calc(100% - 12px) no-repeat;
  background: linear-gradient(#876253 0 0) 0/0% no-repeat #ddd;
  animation: ${progressAnimation} 2s infinite linear;
`;
