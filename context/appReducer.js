export const initialState = {
  query: {},
  loading: true,
  searchQuery: {},
  localSearchQuery: '',
  filteredData: null,
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_query_res':
      return {
        ...state,
        data: action.data,
        filteredData: action.filteredData,
        searchQuery: action.searchQuery,
      };
    case 'set_search_query':
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    case 'filter_query':
      return {
        ...state,
        filteredData: state.data.filter(data => {
          const itemData = `${data.country.toLowerCase()}
            ${data.product_name.toLowerCase()} ${data.active_substance.toLowerCase()}`;
          return itemData.indexOf(action.query.toLowerCase()) > -1;
        }),
      };

    case 'clear_filter':
      return {
        ...state,
        filteredData: null,
      };

    default:
      return state;
  }
};
export default reducer;
