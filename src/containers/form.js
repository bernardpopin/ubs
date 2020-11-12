import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import { store, loadCategory, loadResponsible, saveToForm } from '../actions/index';

const textareaMaxLength = 140;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFee: false,
      textareaCharLeft: textareaMaxLength,
      only_date: '',
      time: '',
      time_ampm: ''
    };
  }

  componentDidMount() {
    this.props.loadCategory();
    this.props.loadResponsible();
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

  handleSubmit (e) {
    e.preventDefault();
    store.dispatch(push('/success'));
    console.log('Form output', this.props.form);
  }

  handleChange(e) {
    const keyName = e.target.name;
    let value = e.target.value;
    if (keyName === 'category_id') {
      this.props.saveToForm({[keyName]: Number(value)})
      return;
    }
    if (keyName === 'paid_event') {
      const payment = value === 'paid';
      this.setState({ showFee: payment });
      this.props.saveToForm({[keyName]: payment})
      return;
    }
    if (e.target.type === 'number') {
      value = Number(value);
    }
    if (keyName === 'id' || keyName === 'email') {
      const coordinator = this.props.form.coordinator || {};
      const newCoordinator = Object.assign(coordinator, {[keyName]: value});
      this.props.saveToForm({coordinator: newCoordinator});
      return;
    }
    if (e.target.type === 'number' && keyName === 'duration') {
      const hourInMiliseconds = 3600000;
      value = Number(value) * hourInMiliseconds;
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
    this.props.saveToForm({[keyName]: value})
  }

  countChar (e) {
    const length = e.target.value.length;
    const char = textareaMaxLength - length;
    this.setState({textareaCharLeft: char});
  }

  render() {
    const { category, responsible, coordinator } = this.props;
    return (
      <Container onSubmit={this.handleSubmit.bind(this)}>
        <SectionContainer>
          <SectionTitle>About</SectionTitle>
          <Wrapper>
            <Label>Title *</Label>
            <Input placeholder='Make it short and clear' name='title' required onChange={this.handleChange.bind(this)} />
          </Wrapper>
          <Wrapper>
            <Label>Description *</Label>
            <Textarea placeholder='Write about your event, be creative' name='description' maxLength={textareaMaxLength} required onKeyUp={this.countChar.bind(this)} onChange={this.handleChange.bind(this)} />
          </Wrapper>
          <Wrapper>
            <Label></Label>
            <CharLeft>{this.state.textareaCharLeft} characters left</CharLeft>
          </Wrapper>
          <Wrapper>
            <Label>Category</Label>
            <Select defaultValue="" name='category_id' onChange={this.handleChange.bind(this)}>
              <option value="" disabled hidden>Please Choose...</option>
              {category && category.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </Select>
          </Wrapper>
          <Wrapper>
            <Label>Payment</Label>
            <RadioWrapper onChange={this.handleChange.bind(this)}>
              <input type='radio' id='free' name='paid_event' value='free' />
              <label htmlFor='free'>Free event</label>
              <Span>
              <input type='radio' id='paid' name='paid_event' value='paid' />
              <label htmlFor='paid'>Paid event</label>
              </Span>
            </RadioWrapper>
            {this.state.showFee && <Inline>
              <Input placeholder='Fee' type='number' name='event_fee' required onChange={this.handleChange.bind(this)} /> <Span>$</Span>
            </Inline>}
          </Wrapper>
          <Wrapper>
            <Label>Reward</Label>
            <Input placeholder='Number' type='number' name='reward' onChange={this.handleChange.bind(this)} />
            <Span>reward points for attendance</Span>
          </Wrapper>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Coordinator</SectionTitle>
          <Wrapper>
            <Label>Responsible *</Label>
            <Select defaultValue="" name='id' required onChange={this.handleChange.bind(this)}>
              <option value="" disabled hidden>Please Choose...</option>
              {responsible && responsible.map((option) => (
                <option key={option.id} value={option.id}>{option.name} {option.lastname}</option>
              ))}
            </Select>
          </Wrapper>
          <Wrapper>
            <Label>E-mail</Label>
            <Input placeholder='E-mail' type="email" name='email' onChange={this.handleChange.bind(this)} />
          </Wrapper>
        </SectionContainer>
        <SectionContainer>
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
        </SectionContainer>
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

const SectionContainer = styled.div`
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
  flex-direction: column;
  max-width: 700px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const Label = styled.div`
  width: 100%;
  font-size: 14px;
  text-transform: uppercase;
  color: #a8c5d6;
  margin-bottom: 5px;

  @media (min-width: 600px) {
    max-width: 140px;
    margin-bottom: 0px;
  }
`

const Select = styled.select`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    display: flex;
    flex: 1;
    margin-left: 15px;
  }
`

const Input = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 0 0 10px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    display: flex;
    flex: 1;
    margin-left: 15px;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 10px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    min-height: 60px;
    display: flex;
    flex: 1;
    margin-left: 15px;
  }
`

const RadioWrapper = styled.div`
  margin: 5px 0 5px 0;

  @media (min-width: 600px) {
    margin: 0 0 0 15px;
  }
`

const Span = styled.span`
  margin: 5px 0 5px 0;

  @media (min-width: 600px) {
    margin: 0 0 0 15px;
  }
`

const Inline = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`

const CharLeft = styled.div`
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 600px) {
    flex: 1;
    margin-left: 15px;
  }
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
    category: state.AboutReducer.category,
    responsible: state.CoordinatorReducer.responsible,
    form: state.FormReducer.form
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategory: () => {
      dispatch(loadCategory())
    },
    loadResponsible: () => {
      dispatch(loadResponsible())
    },
    saveToForm: (value) => {
      dispatch(saveToForm(value))
    }
  }
}

Form = connect(mapStateToProps, mapDispatchToProps)(Form);

export default Form;
