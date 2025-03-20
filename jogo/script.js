const canvas = document.getElementById ('jogocanvas')
const ctx = canvas.getContext('2d')

const personagem = {
    x:100,
    y:350,
    largura:50,
    altura:50
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
    personagem.y -= 1 
}

function loop (){
    ctx.clearReact(0,0,canvas.width,canvas.height)
    desenharpersonagem()
    atualizarpersonagem()
    requestAnimationFrame(loop)
}

loop()