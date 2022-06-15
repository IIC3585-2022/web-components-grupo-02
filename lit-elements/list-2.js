import { html, css, LitElement } from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import axios from 'axios';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class List extends LitElement {
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
        width: 1.2rem;
    }
    h1 {
        margin: 0;
    }
    button {
        border: none;
        background: none;
    }
    .items {
        display: flex;
        flex-direction: column;
        align-items: left;
        margin-left: 2rem;
    }
    .items p {
        margin: .5rem 0;
    }
    .items .item:last-child {
        margin-bottom: 1rem;
    }
    .item {
        display: flex;
        align-items: center;
    }
    .item p {
        flex-basis: 8rem;
    }
    .item img {
        margin-left: 1rem;
    }
    .agregar {
        display: flex;
    }
    .agregar p {
        margin: .1rem 0;
    }
    .agregar input {
        margin-left: .5rem;
    }
    `
  }

  static get properties() {
    return {
      item1: { type: String },
      item2: { type: String },
      item3: { type: String },
      promt: { type: String },
      titulo: { type: String },
      value: { type: String },
    }
  }

  constructor() {
    super()
    // this.items = []
    this.value = "";
  }

  firstUpdated() {
    const min = 10000;
    const max = 900000;
    [this.item1, this.item2, this.item3].forEach(item => {
      axios.get(`https://api.pexels.com/v1/search?query=${item}`)
      .then(response => {
        const real_price = Math.floor(Math.random() * (max - min)) + min;
        const price = Math.floor(Math.random() * (real_price - min)) + min;
        const calification = Math.floor(Math.random() * (5 - 1)) + 1;
        const discount = 100 - Math.floor((price * 100/ real_price)) ;
        const data = {
          nombre: item,
          precio: price,
          precio_real: real_price,
          calificacion: calification,
          descuento: discount,
          img: response.data.photos[1].src.original
        }
        this.items.push(data);
        this.update(this.items);
        let event = new CustomEvent('my-event', data);
        this.dispatchEvent(event);
      })
      .catch(e => {
          // Podemos mostrar los errores en la consola
          console.log(e);
      })
      
    });
  }

  render() {
    return html`
    <h1>${this.titulo}</h1>
    <div class="items">
        ${repeat(
            this.items,
            (item) => item,
            (item, index) => 
            html`
            <div id="${this.pos}" class="item">
                <p>${item.nombre}</p>
                <button @click=${() => this.delete(index)} class="remove-button" type="button"><img src="img/remove.png" alt="imagen eliminar"></button>
            </div>`
          )}
    </div>
    <div class="agregar">
        <p>${this.promt}:</p>
        <input @input=${this.onChange} type="text">
        <button @click=${this.add} class="add-button" type="button"><img src="img/add.png" alt="imagen agregar"></button>
    </div>`
  }

  delete(pos) {
      this.items.splice(pos, 1);
      this.update(this.items);
      let event = new CustomEvent('my-event');
      this.dispatchEvent(event);
  }

  add() {
    if (this.value == "") {
        alert("No puedes dejar el campo vacío");
    }
    else {
      const min = 10000;
      const max = 900000;
      axios.get(`https://api.pexels.com/v1/search?query=${this.value}`)
      .then(response => {
        const real_price = Math.floor(Math.random() * (max - min)) + min;
        const price = Math.floor(Math.random() * (real_price - min)) + min;
        const calification = Math.floor(Math.random() * (5 - 1)) + 1;
        const discount = 100 - Math.floor((price * 100/ real_price)) ;
        const data = {
          nombre: this.value,
          precio: price,
          precio_real: real_price,
          calificacion: calification,
          descuento: discount,
          img: response.data.photos[0].src.original
        }
        this.items.push(data);
        this.update(this.items);
        let event = new CustomEvent('my-event');
        this.dispatchEvent(event);
      })
      .catch(e => {
          // Podemos mostrar los errores en la consola
          console.log(e);
      })
    }
  }
  onChange(e){
    this.value = e.target.value;
    this.update(this.value);
  }
}

window.customElements.define('list-item-lit', List)
