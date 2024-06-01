export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }
  // While creating a custom element, you cannot return the below as it will throw an error of failed to construct custom element , result must not have children, two ways to fix: one is to write in connected callback and the other one is shadow DOM
  //   const template = document.getElementById("menu-page-template");
  //     const content = template.content.cloneNode(true); // deep clone
  //     this.appendChild(content);

  // when component is attached to DOM
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true); // deep clone
    // this.appendChild(content); // appending to the real DOM
    this.root.appendChild(content); // appending to the shadowDOM

    window.addEventListener("appmenuchange", () => {
      this.render();
    });
  }

  render() {
    if (app.store.menu) {
      this.root.querySelector("#menu").innerHTML = "";

      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `<h3>${category?.name}</h3>
        <ul class="category"></ul>`;
        this.root.querySelector("#menu").appendChild(liCategory);

        category?.products.forEach((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
