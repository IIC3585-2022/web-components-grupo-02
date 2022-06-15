class item extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.nombre;
        this.precio;
        this.precio_real;
        this.calificacion;
        this.descuento;
        this.img;
    }

    static get observedAttributes(){
        return ['nombre','precio', 'precio_real', 'calificacion', 'descuento', 'img'];
    }

    attributeChangedCallback(nameAtr, oldValue, newValue){
        switch(nameAtr){
            case 'nombre':
                this.nombre = newValue;
            break;
            case 'precio':
                this.precio = newValue;
            break;
            case 'precio_real':
                this.precio_real = newValue;
            break;
            case 'calificacion':
                this.calificacion = newValue;
            break;
            case 'descuento':
                this.descuento = newValue;
            break;
            case 'img':
                this.img = newValue;
            break;
        }
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
            }
            .max-width {
                max-width: 17rem;
            }
            .container {
                background-color: #fff;
                border: .1rem solid #e6e6e6;
                border-top: .2rem solid #e6e6e6;
                display: flex;
                flex-direction: column;
                border-radius: 2rem;
            }
            .image-item img {
                border-top-left-radius: 2rem;
                border-top-right-radius: 2rem;
            }
            .text-item {
                border-top: .1rem solid #e6e6e6;
            }
            .text-item > p {
                font-size: 1.8rem;
                text-align: center;
                margin: .8rem 0 0 0;
                line-height: 1.2;
            }
            .precio-items {
                display: flex;
                justify-content: space-around;
            }
            .precio-items p {
                font-size: 1.4rem;
                margin: .5rem 0;
            }
            .precio {
                font-size: 1.6rem;
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
                margin-bottom: .5rem;
            }
            .raiting img {
                width: 2rem;
                height: 2rem;
                margin-right: .5rem;
            }
            .raiting p {
                margin: 0;
            }
        </style>

        <div class="container max-width">
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

            </div>
        </div>`;
    }
}

window.customElements.define('sell-item-component', item);
