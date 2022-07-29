export const selectCategories = state => state.categories.categories.reduce((accumulated, category) => {

  const { title, items } = category;

  accumulated[title.toLowerCase()] = items;
  return accumulated;
}, {});
