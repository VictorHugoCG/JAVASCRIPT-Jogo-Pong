//Declaração de variáveis #########
//Elementos
let vBtIniciar;
let vBola;
let vCpu;
let vJogador;
let vPaineltxtPontos;

//Controle de animação
let game,frames;

//Posições
let posBolaX,posBolaY;
let posJogadorX,posJogadorY;
let posCpuX,posCpuY;

//Direção de acordo com a tecla
let dirJy;

//Posições iniciais
let posJogIniY=180,posJogIniX=10,posCpuIniY=180,posCpuIniX=930,posBolaIniX=475,posBolaIniY=240;

//Tamanhos
let campoX=0,campoY=0,campoW=960,campoH=500;
let barraW=20,barraH=140;
let bolaW=20,bolaH=20;

//Direcão da cpu e da bola
let bolaX,bolaY;
let cpuY=0;

//Velocidade
let velBola,velJogador,velCpu;

//Controles
let pontos=0;
let tecla;
let jogo=false;


//Função de controle para o Jogador
function controlaJogador()
{
    if(jogo==true)
    {
        posJogadorY+=velJogador*dirJy;
        //controle para limitar o deslocamento da barra do jogador
        //se a parte inferior da barra alcançar o limite do campo o valor é invertido e a movimentação é travada
        //se a parte superior da barra alcançar o limite do campo o valor é invertido e a movimentação é travada
        if(((posJogadorY+barraH)>=campoH)||(posJogadorY<=0))
        {
            posJogadorY+=velJogador*dirJy*(-1);
        }
        vJogador.style.top=posJogadorY+"px";
    }
}

//Função para conrole da cpu
function controlaCpu()
{
    if(jogo==true)
    {
        //verificando se a bola está depois do meio de campo e se está indo para a direita
        //se sim movimentar a cpu, senão posicionar a cpu no centro
        if(posBolaX > (campoW/2) && bolaX > 0)
        {
            //Movimentar Cpu
            if(posBolaY+(bolaH/2) > ((posCpuY+(barraH/2))+velCpu))
            {
                //Mover para baixo
                if((posCpuY+barraH) <= campoH)
                {
                    posCpuY+=velCpu;
                }
                
            }
            else if((posBolaY+(bolaH/2) < posCpuY+(barraH/2)-velCpu))
            {
                //Mover para cima
                if(posCpuY>=0)
                {
                    posCpuY-=velCpu;
                }
                
            }
        }
        else
        {
            //Posicionar Cpu no centro
            //verificando se a metade da barra da cpu está acima ou abaixo da metade do campo
            //
            if(posCpuY+(barraH/2) < (campoH/2))
            {
                posCpuY+=velCpu;
            }
            else if(posCpuY+(barraH/2) > (campoH/2))
            {
                posCpuY-=velCpu;
            }
        }
        vCpu.style.top=posCpuY+"px";
    }
}

//Função para controlar a bola
function controlaBola()
{
    //Controle de movimento da bola
    posBolaX+=velBola*bolaX;
    posBolaY+=velBola*bolaY;

    //Colisão com o jogador
    //verificando se a bola colidiu com a barra do jogador
    //dependendo do ponto da colisão na barra a bola toma uma direção diferente
    if((posBolaX <= posJogadorX+barraW)&&(posBolaY+bolaH >= posJogadorY)&&(posBolaY <= posJogadorY+barraH))
    {
        bolaY=(((posBolaY+(bolaH/2))-(posJogadorY+(barraH/2)))/32)
        bolaX*=-1
    }

    //Colisão com a Cpu
    //verificando se a bola colidiu com a barra da Cpu
    //dependendo do ponto da colisão na barra a bola toma uma direção diferente
    if((posBolaX >= posCpuX-barraW)&&(posBolaY+bolaH >= posJogadorY)&&(posBolaY <= posJogadorY+barraH))
    {
        bolaY=(((posBolaY+(bolaH/2))-(posJogadorY+(barraH/2)))/32)
        bolaX*=-1
    }

    //Limites superior e inferior
    if(posBolaY>=480 || posBolaY<=0)
    {
        bolaY*=-1;
    }

    //Limites laterais direita e esquerda
    //se ultrapassar o limite da direita é ponto para o jogador se for o da esquerda é ponto para a cpu
    //se ultrapassar o limite a velocidade da bola e as posições da bola,jogador e cpu são reiniciadas e o painel de pontos é atualizado
    if(posBolaX>=(campoW-bolaW))
    {
        velBola=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        pontos++;
        vPaineltxtPontos.value=pontos;
        vJogador.style.top=posJogadorY+"px";
        vCpu.style.top=posCpuY+"px";
        jogo=false
    }
    else if(posBolaX<= 0)
    {
        velBola=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        pontos--;
        vPaineltxtPontos.value=pontos;
        vJogador.style.top=posJogadorY+"px";
        vCpu.style.top=posCpuY+"px";
        jogo=false
    }

    vBola.style.top=posBolaY+"px";
    vBola.style.left=posBolaX+"px";
}

//Funçao de evento tecla down
function teclaDw()
{
    tecla = event.keyCode;
    //38=cima
    if(tecla==38)
    {
        dirJy=-1;
    }
    else if(tecla==40)
    //40=baixo
    {
        dirJy=1;
    }
}

//Funçao de evento tecla up
function teclaUp()
{
    tecla = event.keyCode;
    //38=cima
    if(tecla==38)
    {
        dirJy=0;
    }
    else if(tecla==40)
    //40=baixo
    {
        dirJy=0;
    }
}

//Função para controlar o jogo
function controlaJogo()
{
    if(jogo==true)
    {
        controlaJogador();
        controlaBola();
        controlaCpu();
    }
    frames=requestAnimationFrame(controlaJogo);
}


//Função de inicialização do jogo
function iniciaJogo()
{
    if(jogo==false)
    {
        //cancelando a animação antes de chamar uma nova, para não ficar uma chamada em cima da outra
        cancelAnimationFrame(frames);
        //iniciando o jogo
        jogo=true;
        //inicializando variáveis de direcão e posição
        dirJy=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        posJogadorX=posJogIniX;
        posCpuX=posCpuIniX;
        //inicializando variáveis de direcão da bola
        bolaY=0;
        if(Math.random()*10<5)
        {
            bolaX=-1;
        }
        else
        {
            bolaX=1
        }
        //inicializando variáveis de velocidade
        velJogador=8;
        velBola=8;
        velCpu=8;


        //chamando a função recursiva controlaJogo ao iniciar o jogo
        controlaJogo();
    }
}

//Função inicializadora de variáveis,eventos e outras funções
function inicializa()
{
    //associação dos elementos
    vBtIniciar=document.getElementById("btnIniciar");
    vBtIniciar.addEventListener("click",iniciaJogo);
    vJogador=document.getElementById("dvJogador");
    vCpu=document.getElementById("dvCpu");
    vBola=document.getElementById("dvBola");
    vPaineltxtPontos=document.getElementById("txtPontos");

    //associando os eventos de tecla ao documento
    document.addEventListener("keydown",teclaDw);
    document.addEventListener("keyup",teclaUp);



}

window.addEventListener("load",inicializa);


