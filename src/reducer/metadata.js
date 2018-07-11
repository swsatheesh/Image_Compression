function metadata(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case 'IMAGESTORAGE':
    //   newState = { ...state, ...action.payload };
      break;
  }
  return newState;
}
export default metadata;