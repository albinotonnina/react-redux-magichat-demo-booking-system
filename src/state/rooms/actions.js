import * as API from '../../api/index'

export const RECEIVE_ROOMS = 'rooms/receive'
export const fetchRooms = () => {
  return async dispatch => {
    try {
      const rooms = await API.getRooms()
      dispatch({type: RECEIVE_ROOMS, rooms})
    } catch (e) {
      dispatch({type: 'error', name: 'error', value: e.message})
    }
  }
}
