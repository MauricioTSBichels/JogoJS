const canvas = document.getElementById ('jogocanvas')
const ctx = canvas.getContext('2d')
let gravidade = 0.5
let gameOver=false
let reset=false

document.addEventListener('keypress',(botaop)=>{
 if (botaop.code == "Space"){
    personagem.pulando=true
    personagem.velocidade_y=15
 }
 console.log(botaop)   
})

document.addEventListener('keypress',(botaor)=>{
    if (botaor.code=="KeyR"){
       reset=true
    }
    console.log(botaor)    
   })

const personagem = {
    x:100,
    y:canvas.height-50,
    largura:50,
    altura:50,
    velocidade_y:0,
    pulando:false
}

const obstaculo = {
    x:canvas.width-50,
    y:canvas.height-100,
    largura:50,
    altura:100,
    velocidade_x:4,
}

function desenharpersonagem (){
    ctx.fillStyle = 'black'
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura)  
}

function atualizarpersonagem(){
 if (personagem.pulando == true){   
     personagem.y -= personagem.velocidade_y
     personagem.largura=40
     personagem.altura=60
     personagem.x=90
     if(personagem.velocidade_y<3){
         personagem.largura=60
         personagem.altura=40
         personagem.x=80
         if(personagem.velocidade_y<=-3){
             personagem.largura=40
             personagem.altura=60
             personagem.x=90  
         }   
     }
     if (personagem.y >= canvas.height - 50){
        personagem.y=canvas.height-50
        personagem.velocidade_y=0
        personagem.pulando=false   
    }
     g()
 }
 else {
    personagem.largura=50
    personagem.altura=50
 }
}
function desenharobstaculo() {
    ctx.fillStyle = 'red'
    ctx.fillRect(
        obstaculo.x,
        obstaculo.y,
        obstaculo.largura,
        obstaculo.altura)   
}
function atualizarobstaculo(){
    obstaculo.x=obstaculo.x-obstaculo.velocidade_x
    if (obstaculo.x<=0){
       obstaculo.x=canvas.width
    }
}
function verificarColizao(){
  if (obstaculo.x < personagem.x + personagem.largura && obstaculo.largura + obstaculo.x > personagem.x
      && personagem.y < obstaculo.y + obstaculo.altura && personagem.y + obstaculo.altura > obstaculo.y) {
     obstaculo.velocidade_x=0
     personagem.velocidade_y=0
     ctx.fillStyle='yellow'
     ctx.font='50px Arial'
     ctx.fillText('GAME OVER',50,100)
     gameOver=true
  }
}
function Restart(){
    //personagem
    personagem.x=100
    personagem.y=canvas.height-50
    personagem.largura=50
    personagem.altura=50
    personagem.velocidade_y=0
    personagem.pulando=false
    //obstaculo
    obstaculo.x=canvas.width-50
    obstaculo.y=canvas.height-100
    obstaculo.largura=50
    obstaculo.altura=100
    obstaculo.velocidade_x=4
    //limpar
    gameOver=false
}
function loop (){
    if (gameOver==false){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    desenharpersonagem()
    atualizarpersonagem()
    desenharobstaculo()
    atualizarobstaculo()
    verificarColizao()
    }
    if (reset==true){
    Restart()   
    }
    requestAnimationFrame(loop)
}
function g(){
    personagem.velocidade_y = personagem.velocidade_y-gravidade
}

loop()