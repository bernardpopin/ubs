import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadResponsible, saveToForm } from '../../actions/index';


class Coordinator extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadResponsible();
  }

  handleChange(e) {
    const keyName = e.target.name;
    let value = e.target.value;
    const coordinator = this.props.form.coordinator || {};
    const newCoordinator = Object.assign(coordinator, {[keyName]: value});
    this.props.saveToForm({coordinator: newCoordinator});
  }

  render() {
    const { responsible } = this.props;
    return (
      <Container>
        <SectionTitle>Coordinator</SectionTitle>
        <Wrapper>
          <Label>Responsible *</Label>
          <Select defaultValue="" name='responsible' required onChange={this.handleChange.bind(this)}>
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

const mapStateToProps = (state) => {
  return {
    responsible: state.CoordinatorReducer.responsible,
    form: state.FormReducer.form
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadResponsible: () => {
      dispatch(loadResponsible())
    },
    saveToForm: (value) => {
      dispatch(saveToForm(value))
    }
  }
}

Coordinator = connect(mapStateToProps, mapDispatchToProps)(Coordinator);

export default Coordinator;
