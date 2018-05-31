import React from 'react'
import {Frame, Hovered, Scrollable} from '../../ui/muv'
import List from '../../containers/List'
import SearchBar from '../../containers/SearchBar'

class BookingList extends React.Component {
  setNextFrame = frame => this.props.actions.setNextFrame(frame)

  closeCurrentFrame = () => this.props.actions.closeCurrentFrame()

  openItem = () => this.setNextFrame('BookingItem')

  openInfo = () => this.setNextFrame('Info')

  render() {
    return (
      <Frame
        frameWidth="60vw"
        frameHeight="54vh"
        onClickClose={this.closeCurrentFrame}
      >
        <Hovered>
          <SearchBar
            onInfoClick={this.openInfo}
            onNewBookingClick={this.openItem}
          />
          <Scrollable>
            <List onItemClick={this.openItem} />
          </Scrollable>
        </Hovered>
      </Frame>
    )
  }
}

export default BookingList
