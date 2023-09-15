
const canvas= document.querySelector("canvas"); //Obtenemos el objeto canvas
const contexto= canvas.getContext('2d'); //Obtenemos el contexto del canvas 

canvas.width= window.innerWidth; //Le damos medidas al canvas de toda la ventana.
canvas.height= window.innerHeight;

class Limites{ //Creamos una clase limites para poner los topes del mapa
    static width =40;
    static height=40;
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
const escenario=[
    ['-','-','-','-','-','-',],
    ['-',' ',' ',' ',' ','-',],
    ['-',' ','-','-',' ','-',],
    ['-',' ',' ',' ',' ','-',],
    ['-','-','-','-','-','-',],
] //Creamos una matriz para representar nuestro escenario
const limites=[]; //Creamos un array de limites
escenario.forEach((row, i) =>{ 

    //Creamos el foreach para el escenario obteniendo los simbolos y cambiandolos por el mapa
    //Tanto i como j nos servirán para conocer el indice del simbolo obtenido

    row.forEach((caracter, j)=>{

        switch(caracter){

            case '-':
                limites.push(
                    new Limites({
                        posicion:{
                            x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                            y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                        }
                    })
                )
                break;

        }

    })

    limites.forEach((limite)=>{ //Creamos un foreach para dibujar el mapa

        limite.dibujarLimite();

    })

})