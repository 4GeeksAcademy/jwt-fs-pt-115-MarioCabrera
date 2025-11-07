export const initialStore = () => {
  return {
    characters: [],
    styles: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_favorite':
      if (store.favorites[0] === "(Empty)") {
        return {
          ...store,
          favorites: [action.payload]
        }
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      }
    case 'remove_favorite':
      const newList = store.favorites.filter((element)=>element != action.payload)
      return {
        ...store,
        favorites: newList
      }
    case 'set_personajes':
      return {
        ...store,
        characters: action.payload
      };
    case 'set_styles':
      return {
        ...store,
        styles: action.payload
      };
    default:
      throw Error('Unknown action.');
  }
}
