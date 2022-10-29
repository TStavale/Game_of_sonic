function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#Game").append("<div id='Sonic' class='personagem1'></div>");
	$("#Game").append("<div id='ladybug' class='personagem2'></div>");
	$("#Game").append("<div id='crab' class='personagem3'></div>");
    $("#Game").append("<div id='placar'></div>");
    $("#Game").append("<div id='energia'></div>");


    //Principais variáveis do jogo
	
    var fimdejogo=false;
    var pontos=0;
    var salvos=0;
    var perdidos=0;
    var energiaAtual=3;
	var jogo = {};
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 334);
    
        jogo.pressionou = [];

        var jump=document.getElementById("jump");
        var somExplosao=document.getElementById("bateu");
        var musica=document.getElementById("musica");
        var somGameover=document.getElementById("Gameover");
      
    //Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

        //Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
        });
    
    
        $(document).keyup(function(e){
           jogo.pressionou[e.which] = false;
        });
    
	
	//Game Loop

	jogo.timer = setInterval(loop,30);
	
	function loop() {
	
	movefundo();
    moveSonic();
    moveladybug();
    movecrab();
    colisao();
    placar();
    energia();

    function moveSonic() {
	
            document.getElementById("Sonic").style.cssText = 'transition: all 0.3s  ease-out;'; 
            document.getElementById("Sonic").style.top = "-30px";
            setTimeout(function(){document.getElementById("Sonic").style.top = "60px";},200);
            

        } // fim da função moveSonic()
	
	} // Fim da função loop()

    //Função que movimenta o fundo do jogo
	
	function movefundo() {
	
        esquerda = parseInt($("#Game").css("background-position"));
        $("#Game").css("background-position",esquerda-1);
        
    } // fim da função movefundo()

        function moveladybug() {

            posicaoX = parseInt($("#ladybug").css("left"));
            $("#ladybug").css("left",posicaoX-velocidade);
            $("#ladybug").css("top",posicaoY);
                
                if (posicaoX<=0) {
                posicaoY = parseInt(Math.random() * 334);
                $("#ladybug").css("left",694);
                $("#ladybug").css("top",posicaoY);
                    
                }
        } //Fim da função ladybug()

        function movecrab() {

            posicaoX = parseInt($("#crab").css("left"));
            $("#crab").css("left",posicaoX-3);
                    
            if (posicaoX<=0) {
                
            $("#crab").css("left",775);
                        
            }
    } // Fim da função moveinimigo2()

        function colisao() {
        var colisao1 = ($("#Sonic").collision($("#ladybug")));
        var colisao2 = ($("#Sonic").collision($("#crab")));

            // jogador com o inimigo1
            
            if (colisao1.length>0) {

                energiaAtual--;
            ladybugX = parseInt($("#ladybug").css("left"));
            ladybugY = parseInt($("#ladybug").css("top"));
            explosao1(ladybugX,ladybugY);
        
            posicaoY = parseInt(Math.random() * 334);
            $("#ladybug").css("left",694);
            $("#ladybug").css("top",posicaoY);
            }

            // jogador com o inimigo2 
    if (colisao2.length>0) {

        energiaAtual--;
        crabX = parseInt($("#crab").css("left"));
        crabY = parseInt($("crab").css("top"));
        explosao2(crabX,crabY);
                
        $("#crab").remove();
            
        reposicionacrab();
            
        }	
    
      
    } //Fim da função colisao()
        
        //Explosão 1
        
            function explosao1(ladybugX,crabY) {

            somPerdido.play();        
	        $("#Game").append("<div id='explosao1'></div");
	        $("#explosao1").css("background-image", "url()");
	        var div=$("#explosao1");
	        div.css("top", crabY);
	        div.css("left", ladybugX);
	        div.animate({width:200, opacity:0}, "slow");
	
	    var tempoExplosao=window.setInterval(removeExplosao, 1000);
	
		    function removeExplosao() {
			
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;
			
		}
		
	} // Fim da função explosao1()

    //Reposiciona Inimigo2
	
	function reposicionacrab() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 5000);
            
            function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
                
                if (fimdejogo==false) {
                
                $("#Game").append("<div id=crab></div");
                
                }
                
            }	
        }	

        //Explosão2
	
	function explosao2(inimigo2X,inimigo2Y) {

        somExplosao.play();
        $("#Game").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
        
            function removeExplosao2() {
                
                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2=null;
                
            }
            
            
        } // Fim da função explosao2()
        
        //Reposiciona Amigo

    function placar() {
	
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
        
    } //fim da função placar()

    //Barra de energia

function energia() {
	
    if (energiaAtual==3) {
        
        $("#energia").css("background-image", "url(imgs/energia3.png)");
    }

    if (energiaAtual==2) {
        
        $("#energia").css("background-image", "url(imgs/energia2.png)");
    }

    if (energiaAtual==1) {
        
        $("#energia").css("background-image", "url(imgs/energia1.png)");
    }

    if (energiaAtual==0) {
        
        $("#energia").css("background-image", "url(imgs/energia0.png)");
        
        //Game Over
        gameOver();
    }

} // Fim da função energia()

//Função GAME OVER
function gameOver() {
	fimdejogo=true;
	musica.pause();
	somGameover.play();
	
	window.clearInterval(jogo.timer);
	jogo.timer=null;
	
	$("#Sonic").remove();
	$("#ladybug").remove();
	$("#crab").remove();
	
	$("#Game").append("<div id='fim'></div>");
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	} // Fim da função gameOver();


} // Fim da função start

//Reinicia o Jogo
		
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
} //Fim da função reiniciaJogo