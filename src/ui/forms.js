import React from 'react'
import styled from 'styled-components'
import {Icon} from 'react-icons-kit'
import {waggle, spin, halfSpin} from './animations'

const WigglyIcon = styled(Icon)`
  padding-right: 1rem;
  animation: ${({error, valid}) =>
    error
      ? `${waggle} 1s 0s forwards ease-out`
      : valid
        ? `${spin} 1s 0s forwards ease-out`
        : ''};
  color: ${({error, valid}) => (error ? '#dc3545' : valid ? '#1e7e34' : '')};
`

const FormGroup = styled.div`
  display: flex;
  margin-left: -1rem;
  & > :first-child {
    padding: 0;
    flex: 0 0 3rem;
  }
`

export const FormFieldWithIcon = props => (
  <FormGroup className="form-group">
    {props.icon ? (
      <WigglyIcon
        size={24}
        icon={props.icon}
        error={props.error}
        valid={props.valid}
      />
    ) : (
      <span />
    )}
    {props.children}
  </FormGroup>
)

export const BarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;

  & > * {
    flex: 0 0 auto;
  }

  & :nth-child(3) {
    flex: 1 1 auto;
    margin: 0 1rem;
  }
`

export const IcoButton = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.1s linear;
  &:hover {
    opacity: 0.5;
    animation: ${`${halfSpin} 1s 0s forwards ease-out`};
  }
  &:active {
    animation: ${`${waggle} 1s 0s forwards ease-out`};
  }
`
