/** 
    Mecatron.js
    Controlador principal del Juego Mecatron-3000
    @author Juan Manuel Toscano Reyes <jtoscanoreyes.guadalupe@alumnado.fundacionloyola.net>
    @License GPL v3 2021
*/
'use strict'
/**
 * Controlador principal del juego.
 */
class Juego{
    constructor(){
        this.vista=new Vista()
        this.modelo=new Modelo()
        this.generadorPalabras=null
        this.animador=null
        this.divPrincipal=null
        window.onload=this.iniciar.bind(this)
    }
    /**
     * Pone en marcha el juego
     */
    iniciar(){
        console.log('Iniciando..');

        this.divPrincipal=document.getElementById('divPrincipal')
        this.vista.div=this.divPrincipal

        this.generadorPalabras=window.setInterval(this.generarPalabra.bind(this),4000)
        this.animador=window.setInterval(this.vista.moverPalabras.bind(this.vista),100)
        
    }
    generarPalabra(){
        let nuevaPalabra=this.modelo.crearPalabra()
        this.vista.dibujar(nuevaPalabra)
    }
}
/**
 * Clase Vista que muestra el juego
 */
class Vista{
    constructor(){
        this.div=null
    }
    /** 
        Dibuja el área del juego
        @param palabra {String} la nueva palabra
    */
    dibujar(nuevaPalabra){
        //<div class=palabra>Meca</div>
        let div=document.createElement('div')
        this.div.appendChild(div)
        div.appendChild(document.createTextNode(nuevaPalabra))
        div.classList.add('palabra')

        div.style.top='0px'
        div.style.left=Math.floor(Math.random()*85)+'%'
    }
    /**
     * Baja palabras en el área del juego
     */
    moverPalabras(){
        //Busco todas las palabras del div
        let palabras=this.div.querySelectorAll('.palabra')
        //Para cada palabra aumento su atributo top
        for(let palabra of palabras){
            let top=parseInt(palabra.style.top)
            top +=5
            palabra.style.top=`${top}px`
        }
        //TODO: Si ha llegado al suelo..
        for(let palabra of palabras){
            if(palabra.style.top>='600px'){
                explotar()
            }
        }
    }
    explotar(){
        
    }
}
/**
 * Modelo de datos de juego
 */
class Modelo{
    constructor(){
        this.palabras=['En','un','lugar','de','La','Mancha']
    }
    /**
     * Devuelve una nueva palabra
     * @return {String} Palabra generada
     */
    crearPalabra(){
        return this.palabras[Math.floor(Math.random()*this.palabras.length)]
    }
}


var app=new Juego()
