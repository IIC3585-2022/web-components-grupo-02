import { html, css, LitElement } from 'lit';
import {repeat} from 'lit/directives/repeat.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class Body extends LitElement {
  static get styles() {
    return css`
    html {
      box-sizing: border-box;
      font-size: 62.5%; /* 1REM = 10px */
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        font-size: 1.6rem;
        line-height: 1.5;
        margin: 0;
    }
    img { /* img responsive */
        max-width: 100%; /* Para que solo ocupe el ancho del contenedor */
        display: block; /* Para que no quede espacio debajo de la imagen */
        height: auto;
    }
    .max-width {
      max-width: 60rem;
    }
    .modal {
      visibility: hidden;
      height: 0;
      position: fixed;
      background: #fff;
      padding-left: 2rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #46A3EB;
      padding: 0 4rem;
    }
    .header h1 {
      margin: 1rem 0;
    }
    .header button {
      border: none;
      background: none;
      cursor: pointer;
    }
    .header button img {
      width: 4rem;
    }
    .bg-img {
      background-image: url("https://media.admagazine.com/photos/618a668ab94700461d6213eb/master/w_1600%2Cc_limit/68287.jpg");
      min-height: 60vh;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .bg-img h2 {
      font-size: 4rem;
      margin: 0;
      text-align: center;
      line-height: 1.4;
      text-transform: uppercase;
      font-weight: 700;
    }
    .products {
      text-align: center;
      margin: 5rem 0;
    }
    .products h2 {
      font-size: 5rem;
      margin: 2rem 0;
      font-weight: 900;
    }
    .products-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    `
  }

  static get properties() {
    return {
      products: { type: Array }

    }
  }

  constructor() {
    super()
    this.products = [];
  }

  update_products() {
    this.update(this.products);
  }

  show_modal() {
    this.shadowRoot.querySelector('.modal').style.visibility = 'visible';
    this.shadowRoot.querySelector('.modal').style.height = '100%';
  }

  render() {
    return html`
    <section class="modal">
      <list-item-lit
          item1="Furniture"
          item2="Table"
          item3="Chair"
          promt="Agrega un item"
          titulo="Muebles"
          .items=${this.products}
          @my-event="${() => this.update_products()}"
      >
      </list-item-lit>
    </section>
    <header class="header">
      <h1>Falapley</h1>
      <button @click=${() => this.show_modal()} type="button"><img src="img/settings.png" alt="settings"></button>
    </header>
    <section class="bg-img">
      <h2 class="max-width">Encuentra el mueble que andas buscando</h2>
    </section>
    <main class="products">
      <h2>Nuestros Productos</h2>
      <div class="products-list">
        ${repeat(
          this.products,
          (product) => product,
          (product, index) => 
          html`
          <sell-item-lit
              nombre="${product.nombre}"
              precio="${product.precio}"
              precio_real="${product.precio_real}"
              calificacion="${product.calificacion}"
              descuento="${product.descuento}"
              img="${product.img}"
          >`
        )}
      </div>
    </main>
    `
  }
}

window.customElements.define('body-lit', Body)
