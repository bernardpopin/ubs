import React from 'react';
import styled from 'styled-components';

const Success = () => {
  return (
    <Container>
      <H1>Success!</H1>
      Event has been created.
   </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #c7eab1;
  padding: 30px;
  margin-top: 60px;
  text-align: left;
  font-size: 14px;
  color: #777777;
  box-sizing: border-box;
`

const H1 = styled.h1`
  font-size: 18px;
  color: #6e8955;
  margin: 0 0 15px 0;
`

export default Success;
