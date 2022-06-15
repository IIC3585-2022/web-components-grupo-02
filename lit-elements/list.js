import { html, css, LitElement } from 'lit';
import {repeat} from 'lit/directives/repeat.js';

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
      items: { type: Array },
      value: { type: String },
    }
  }

  constructor() {
    super()
    this.items = []
    this.value = "";
  }

  firstUpdated() {
      this.items = [this.item1, this.item2, this.item3];
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
                <p>${item}</p>
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
  }

  add() {
    if (this.value === "") {
        alert("No puedes dejar el campo vacío");
    }
    else {
        this.items.push(this.value);
        this.update(this.items);
    }
  }
  onChange(e){
    this.value = e.target.value;
    this.update(this.value);
  }
}