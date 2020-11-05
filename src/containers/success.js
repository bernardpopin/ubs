import React from 'react';
import styled from 'styled-components';

const Success = () => {
  return (
    <Container>
      Success!
   </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  padding: 30px;
  margin-top: 60px;
  font-size: 18px;
  color: #5a7ca2;
  text-align: center;
`

export default Success;
