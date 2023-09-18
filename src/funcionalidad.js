
const canvas= document.querySelector("canvas"); //Obtenemos el objeto canvas
const contexto= canvas.getContext('2d'); //Obtenemos el contexto del canvas 

canvas.width= window.innerWidth; //Le damos medidas al canvas de toda la ventana.
canvas.height= window.innerHeight;

const puntuacion=document.querySelector("#puntuacion")

class Limites{
     //Creamos una clase limites para poner los topes del mapa
    static width =40;
    static height=40;

    constructor({posicion, imagen}){ //Para no pasar todos los parámetros de posicion, creamos un objeto

        this.posicion= posicion;
        this.width=40;
        this.height=40;
        this.imagen=imagen;

    }

    dibujarLimite(){ //Creamos una función que nos permite dibujar los límites (Cuadrados)

        // contexto.fillStyle= "blue";
        // contexto.fillRect(this.posicion.x, this.posicion.y,
        //                 this.width,this.height);
        contexto.drawImage(this.imagen,this.posicion.x,this.posicion.y);

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

class Fantasmas{

    //Nuestra clase jugador será la encargada de dibujar y accionar a pacman

    constructor({posicion , velocidad, color="red"}){ //Le pasamos como parametro dos objetos con propiedades

        this.posicion = posicion;
        this.velocidad = velocidad;
        this.radio= 16;
        this.color=color;
        this.choquesAnt= [];

    }
    dibujarFantasma(){ //Función para pintar el pacman

        contexto.beginPath();
        contexto.arc(this.posicion.x ,this.posicion.y ,this.radio, 0, Math.PI*2);
        contexto.fillStyle= this.color;
        contexto.fill();
        contexto.closePath();

    }
    actualizar(){ //La funcion actualizar nos permite redibujar el pacman con las posiciones
                  //nuevas de velocidad

        this.dibujarFantasma();
        this.posicion.x += this.velocidad.x;
        this.posicion.y += this.velocidad.y;

    }
}
class Puntos{ //Función para generar los puntos en espacios en blancop

    constructor({posicion}){ 

        this.posicion = posicion;
        this.radio= 3;

    }
    dibujarPunto(){ 

        contexto.beginPath();
        contexto.arc(this.posicion.x ,this.posicion.y ,this.radio, 0, Math.PI*2);
        contexto.fillStyle= "white";
        contexto.fill();
        contexto.closePath();

    }

}
class PowerUp{ //Función para generar los puntos en espacios en blancop

    constructor({posicion}){ 

        this.posicion = posicion;
        this.radio= 10;

    }
    dibujarPowerUp(){ 

        contexto.beginPath();
        contexto.arc(this.posicion.x ,this.posicion.y ,this.radio, 0, Math.PI*2);
        contexto.fillStyle= "white";
        contexto.fill();
        contexto.closePath();

    }

}
const powerUps=[]
const puntos=[];
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
const fantasmas= [
    new Fantasmas({

        posicion:{

            x: Limites.width * 6 + Limites.width / 2,
            y: Limites.height + Limites.height / 2

        },
        velocidad:{

            x:10,
            y:0

        }

    }),
    new Fantasmas({

        posicion:{

            x: Limites.width * 8 + Limites.width / 2,
            y: Limites.height + Limites.height / 2

        },
        velocidad:{

            x:10,
            y:0

        },
        color: 'cyan'

    }),
    new Fantasmas({

        posicion:{

            x: Limites.width  + Limites.width / 2,
            y: Limites.height *10 + Limites.height / 2

        },
        velocidad:{

            x:5,
            y:0

        },
        color: 'orange'

    })
]

let audio= new Audio();
audio.src="/sounds/pacman-song.mp3"
audio.play();
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
let puntaje= 0;
const escenario=[
    ['1','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','2',],
    ['|','*',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','*','|',],
    ['|',' ','cL','cR',' ','1','cR',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','cL','2',' ','cL','cR',' ','|',],
    ['|',' ',' ',' ',' ','|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|',' ',' ',' ',' ','|',],
    ['|',' ','cL','cR',' ','cB',' ','cL','-','-','-','-','-','-','-','-','cR',' ','cB',' ','cL','cR',' ','|',],
    ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|',],
    ['4','-','-','-','2',' ','cT',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','cT',' ','1','-','-','-','3',],
    ['.','.','.','.','|',' ','|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|',' ','|','.','.','.','.',],
    ['.','.','.','.','|',' ','|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|',' ','|','.','.','.','.',],
    ['1','-','-','-','3',' ','|',' ','cL','-','-','-','-','-','-','cR',' ','|',' ','4','-','-','-','2',],
    ['|',' ',' ',' ',' ',' ','cB',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','cB',' ',' ',' ',' ',' ','|',],
    ['|',' ','cL','cR',' ',' ','',' ',' ','cL','-','-','-','-','cR',' ',' ',' ',' ',' ','cL','cR',' ','|',],
    ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|',],
    ['|',' ','cL','-','-','cR',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','cL','-','-','cR',' ','|',],
    ['|','*',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','*','|',],
    ['4','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','3',],
] //Creamos una matriz para representar nuestro escenario
function crearImagen(src){
    
    const imagen= new Image();
    imagen.src= src
    return imagen;

}
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
                        },
                        imagen: crearImagen('/images/pipeHorizontal.png')
                    })
                );
            break;
            case '|':
                limites.push(
                      new Limites({
                        posicion:{
                               x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                               y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                          },
                          imagen: crearImagen('/images/pipeVertical.png')
                  })
                    );
            break;
            case '1':
                    limites.push(
                           new Limites({
                              posicion:{
                                x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                                   y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                             },
                               imagen: crearImagen('/images/pipeCorner1.png')
                       })
                        );
            break;
            case '2':
                 limites.push(
                        new Limites({
                            posicion:{
                                      x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                                      y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                                   },
                             imagen: crearImagen('/images/pipeCorner2.png')
                          })
                         );
            break;
            case '3':
                    limites.push(
                         new Limites({
                                 posicion:{
                                       x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                                       y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                                  },
                                    imagen: crearImagen('/images/pipeCorner3.png')
                                })
                             );
             break;
             case '4':
                    limites.push(
                        new Limites({
                            posicion:{
                                x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                                y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                                     },
                                     imagen: crearImagen('/images/pipeCorner4.png')
                                 })
                            );
            break;
            case 'b':
                    limites.push(
                            new Limites({
                                posicion:{
                                     x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                                     y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                                    },
                                     imagen: crearImagen('/images/block.png')
                                 })
                             );
            break;
            case 'cR':
                limites.push(
                        new Limites({
                            posicion:{
                                 x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                                 y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                                },
                                 imagen: crearImagen('/images/capRight.png')
                             })
                         );
            break;
            case 'cL':
                limites.push(
                        new Limites({
                            posicion:{
                                 x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                                 y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                                },
                                 imagen: crearImagen('/images/capLeft.png')
                             })
                         );
            break;
            case 'cB':
                limites.push(
                        new Limites({
                            posicion:{
                                 x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                                 y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                                },
                                 imagen: crearImagen('/images/capBottom.png')
                             })
                         );
            break;
            case 'cT':
                limites.push(
                        new Limites({
                            posicion:{
                                 x: Limites.width*j, //Le damos el número 40 para que se le asigne ese ancho y largo
                                 y: Limites.height*i // Y lo multiplicamos por las variables indice para dar la posicion
                                },
                                 imagen: crearImagen('/images/capTop.png')
                             })
                         );
            break;
            case ' ':  
                puntos.push(
                    new Puntos({
                        posicion:{
                            x: Limites.width*j + Limites.width /2, //Le damos el número 40 para que se le asigne ese ancho y largo
                            y: Limites.height*i + Limites.height /2 // Y lo multiplicamos por las variables indice para dar la posicion
                            }
                        })
                    );
            break;
            case '*':  
                powerUps.push(
                    new Puntos({
                        posicion:{
                            x: Limites.width*j + Limites.width /2, //Le damos el número 40 para que se le asigne ese ancho y largo
                            y: Limites.height*i + Limites.height /2 // Y lo multiplicamos por las variables indice para dar la posicion
                            }
                        })
                    );
            break;



        }

    });

});

