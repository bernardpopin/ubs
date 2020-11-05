import React from 'react';
import styled from 'styled-components';

const App = ({ children }) => {
  return (
    <Container>
      <Header>
        <HeaderTitle>New Event</HeaderTitle>
      </Header>
      {children}
   </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5a7ca2;
  border-top: 5px solid #2c437d;
`

const HeaderTitle = styled.h1`
  width: 100%;
  max-width: 1000px;
  padding: 30px;
  box-sizing: border-box;
  font-size: 24px;
  color: #ffffff;
`

export default App;
