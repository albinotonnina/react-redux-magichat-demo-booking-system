import React from 'react'
import MagicContainer from 'react-magic-hat'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import MUVContainers from './muvs/*/index.js'
import {Wrapper} from './ui/muv'

import _reducers from './state/*/reducers.js' // Parcel <3
const reducersArray = Object.keys(_reducers).reduce(
  (acc, curr) => ({..._reducers[curr].default, ...acc}),
  {}
)

const store = createStore(
  combineReducers(reducersArray),
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

class App extends React.Component {
  renderFrame = ({id, page, activePage, state, actions}) => {
    let extraProps = {
      isActive: activePage === page,
      page
    }

    const Page = id
      ? MUVContainers[id].default
      : MUVContainers.BookingList.default

    return <Page {...state} {...extraProps} actions={actions} />
  }

  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <MagicContainer
            renderFrame={this.renderFrame}
            onEndAnimation={() => {}}
          />
        </Wrapper>
      </Provider>
    )
  }
}

export default App
