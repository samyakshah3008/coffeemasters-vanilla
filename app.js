import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";

// import my web components

import { DetailsPage } from "./components/DetailsPage.js";
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { ProductItem } from "./components/ProductItem.js";

window.app = {};
app.store = Store;
app.router = Router;

console.log(MenuPage, OrderPage, DetailsPage, ProductItem);

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
  app.router.init();
});
