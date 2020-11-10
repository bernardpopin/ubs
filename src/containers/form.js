import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import { store } from '../actions/index';

import About from './form/about';
import Coordinator from './form/coordinator';
import When from './form/when';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit (event) {
    event.preventDefault();
    store.dispatch(push('/success'));
    console.log('Form output', this.props.form);
  }

  render() {
    return (
      <Container onSubmit={this.handleSubmit.bind(this)}>
        <About />
        <Coordinator />
        <When />
        <Button type="submit">Publish event</Button>
     </Container>
    )
  }
}

const Container = styled.form`
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
  margin: 60px 0;
`

const mapStateToProps = (state) => {
  return {
    form: state.FormReducer.form
  }
}

Form = connect(mapStateToProps, undefined)(Form);

export default Form;
