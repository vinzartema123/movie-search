import movieActions from './movieActions'

const initialState = {
  movie: [],
  pages: {
    page:0,
    total_pages:0,
    total_results:0
  },
  details: [],
  search:''
}

function Reducer(state = initialState, action) { 
  switch(action.type) {
    case movieActions.MOVIE:
      return { ...state, movie: action.payload.results, pages: {page:action.payload.page, total_pages: action.payload.total_pages, total_results: action.payload.total_results}, search: action.payload.value }
    case movieActions.DETAILS:
      return { ...state, details: action.payload }
    default:
      return state;
  }
}


export default Reducer
