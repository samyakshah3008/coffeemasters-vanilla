const API = {
  url: "../data/menu.json",
  fetchMenu: async () => {
    const result = await fetch(API.url); // http response and not the data, we need to do json parsing
    return result.json();
  },
};

export default API;
