import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadCategory, saveToForm } from '../../actions/index';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category_id: '',
      showFee: false,
    };
  }

  componentDidMount() {
    this.props.loadCategory();
  }

  handleChange(e) {
    const keyName = e.target.name;
    let value = e.target.value;
    if (keyName === 'category_id') {
      this.setState({ category_id: value });
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
    this.props.saveToForm({[keyName]: value})
  }

  render() {
    const { category } = this.props;
    return (
      <Container>
        <SectionTitle>About</SectionTitle>
        <Wrapper>
          <Label>Title *</Label>
          <Input placeholder='Make it short and clear' name='title' required onChange={this.handleChange.bind(this)} />
        </Wrapper>
        <Wrapper>
          <Label>Description *</Label>
          <Textarea placeholder='Write about your event, be creative' name='description' onChange={this.handleChange.bind(this)} />
        </Wrapper>
        <Wrapper>
          <Label>Category</Label>
          <Select value={this.state.category} name='category_id' onChange={this.handleChange.bind(this)}>
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
          {this.state.showFee && <div><Input placeholder='Fee' type='number' name='event_fee' onChange={this.handleChange.bind(this)} /> <Span>$</Span></div>}
        </Wrapper>
        <Wrapper>
          <Label>Reward</Label>
          <Input placeholder='Number' type='number' name='reward' onChange={this.handleChange.bind(this)} />
          <Span>reward points for attendance</Span>
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

const Textarea = styled.textarea`
  min-height: 100px;
  margin-left: 15px;
  padding: 10px;
  display: flex;
  flex: 1;
`

const RadioWrapper = styled.div`
  margin-left: 15px;
`

const Span = styled.span`
  margin-left: 15px;
`

const mapStateToProps = (state) => {
  return {
    category: state.AboutReducer.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategory: () => {
      dispatch(loadCategory())
    },
    saveToForm: (value) => {
      dispatch(saveToForm(value))
    }
  }
}

About = connect(mapStateToProps, mapDispatchToProps)(About);

export default About;