//Creamos una función para detectar la colisión entre jugador y limtes
function choqueJugador({pacman,limite}){

    return (pacman.posicion.y - pacman.radio + pacman.velocidad.y <= limite.posicion.y + limite.height && 
        pacman.posicion.x + pacman.radio + pacman.velocidad.x >= limite.posicion.x &&
        pacman.posicion.y + pacman.radio + pacman.velocidad.y >= limite.posicion.y && 
        pacman.posicion.x - pacman.radio + pacman.velocidad.x <= limite.posicion.x + limite.width);

}
let idAnimacion
function animacion(){ //Creamos una funcion que realizará el movimiento

    idAnimacion=requestAnimationFrame(animacion); //Usamos el requestAnimation para crear un loop infinito
    contexto.clearRect(0,0, canvas.width,canvas.height); //Usamos clearRect para limpiar la pantalla
    //Crearemos un if para que se le añada la velocidad a cada tecla
    if(keys.w.pressed && lastKey=== 'w'){
        
        //Creamos un for para que recorra toods los límites, permitiendo que el jugador pueda moverse más fluido
        // tanto de arriba abajo como de abajo hacia arriba y no haya trabas
        for(let i=0; i<limites.length; i++){
            const limite= limites[i];
            if(choqueJugador({

                pacman: {

                    ...jugador, //Los tres puntos permiten obtener las propiedades del objeto del que se hace referencias
                    velocidad:{

                        x:0,
                        y:-5

                    }

                },
                limite: limite

            })){
            jugador.velocidad.y=0;
            break;
            }else{

                jugador.velocidad.y=-5;

            }
        }
    }
    else if(keys.a.pressed && lastKey=== 'a'){
        for(let i=0; i<limites.length; i++){
        const limite= limites[i];
            if(choqueJugador({

                pacman: {

                    ...jugador, //Los tres puntos permiten obtener las propiedades del objeto del que se hace referencias
                    velocidad:{

                        x:-5,
                        y:0

                    }

                },
                limite: limite

            })){
            jugador.velocidad.x=0;
            break;
            }else{

                jugador.velocidad.x=-5;

            }
        }

    }else if(keys.s.pressed && lastKey=== 's'){
        for(let i=0; i<limites.length; i++){
        const limite= limites[i];
            if(choqueJugador({

                pacman: {

                    ...jugador, //Los tres puntos permiten obtener las propiedades del objeto del que se hace referencias
                    velocidad:{

                        x:0,
                        y:5

                    }

                },
                limite: limite

            })){
            jugador.velocidad.y=0;
            break;
            }else{

                jugador.velocidad.y=5;

            }
        }
    }else if(keys.d.pressed && lastKey=== 'd'){
        for(let i=0; i<limites.length; i++){
        const limite= limites[i];
            if(choqueJugador({

                pacman: {

                    ...jugador, //Los tres puntos permiten obtener las propiedades del objeto del que se hace referencias
                    velocidad:{

                        x:5,
                        y:0

                    }

                },
                limite: limite

            })){
            jugador.velocidad.x=0;
            break;
            }else{

                jugador.velocidad.x=5;

            }
        }
    }
    

    for(let i= puntos.length-1; 0<=i; i--){

        const punto= puntos[i];

        punto.dibujarPunto();
        if(Math.hypot(punto.posicion.x - jugador.posicion.x, 
             punto.posicion.y - jugador.posicion.y) < punto.radio + jugador.radio){

                puntos.splice(i,1)
                puntaje+=10
                puntuacion.innerHTML=puntaje;

                if(puntaje=== 2090){

                    cancelAnimationFrame()

                }
                
    
              }
    }
    limites.forEach((limite)=>{ //Creamos un foreach para dibujar el mapa

        limite.dibujarLimite();

        if(choqueJugador({
            pacman: jugador,
            limite: limite})){

                jugador.velocidad.x=0;
                jugador.velocidad.y=0;
               
        }
    
    });
    
    
    jugador.actualizar(); //Usamos la funcion actualizar para que se repinte el pacman

    //Reseteamos las variables de velocidad a 0 para que no se salgan de cuadro jaja
    jugador.velocidad.x=0;
    jugador.velocidad.y=0;

    fantasmas.forEach(fantasma => {

        fantasma.actualizar();
        if(Math.hypot(fantasma.posicion.x - jugador.posicion.x, 
            fantasma.posicion.y - jugador.posicion.y) < fantasma.radio + jugador.radio){

               cancelAnimationFrame(idAnimacion);
               
   
             }
        const choques=[];
        limites.forEach(limite =>{

            if(!choques.includes('derecha') && choqueJugador({

                pacman: {

                    ...fantasma, //Los tres puntos permiten obtener las propiedades del objeto del que se hace referencias
                    velocidad:{

                        x:10,
                        y:0

                    }

                },
                limite: limite

            })){

                choques.push('derecha');

            }
            if(!choques.includes('izquierda') && choqueJugador({

                pacman: {

                    ...fantasma, //Los tres puntos permiten obtener las propiedades del objeto del que se hace referencias
                    velocidad:{

                        x:-10,
                        y:0

                    }

                },
                limite: limite

            })){

                choques.push('izquierda');

            }
            if(!choques.includes('arriba') && choqueJugador({

                pacman: {

                    ...fantasma, //Los tres puntos permiten obtener las propiedades del objeto del que se hace referencias
                    velocidad:{

                        x:0,
                        y:-10

                    }

                },
                limite: limite

            })){

                choques.push('arriba');

            }
            if(!choques.includes('abajo') && choqueJugador({

                pacman: {

                    ...fantasma, //Los tres puntos permiten obtener las propiedades del objeto del que se hace referencias
                    velocidad:{

                        x:0,
                        y:10

                    }

                },
                limite: limite

            })){

                choques.push('abajo');

            }

        })
        if(choques.length> fantasma.choquesAnt.length)
        fantasma.choquesAnt= choques;

        if(JSON.stringify(choques) !== JSON.stringify(fantasma.choquesAnt)){

            if(fantasma.velocidad.x>0) fantasma.choquesAnt.push('derecha')
            else if(fantasma.velocidad.x<0) fantasma.choquesAnt.push('izquierda')
            else if(fantasma.velocidad.y<0) fantasma.choquesAnt.push('arriba')

            const caminos= fantasma.choquesAnt.filter(choque =>{

                return !choques.includes(choque);

            })
            const direccion= caminos [Math.floor(Math.random() * caminos.length)];

            switch(direccion){

                case 'abajo':
                    fantasma.velocidad.y=10;
                    fantasma.velocidad.x=0;
                    break;
                case 'arriba':
                    fantasma.velocidad.y=-10;
                    fantasma.velocidad.x=0;
                    break;
                case 'izquierda':
                    fantasma.velocidad.y=0;
                    fantasma.velocidad.x=-10;
                    break;
                case 'derecha':
                    fantasma.velocidad.y=0;
                    fantasma.velocidad.x=10;
                        break;

            }
            fantasma.choquesAnt=[]

        }

    })

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