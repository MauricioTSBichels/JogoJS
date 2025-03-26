const canvas = document.getElementById ('jogocanvas')
const ctx = canvas.getContext('2d')
let gravidade = 0.5
let gameOver=false
let reset=false
let score=0

document.addEventListener('keypress',(botaop)=>{
      if (botaop.code == "Space" && personagem.pulando==false){
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
     
     document.addEventListener('keydown',(botaoa)=>{
          if (botaoa.code=="KeyA"){
              personagem.velocidade_x=-7
          }
          console.log(botaoa)    
     })
     document.addEventListener('keydown',(botaoD)=>{
          if (botaoD.code=="KeyD"){
             personagem.velocidade_x=7
          }
      console.log(botaoD)    
     })

const personagem = {
    x:100,
    y:canvas.height-70,
    largura:50,
    altura:50,
    velocidade_y:0,
    velocidade_x:0,
    pulando:false,
    //imagem: new image()
}

const obstaculo = {
    x:canvas.width-50,
    y:canvas.height-120,
    largura:50,
    altura:100,
    velocidade_x:4,
}

function desenharpersonagem (){
    ctx,drawImage(
        personagem.imagem,
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura,
    )
}

function atualizarpersonagem(){
 if (personagem.pulando == true){   
     personagem.y -= personagem.velocidade_y
     if (personagem.y >= canvas.height - 50){
        personagem.y=canvas.height-50
        personagem.pulando=false   
    }
     g()
 }
 personagem.x=personagem.velocidade_x+personagem.x
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
       obstaculo.velocidade_x = obstaculo.velocidade_x*1.1
       obstaculo.altura=(Math.random()*150)
       obstaculo.y=canvas.height-obstaculo.altura
    }
}
function verificarColizao(){
  if (obstaculo.x < personagem.x + personagem.largura && obstaculo.largura + obstaculo.x > personagem.x
      && personagem.y < obstaculo.y + obstaculo.altura && personagem.y + obstaculo.altura > obstaculo.y) {
     obstaculo.velocidade_x=0
     personagem.velocidade_y=0
     ctx.fillStyle='yellow'
     ctx.font='50px Arial'
     ctx.fillText('GAME OVER',400,200)
     gameOver=true
  }
  else {
  score=score+(1*obstaculo.velocidade_x)
  ctx.fillStyle='black'
  ctx.font='30px Arial'
  ctx.fillText('Pontuação:' + score,70,50)
  console.log(score)
  }
}
function Restart(){
    location.reload()
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