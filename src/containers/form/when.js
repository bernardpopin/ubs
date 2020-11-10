import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { saveToForm } from '../../actions/index';

class When extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      only_date: '',
      time: '',
      time_ampm: ''
    }
  }

  formatDate () {
    const { only_date, time, time_ampm } = this.state;
    if (only_date.length && time.length && time_ampm.length > 0) {
      let [hours, minutes] = time.split(':');
      if (hours === '12') {
        hours = '00';
      }
      if (time_ampm === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
      const date = `${only_date}T${hours}:${minutes}`;
      this.props.saveToForm({date: date})
    }
  }

  handleChange(e) {
    const keyName = e.target.name;
    let value = e.target.value;
    if (e.target.type === 'number') {
      value = Number(value);
    }
    if (keyName === 'only_date') {
      this.setState({only_date: value}, this.formatDate);
      return;
    }
    if (keyName === 'time') {
      this.setState({time: value}, this.formatDate);
      return;
    }
    if (keyName === 'time_ampm') {
      this.setState({time_ampm: value}, this.formatDate);
      return;
    }
    this.props.saveToForm({[keyName]: value});
  }

  render() {
    const { coordinator } = this.props;
    return (
      <Container>
        <SectionTitle>When</SectionTitle>
        <Wrapper>
          <Label>Starts on *</Label>
          <Input placeholder='dd/mm/yyyy' type='date' name='only_date' required onChange={this.handleChange.bind(this)} />
          <Span>at</Span>
          <Input placeholder='--:---' type='time' name='time' min='01:00' max='12:59' required onChange={this.handleChange.bind(this)} />
          <RadioWrapper>
            <div onChange={this.handleChange.bind(this)}>
              <input type='radio' id='am' name='time_ampm' value='AM' required />
              <label htmlFor='am'>AM</label>
              <Span>
              <input type='radio' id='pm' name='time_ampm' value='PM' required />
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
