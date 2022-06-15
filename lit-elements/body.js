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
    }
    .products h2 {
      font-size: 5rem;
      margin: 2rem 0;
      font-weight: 900;
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
      >
      </list-item-lit>
    </section>
    <header class="header">
      <h1>Falapley</h1>
      <button type="button"><img src="img/settings.png" alt="settings"></button>
    </header>
    <section class="bg-img">
      <h2 class="max-width">Encuentra el mueble que andas buscando</h2>
    </section>
    <main class="products">
      <h2>Nuestros Productos</h2>
      <div class="products">
        ${repeat(
          this.products,
          (product) => product,
          (product, index) => 
          html`
          <sell-item-lit
              nombre="Berger Dante Cuero Combinado"
              precio="299.990"
              precio_real="599.990"
              calificacion="4.6"
              descuento="50"
              img="https://falabella.scene7.com/is/image/Falabella/14610790_1?wid=1500&hei=1500&qlt=70"
          >`
        )}
      </div>
    </main>
    `
  }
}

window.customElements.define('body-lit', Body)
