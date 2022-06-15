class list extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.promt;
        this.titulo;
        this.item1;
        this.item2;
        this.item3;
        this.number = 4;
    }

    static get observedAttributes(){
        return ['item1', 'item2', 'item3', 'promt', 'titulo', 'number'];
    }

    attributeChangedCallback(nameAtr, oldValue, newValue){
        switch(nameAtr){
            case 'item1':
                this.item1 = newValue;
            break;
            case 'item2':
                this.item2 = newValue;
            break;
            case 'item3':
                this.item3 = newValue;
            break;
            case 'promt':
                this.promt = newValue;
            break;
            case 'titulo':
                this.titulo = newValue;
            break;
            case 'number':
                this.number = newValue;
            break;
        }
    }

    agregar(){
        this.name = this.shadowRoot.querySelector("input").value;
        this.shadowRoot.querySelector("input").value = "";
        if (this.name == '') {
            alert("No puedes dejar el campo vacío");
        }
        else {
            this.all_items = this.shadowRoot.querySelector(`.items`);
            // Create div
            this.div = document.createElement("div");
            this.div.id = `item${this.number}`;
            this.div.classList.add("item");
            // Create p
            this.p = document.createElement("p");
            this.p.innerHTML = this.name;
            // Create button
            this.delete_button = document.createElement("button");
            this.delete_button.id = `item${this.number}`;
            this.delete_button.classList.add("remove-button");
            this.delete_button.innerHTML = `<img src="img/remove.png" alt="imagen eliminar">`;
            this.delete_button.type = "button";
            const idToDelete = this.delete_button.id;
            // Add the event listener
            this.delete_button.addEventListener('click', evt => {
                this.eliminar(idToDelete);
            });
            // Append elements
            this.div.appendChild(this.p);
            this.div.appendChild(this.delete_button);
            // Append element
            this.all_items.appendChild(this.div);

            this.number++;
        }
    }

    eliminar(id){
        this.remove_div = this.shadowRoot.querySelector(`#${id}`);
        this.remove_div.remove();
    }

    connectedCallback(){
        this.shadowRoot.innerHTML = `
        <style>
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
        </style>
        <div>
            <h1>${this.titulo}</h1>
            <div class="items">
                <div id="item1" class="item">
                    <p>${this.item1}</p>
                    <button id="item1" class="remove-button" type="button"><img src="img/remove.png" alt="imagen eliminar"></button>
                </div>
                <div id="item2" class="item">
                    <p>${this.item2}</p>
                    <button id="item2" class="remove-button" type="button"><img src="img/remove.png" alt="imagen eliminar"></button>
                </div>
                <div id="item3" class="item">
                    <p>${this.item3}</p>
                    <button id="item3" class="remove-button" type="button"><img src="img/remove.png" alt="imagen eliminar"></button>
                </div>
            </div>
            <div class="agregar">
                <p>${this.promt}:</p>
                <input type="text">
                <button class="add-button" type="button"><img src="img/add.png" alt="imagen agregar"></button>
            </div>
        </div>`;

        this.add_button = this.shadowRoot.querySelector(".add-button");
        this.add_button.addEventListener('click', evt => {
            this.agregar();
        });
        this.remove_buttons = this.shadowRoot.querySelectorAll(".remove-button");
        this.remove_buttons.forEach(remove_button => {
            remove_button.addEventListener('click', evt => {
                this.eliminar(remove_button.id);
            });
        });
    }

    disconnectedCallback() {
        this.add_button.removeEventListener("click", this);
    }
}

window.customElements.define('list-item-component', list);
