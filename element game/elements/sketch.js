//personagem.
var meninoBase;
var per_imagemTERRA;
var per_imagemFOGO;
var per_imagemAGUA;
var per_imagemAR;

//projeteis personagem.
var terra, terraImagem;
var fogo, powerUpFogo, powerF, fogoImagem;
var agua, powerUpAgua, powerA, aguaImagem;
var ar, powerUpAR, poweAr, arImagem;

//monstro
var monstro, monstroImagem;

var fogoGroup, terraGroup, aguaGroup, groupPowerUpFogo, groupPowerUpAgua;

//var alciliares.
var lifePlayer = 15;
var lifeMonster = 200;
var timeforms = 1000;
var bloco_de_Movimentação;
var edges;
var playing, gameOver

var powerStatus = "terra";

//cenario.
var chão_verde, chão_verdeImagem;
var chão_invisivel;
var plataformaFlutuante, animaçãoPlataforma;
var cenario, cenarioImagem;
var mato, matoImagem;

function preload() {
  //personagem.
  per_imagemTERRA = loadAnimation("menino telepata terra1.png","menino telepata terra2.png","menino telepata terra3.png","menino telepata terra4.png","menino telepata terra5.png");
  per_imagemFOGO = loadAnimation("menino telepata fogo1.png","menino telepata fogo2.png","menino telepata fogo3.png");
  per_imagemAGUA = loadAnimation("menino telepata agua1.png","menino telepata agua2.png","menino telepata agua3.png","menino telepata agua4.png","menino telepata agua5.png",)

  //projeteis
  terraImagem = loadImage("pedra.png");
  fogoImagem = loadAnimation("fogo (1).png","fogo (2).png","fogo (3).png");
  aguaImagem = loadAnimation("agua1.png","agua2.png","agua3.png","agua4.png");

  //power ups
  powerA = loadImage("powerUpagua.png");
  powerF = loadImage("powerUpfogo.png");

  //cenario.
  animaçãoPlataforma = loadAnimation ("chão flutuante1.png","chão flutuante3.png","chão flutuante4.png","chão flutuante5.png");
  cenarioImagem = loadImage("cenario .png");
  matoImagem = loadImage("mato para esconder o bug1.png");
  chão_verdeImagem = loadImage("bloco verde.png");

  //montros
  monstroImagem = loadImage("monster.png");

}

function setup() {
  //tamanho do background
  createCanvas(1325,600);

  //criando cenario.
  cenario = createSprite(650, 300);
  cenario.addAnimation("cenario", cenarioImagem);
  cenario.scale = 1.0;

  //criando a plataforma.
  plataformaFlutuante = createSprite(250,300);
  plataformaFlutuante.addAnimation("flutuando", animaçãoPlataforma);
  plataformaFlutuante.scale = 1.5;

  //criando o personagem.
  meninoBase = createSprite(255, 245);
  meninoBase.addAnimation("terra", per_imagemTERRA);
  meninoBase.addAnimation("fogo", per_imagemFOGO);
  meninoBase.addAnimation("agua_per", per_imagemAGUA);
  meninoBase.scale = 1.0;

  //resolvendo o bug do bug
  chão_verde = createSprite(255,295, 50, 10);
  chão_verde.addImage("verde", chão_verdeImagem);
  chão_verde.scale = 1.5

  //criando o mato para esconder bugs
  mato = createSprite(255, 250);
  mato.addImage("mato", matoImagem);
  mato.scale = 1.4;

  //criando o monstro
  monstro = createSprite(1250, 300);
  monstro.addImage("monstro", monstroImagem);

  bloco_de_Movimentação = createSprite(100,100);
  bloco_de_Movimentação.visible = false;
  chão_invisivel = createSprite(100,575)
  chão_invisivel.visible = false;

  //edges
  edges = createEdgeSprites();

  //groups
  terraGroup = new Group();
  fogoGroup = new Group();
  groupPowerUpFogo = new Group();

}

