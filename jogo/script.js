const canvas = document.getElementById ('jogocanvas')
const ctx = canvas.getContext('2d')
let gravidade = 0.5

document.addEventListener('keypress',(botaop)=>{
 if (botaop.code == "Space"){
    personagem.pulando=true
    personagem.velocidade_y=15
 }    
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
    x:700,
    y:100,
    largura:50,
    altura:50,
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
     if(personagem.velocidade_y<3){
         personagem.largura=60
         personagem.altura=40
         if(personagem.velocidade_y<=-3){
             personagem.largura=40
             personagem.altura=60  
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
function loop (){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    desenharpersonagem()
    atualizarpersonagem()
    desenharobstaculo()
    requestAnimationFrame(loop)
}
function g(){
    personagem.velocidade_y = personagem.velocidade_y-gravidade
}

loop()