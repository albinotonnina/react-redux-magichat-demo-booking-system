import {keyframes} from 'styled-components'

export const waggle = keyframes`
0% {
    transform: none;
  }
  40% {
    transform: rotateZ(-20deg) scale(1.3);
  }
  50% {
    transform: rotateZ(25deg) scale(1.3);
  }
  57.5% {
    transform: rotateZ(-15deg) scale(1.3);
  }
  65% {
    transform: rotateZ(15deg) scale(1.3);
  }
  72.5% {
    transform: rotateZ(-18deg) scale(1.3);
  }
  80% {
    transform: rotateZ(19deg) scale(1.3);
  }
  87.5% {
    transform: rotateZ(-15deg) scale(1.3);
  }
  95% {
    transform: rotateZ(0) scale(1.3);
  }
  100% {
    transform: rotateZ(0) scale(1);
  }
`

export const spin = keyframes`
  50% {
    transform: rotateZ(-20deg);
    animation-timing-function: ease;
  }
  100% {
    transform: rotateZ(720deg);
  }
`
export const halfSpin = keyframes`
  50% {
    transform: rotateZ(-10deg);
    animation-timing-function: ease;
  }
  100% {
    transform: rotateZ(0deg);
  }
`
