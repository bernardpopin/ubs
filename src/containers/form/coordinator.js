import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadCoordinator } from '../../actions/index';


class Coordinator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responsible: '',
    };
  }

  componentDidMount() {
    this.props.loadCoordinator();
  }

  handleChange(e) {
    this.setState({ responsible: e.target.value }, () => {console.log('state', this.state)});
  }

  render() {
    const { coordinator } = this.props;
    return (
      <Container>
        <SectionTitle>Coordinator</SectionTitle>
        <Wrapper>
          <Label>Responsible:</Label>
          <Select value={this.state.responsible} onChange={this.handleChange.bind(this)}>
            {coordinator && coordinator.map((option) => (
              <option key={option.id} value={option.name}>{option.name}</option>
            ))}
          </Select>
        </Wrapper>
        <Wrapper>
          <Label>E-mail:</Label>
          <Input placeholder='E-mail'/>
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
  color: #999999;
  margin-left: 15px;
  padding-left: 10px;
  display: flex;
  flex: 1;
`

const Input = styled.input`
  &::-webkit-input-placeholder {
    color: #999999;
  }
  height: 38px;
  border: 1px solid #dddddd;
  color: #999999;
  padding: 0;
  margin-left: 15px;
  padding-left: 10px;
  display: flex;
  flex: 1;
`

const mapStateToProps = (state) => {
  return {
    coordinator: state.CoordinatorReducer.coordinator
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCoordinator: () => {
      dispatch(loadCoordinator())
    }
  }
}

Coordinator = connect(mapStateToProps, mapDispatchToProps)(Coordinator);

export default Coordinator;
