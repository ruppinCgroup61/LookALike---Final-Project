import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const ProgressComponent = () => {
  const [visible, setVisible] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [weatherDataUpdated, setWeatherDataUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerFinished(true);
    }, 10000); // 10000ms = 10 seconds

    const updateWeatherData = async () => {
      try {
        const response = await fetch('https://localhost:7215/Weather/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to update weather data for Tel Aviv');
        }

        const data = await response.json();
        console.log(data); // Handle the response if needed
      } catch (error) {
        console.error(error);
      } finally {
        setWeatherDataUpdated(true);
      }
    };

    updateWeatherData();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timerFinished && weatherDataUpdated) {
      setVisible(false);
      setRedirect(true);
    }
  }, [timerFinished, weatherDataUpdated]);

  useEffect(() => {
    if (redirect) {
      navigate('/Algorithm');
    }
  }, [redirect, navigate]);

  if (!visible) {
    return null;
  }

  return (
    <Container>
      {/* <img style={{ width: 180, marginBottom: 50, position: 'absolute', top: '30px' }} src="src/Images/lookalike.png" alt="lookalike" /> */}
      <Title>Your outfit is getting ready</Title>
      <Title>please wait...</Title>
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
  height: 100vh;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 35px;
  color: #EEEEE;
  font-family: "Urbanist", sans-serif;
  font-weight: 400;
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
