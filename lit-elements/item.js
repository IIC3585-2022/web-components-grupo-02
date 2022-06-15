import { html, css, LitElement } from 'lit';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class Item extends LitElement {
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
    }
    img { /* img responsive */
        max-width: 100%; /* Para que solo ocupe el ancho del contenedor */
        display: block; /* Para que no quede espacio debajo de la imagen */
        height: auto;
    }
    :host {
        background-color: #fff;
        border: .1rem solid #e6e6e6;
        border-top: .2rem solid #e6e6e6;
        display: flex;
        flex-direction: column;
        border-radius: 2rem;
        max-width: 14rem;
        cursor: pointer;
    }
    .image-item {
      flex: 1;
    }
    .image-item img {
      height: 100%;
      object-fit: cover;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
    }
    .text-item {
        border-top: .1rem solid #e6e6e6;
    }
    .text-item > p {
        font-size: 1.2rem;
        text-align: center;
        margin: .8rem 0 0 0;
        line-height: 1;
    }
    .precio-items {
        display: flex;
        justify-content: space-around;
        padding: 0 .2rem;
    }
    .precio-items p {
        font-size: 1rem;
        margin: .5rem 0;
    }
    .precio {
        font-size: 1rem;
        color: #389FDF;
    }
    .precio-items span {
        text-decoration: line-through;
    }
    .descuento {
        background-color: #BD1D50;
        padding: .1rem .5rem;
        border-radius: .5rem;
        color: white;
    }
    .raiting {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }
    .raiting img {
        width: 1.4rem;
        height: 1.4rem;
        margin-right: .5rem;
    }
    .raiting p {
        margin: 0;
    }
    `
  }

  static get properties() {
    return {
      nombre: { type: String },
      precio: { type: Number },
      precio_real: { type: Number },
      calificacion: { type: Number },
      descuento: { type: Number },
      img: { type: String },

    }
  }

  constructor() {
    super()
  }

  render() {
    return html`
    <div class="image-item">
        <img loading="lazy" src="${this.img}" alt="Imagen Producto">
    </div>
    <div class="text-item">
        <p>${this.nombre}</p>
        <div class="precio-items">
            <div>
                <p class="precio">$${this.precio}</p>
                <p class="normal">Normal: <span>$${this.precio_real}</span></p>
                <div class="raiting">
                    <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/800px-Estrella_amarilla.png" alt="Imagen rating">
                    <p>${this.calificacion}</p>
                </div>
            </div>
            <div>
                <p class="descuento">-${this.descuento}%</p>
            </div>
        </div>
    </div>`
  }
}

// window.customElements.define('sell-item-lit', Item)
