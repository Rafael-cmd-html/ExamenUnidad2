
const canvas= document.querySelector("canvas"); //Obtenemos el objeto canvas
const contexto= canvas.getContext('2d'); //Obtenemos el contexto del canvas 

canvas.width= window.innerWidth; //Le damos medidas al canvas de toda la ventana.
canvas.height= window.innerHeight;

class Limites{
     //Creamos una clase limites para poner los topes del mapa
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
class Jugador{

    //Nuestra clase jugador será la encargada de dibujar y accionar a pacman

    constructor({posicion , velocidad}){ //Le pasamos como parametro dos objetos con propiedades

        this.posicion = posicion;
        this.velocidad = velocidad;
        this.radio= 12;

    }
    dibujarPacman(){ //Función para pintar el pacman

        contexto.beginPath();
        contexto.arc(this.posicion.x ,this.posicion.y ,this.radio, 0, Math.PI*2);
        contexto.fillStyle= "yellow";
        contexto.fill();
        contexto.closePath();

    }
    actualizar(){ //La funcion actualizar nos permite redibujar el pacman con las posiciones
                  //nuevas de velocidad

        this.dibujarPacman();
        this.posicion.x += this.velocidad.x;
        this.posicion.y += this.velocidad.y;

    }

}
const limites=[]; //Creamos un array de limites
const jugador = new Jugador({ //Creamos nuestro jugador con propiedades
    posicion: {

        x: Limites.width + Limites.width / 2,
        y: Limites.height + Limites.height / 2

    },
    velocidad: {

        x:0,
        y:0

    }

})

//Creamos un arreglo de objetos que nos permitirá saber que tecla está presionada
//Esto para que la animacion sea fluida y no se vea afectada
const keys ={
    w:{
        pressed:false
    },
    s:{
        pressed:false
    },
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
}
let lastKey= '';
const escenario=[
    ['-','-','-','-','-','-',],
    ['-',' ',' ',' ',' ','-',],
    ['-',' ','-','-',' ','-',],
    ['-',' ',' ',' ',' ','-',],
    ['-','-','-','-','-','-',],
] //Creamos una matriz para representar nuestro escenario
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
                );
                break;

        }

    });

});

function animacion(){ //Creamos una funcion que realizará el movimiento

    requestAnimationFrame(animacion); //Usamos el requestAnimation para crear un loop infinito
    contexto.clearRect(0,0, canvas.width,canvas.height); //Usamos clearRect para limpiar la pantalla
    limites.forEach((limite)=>{ //Creamos un foreach para dibujar el mapa

        limite.dibujarLimite();
    
    });
    
    jugador.actualizar(); //Usamos la funcion actualizar para que se repinte el pacman

    //Reseteamos las variables de velocidad a 0 para que no se salgan de cuadro jaja
    jugador.velocidad.x=0;
    jugador.velocidad.y=0;

    //Crearemos un if para que se le añada la velocidad a cada tecla
    if(keys.w.pressed && lastKey=== 'w'){

        jugador.velocidad.y=-5;
        
    }else if(keys.a.pressed && lastKey=== 'a'){

        jugador.velocidad.x=-5

    }else if(keys.s.pressed && lastKey=== 's'){

        jugador.velocidad.y=5;
        
    }else if(keys.d.pressed && lastKey=== 'd'){
        
        jugador.velocidad.x=5;

    }
}
animacion(); //Mandamos llamar la animación


//Comenzamos con el movimiento del pacman ---------
window.addEventListener('keydown', ({key}) =>{ //Obtenemos la tecla que se está presionando

    //Usamos nuestro arreglo de llaves para saber que tecla se está presionando
    switch(key){
        case 'w':
           keys.w.pressed =true;
           lastKey='w';
        break;

        case 'a':
            keys.a.pressed =true;
            lastKey='a';
        break;

        case 's':
            keys.s.pressed =true;
            lastKey='s';
        break;

        case 'd':
            keys.d.pressed =true;
            lastKey='d';
        break;

    }

});

//Copiamos el mismo accionListener pero ahora con keyup, dandoles valor a 0
//Esto permite que puedan moverse en linea recta
window.addEventListener('keyup', ({key}) =>{ 

    switch(key){

        case 'w':
            keys.w.pressed =false;
        break;

        case 'a':
            keys.a.pressed =false;
        break;

        case 's':
            keys.s.pressed =false;
        break;

        case 'd':
            keys.d.pressed =false;
        break;

    }

})