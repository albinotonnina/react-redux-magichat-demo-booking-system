import React from 'react'
import styled, {css} from 'styled-components'
import {Icon} from 'react-icons-kit'
import {ic_clear} from 'react-icons-kit/md/ic_clear'
import {halfSpin} from './animations'

const media = {
  handheld: (...args) => css`
    @media (max-width: 1024px) {
      ${css(...args)};
    }
  `
}

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.handheld`
    flex-direction: column;
  `};
`

const CloseIconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -16px;
  top: -16px;
  opacity: ${({isVisible}) => (isVisible ? 1 : 0)};
  pointer-events: ${({isVisible}) => (isVisible ? 'auto' : 'none')};
  background: white;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  ${media.handheld`
    top: 0;
    right:0;
  `};
`
const CloseIcon = styled(Icon)`
  cursor: pointer;
  color: #999;
  transition: color 200ms ease-in;
  &:hover {
    color: #a9a9a9;
    animation: ${`${halfSpin} 1s 0s forwards ease-out`};
  }
`

export const Scrollable = styled.div`
  overflow: scroll;
`

const Container = styled.div`
  width: ${props => props.frameWidth || '50vw'};
  height: ${props => props.frameHeight || 'auto'};
  margin-right: 16px;
  position: relative;
  display: flex;
  transform-origin: 0 50%;
  & > * {
    flex: 1 1 auto;
  }
  ${media.handheld`
    width: 100%;
    height: 50%;
    margin-right:0;
  `};
`

export const Hovered = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1em 1em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  border-radius: 0.28571429rem;
  border: 1px solid rgba(0, 0, 0, 0.09);
`

export const Frame = ({
  isActive,
  onClickClose,
  frameWidth,
  frameHeight,
  render,
  children
}) => (
  <Container frameWidth={frameWidth} frameHeight={frameHeight}>
    {render ? render() : children}
    {
      <CloseIconWrapper isVisible={isActive}>
        <CloseIcon
          size={24}
          icon={ic_clear}
          onClick={onClickClose}
          title="Close Current View"
        />
      </CloseIconWrapper>
    }
  </Container>
)
