import React from 'react';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import { store } from '../actions/index';

import Coordinator from './form/coordinator';

const Form = () => {
  return (
    <Container>
      <Coordinator />
      <Button onClick={() => store.dispatch(push('/success'))}>Publish event</Button>
   </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  width: 160px;
  height: 60px;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #ffffff;
  background-color: #ffb348;
  border: 1px solid #ff9601;
  border-radius: 5px;
  margin-top: 60px;
`

export default Form;
