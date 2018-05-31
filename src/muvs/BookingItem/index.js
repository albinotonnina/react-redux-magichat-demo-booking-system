import React from 'react'

import {Frame, Hovered} from '../../ui/muv'

import BookingEditor from '../../containers/BookingEditor'

class BookingItem extends React.Component {
  closeCurrentFrame = () => this.props.actions.closeCurrentFrame()

  render() {
    const {isActive} = this.props

    return (
      <Frame
        isActive={isActive}
        frameWidth="30vw"
        frameHeight="auto"
        onClickClose={this.closeCurrentFrame}
        render={() => (
          <Hovered>
            <BookingEditor />
          </Hovered>
        )}
      />
    )
  }
}

export default BookingItem