function draw() {
  
  if (keyDown("W")&& meninoBase.y >= 50 && plataformaFlutuante.y >= 100) {
    meninoBase.y += -10;
    plataformaFlutuante.y += -10;
    mato.y += -10;
    chão_verde.y += -10;
  }

  if (keyDown("S")&& meninoBase.y <= 600 && plataformaFlutuante.y <= 500) {
    meninoBase.y += 10;
    plataformaFlutuante.y += 10;
    mato.y += 10;
    chão_verde.y +=10;
  }

  if(keyDown("E")) {
      createPower();
  }


  if (groupPowerUpFogo.isTouching(meninoBase)){
    powerStatus = "fogo";
    groupPowerUpFogo.destroyEach();
    meninoBase.changeAnimation("fogo");

    setTimeout (() => {
      meninoBase.changeAnimation("terra");
      powerStatus = "terra";
    
     }, 20000);
  }

  /*if (groupPowerUpAgua.isTouching(meninoBase)){
    powerStatus = "aguA";
    groupPowerUpAgua.destroyEach();
    meninoBase.changeAnimation("agua_per");

    setTimeout (() => {
      meninoBase.changeAnimation("terra");
      powerStatus = "terra";
    
     }, 20000);
  }*/

  // adicionais
  bloco_de_Movimentação.bounceOff(chão_invisivel);
  bloco_de_Movimentação.velocityY += 1;
  bloco_de_Movimentação.collide(edges);

  // consertando o y
  meninoBase.y = plataformaFlutuante.y -50;
  monstro.y = bloco_de_Movimentação.y;

  console.log(powerStatus);

  createPowerUpAgua();
  createPowerUpFogo();
  
  drawSprites();
}

function createPower() {
      if(frameCount % 25 == 0) {
      if (powerStatus === "terra") {
      terra = createSprite(295, 190);
      terra.addImage("terra_attack", terraImagem);

      terra.velocityX = 10;

      terra.x = meninoBase.x +30;
      terra.y = meninoBase.y -30;

      terra.lifeTime = 2000;
      
    
      terraGroup.add(terra);
      }
      if (powerStatus === "fogo") {
        fogo = createSprite(295, 190);
        fogo.addAnimation("fogo_attack", fogoImagem);
        fogo.scale = 0.2;

        fogo.velocityX = 15;

        fogo.x = meninoBase.x +30;
        fogo.y = meninoBase.y -30;

        fogo.lifeTime = 2000;
        

        fogoGroup.add(fogo);
      }
      if (powerStatus === "aguA") {
        agua = createSprite(295, 190);
        agua.addAnimation("agua_attack", aguaImagem);
        agua.scale = 0.3;

        agua.velocityX = 5;

        agua.x = meninoBase.x +30;
        agua.y = meninoBase.y -30;

        agua.lifeTime = 2000;

        aguaGroup.add(agua);
      }
   }
}

function createPowerUpFogo() {
  setTimeout(() => {
    if (frameCount % 300 == 0) {
    powerUpFogo = createSprite(1500,Math.round(random(100, 600)), 10, 10);
    powerUpFogo.addImage("fogo_up", powerF);

    powerUpFogo.velocityX = -7;
    powerUpFogo.lifeTime = 2000;
    powerUpFogo.scale = 1.5;

    groupPowerUpFogo.add(powerUpFogo);
    }
  }, 20000);
}

  function createPowerUpAgua() {
    setTimeout(() =>  {
      if(frameCount % 300 == 0) {
        powerUpAgua = createSprite(1500,Math.round(random(100,600)),10, 10);
        powerUpAgua.addImage("agua_up", powerA);

        powerUpAgua.velocityX = -7;
        powerUpAgua.lifeTime = 2000;
        powerUpAgua.scale = 1.0;

        groupPowerUpAgua.add(powerUpAgua);
      }
    }, 20000);
  }


