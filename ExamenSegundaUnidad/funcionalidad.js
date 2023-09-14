
const canvas= document.querySelector("canvas"); //Obtenemos el objeto canvas
const contexto= canvas.getContext('2d'); //Obtenemos el contexto del canvas 

canvas.width= window.innerWidth; //Le damos medidas al canvas de toda la ventana.
canvas.height= window.innerHeight;

class Limites{ //Creamos una clase limites para poner los topes del mapa

    constructor({posicion}){ //Para no pasar todos los parámetros de posicion, creamos un objeto

        this.posicion= posicion;
        this.width=40;
        this.height=40;

    }

    dibujarLimite(){ //Creamos una función que nos permite dibujar los límites (Cuadrados)

        contexto.fillStyle= "blue";
        contexto.fillRect(this.posicion.x, this.posicion.y,
                        this.width,this.height);

    }
}

const limit= new Limites({posicion: { x:0 , y:0}});
limit.dibujarLimite(); 