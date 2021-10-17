import { createContext, useReducer } from 'react';

const initialState = {
  recordPerPage: 5,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'RECORD_PER_PAGE':
      return { ...state, recordPerPage: action.page_size };

    default:
      break;
  }
};
const AppContext = createContext({
  state: initialState,
});

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
