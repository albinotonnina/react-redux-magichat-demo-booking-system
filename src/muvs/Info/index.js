import React from 'react'
import {Frame, Hovered, Scrollable} from '../../ui/muv'

import videoHelloFile from '../../assets/hello.mp4'
import gifHelloFile from '../../assets/hello.gif'

class Info extends React.Component {
  closeCurrentFrame = () => this.props.actions.closeCurrentFrame()

  render() {
    return (
      <Frame
        isActive={this.props.isActive}
        frameWidth="30vw"
        frameHeight="80vh"
        onClickClose={this.closeCurrentFrame}
      >
        <Hovered>
          <Scrollable>
            <h1>Hello</h1>
            <p>
              My name is{' '}
              <a
                href="https://www.linkedin.com/in/albinotonnina/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Albino Tonnina
              </a>.
            </p>
            <video
              id="gif-mp4"
              poster={gifHelloFile}
              style={{margin: 0, padding: 0, width: '100%'}}
              autoPlay={true}
              loop={true}
              controls={false}
            >
              <source src={videoHelloFile} type="video/mp4" />
              Your browser does not support the mp4 video codec.
            </video>
            <div id="noplay" style={{display: 'none'}}>
              Your browser does not support the mp4 video codec.
            </div>

            <p>
              For this UI I used my{' '}
              <a
                href="https://medium.com/@albinotonnina/magic-hat-technique-408a3fa590bb"
                target="_blank"
                rel="noopener noreferrer"
              >
                'magic hat technique'
              </a>{' '}
              and the related{' '}
              <a
                href="https://github.com/albinotonnina/react-magic-hat"
                target="_blank"
                rel="noopener noreferrer"
              >
                react library
              </a>{' '}
              (that's what the 'muvs' folder in the source code is about).
            </p>
          </Scrollable>
        </Hovered>
      </Frame>
    )
  }
}

export default Info
