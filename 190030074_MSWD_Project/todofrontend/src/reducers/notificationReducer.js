const initialstate=null
const notificationReducer=(state=initialstate,action) =>{
    switch(action.type){
        case 'SHOW_NOTIFICATION':return action.notification
        case 'HIDE_NOTIFICATION':return action.notification
        default:return state
    }
}


const delay = time => new Promise(res => setTimeout(res, time));
export const setNotification = (notification, displayTime) => {
    return async dispatch => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        notification,
      })
      await delay(displayTime * 1000);
        dispatch({
          type: 'HIDE_NOTIFICATION',
          notification: null
        })
    }
  }

export default notificationReducer