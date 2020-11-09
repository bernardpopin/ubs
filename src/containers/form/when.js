import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { saveToForm } from '../../actions/index';

class When extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    const keyName = e.target.name;
    let value = e.target.value;
    if (e.target.type === 'number') {
      value = Number(value);
    }
    this.props.saveToForm({[keyName]: value})
  }

  render() {
    const { coordinator } = this.props;
    return (
      <Container>
        <SectionTitle>When</SectionTitle>
        <Wrapper>
          <Label>Starts on *</Label>
          <Input placeholder='dd/mm/yyyy' type='date' required onChange={this.handleChange.bind(this)} />
          <Span>at</Span>
          <Input placeholder='--:---' type='time' required onChange={this.handleChange.bind(this)} />
          <RadioWrapper>
            <div onChange={this.handleChange.bind(this)}>
              <input type='radio' id='am' name='time_ampm' value='am' required />
              <label htmlFor='am'>AM</label>
              <Span>
              <input type='radio' id='pm' name='time_ampm' value='pm' required />
              <label htmlFor='pm'>PM</label>
              </Span>
            </div>
          </RadioWrapper>
        </Wrapper>
        <Wrapper>
          <Label>Duration</Label>
          <Input placeholder='Number' type='number' name='duration' onChange={this.handleChange.bind(this)}/>
          <Span>hour</Span>
        </Wrapper>
      </Container>
    )
  }
}

const Container = styled.div`
  background-color: #ffffff;
  padding: 30px;
  margin-top: 60px;
`

const SectionTitle = styled.h2`
  font-weight: 400;
  font-size: 18px;
  color: #5a7ca2;
  border-bottom: 2px solid #dddddd;
  padding-bottom: 10px;
  margin-bottom: 30px;
`

const Wrapper = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  max-width: 700px;
`

const Label = styled.div`
  width: 100%;
  max-width: 140px;
  font-size: 14px;
  text-transform: uppercase;
  color: #a8c5d6;
`

const Select = styled.select`
  height: 40px;
  border: 1px solid #dddddd;
  color: #777777;
  margin-left: 15px;
  padding-left: 10px;
  display: flex;
  flex: 1;
`

const Input = styled.input`
  height: 38px;
  padding: 0;
  margin-left: 15px;
  padding-left: 10px;
  display: flex;
  flex: 1;
`

const RadioWrapper = styled.div`
  margin-left: 15px;
`

const Span = styled.span`
  margin-left: 15px;
`

const mapDispatchToProps = (dispatch) => {
  return {
    saveToForm: (value) => {
      dispatch(saveToForm(value))
    }
  }
}

When = connect(undefined, mapDispatchToProps)(When);

export default When;
