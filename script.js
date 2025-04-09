const canvas = document.getElementById('jogocanvas')
const ctx = canvas.getContext('2d')

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' & personagem.pulando==false ){
        console.log(e)
        personagem.saltar()
    }
    if (e.code == 'KeyA'){
        console.log(e)
        personagem.andarn()
    }if (e.code == 'KeyD'){
        console.log(e)
        personagem.andarm()
    }    
    

} )
class Entidade {
    constructor(x, y, largura, altura, cor){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor
    }
    desenhar () {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Personagem extends Entidade {
  #velocidade_y
  #velocidade_x  
 constructor(x,y, largura, altura, cor){
     super(x,y, largura, altura, cor)
     this.#velocidade_y=0
     this.#velocidade_x=0
     this.pulando=false
 }
 saltar (){
     this.#velocidade_y = 15
     this.pulando=true 
 }
 andarn(){
     this.#velocidade_x=-5
 }
 andarm(){
     this.#velocidade_x=+5
 }
 atualizar(){
    this.x += this.#velocidade_x
    if (this.pulando == true){   
        this.y -= this.#velocidade_y
        this.#velocidade_y -= 0.5
        if (this.y >= canvas.height - 50){
           this.y=canvas.height-50
           this.pulando=false   
       }
    }
 }

}

class Obstaculo extends Entidade{
    #velocidade_x
    constructor(x,y, largura, altura, cor){
        super(x,y, largura, altura, cor)
        this.#velocidade_x=3
    }
     atualizar(){
         this.x=this.x-this.#velocidade_x
         if (this.x<=0){
            this.x=canvas.width
            this.#velocidade_x = this.#velocidade_x*1.1
            this.altura=(Math.random()*150)
            if(this.#velocidade_x>12){
               this.#velocidade_x=12 
            }
            this.y=canvas.height-this.altura
         }
     }     
}

class Jogo {
    constructor(){
        this.loop = this.loop.bind(this)
    }
    loop () {
        ctx.clearRect(0,0, canvas.width,canvas.height)
        personagem.desenhar()
        obstaculo.desenhar()
        personagem.atualizar()
        obstaculo.atualizar()
        requestAnimationFrame(this.loop)
    }
}
const personagem= new Personagem(100,canvas.height-50,50,50,'blue')
const obstaculo= new Obstaculo(600,canvas.height-100,50,100,'red')
const jogo = new Jogo()
jogo.loop()
