function start() { // Inicio da função start()

    const sonic = document.querySelector('#sonic');
    const crab = document.querySelector('#crab');
    const butterdroid = document.querySelector('#butterdroid');
    const jump = document.getElementById('.jump')
    const score = document.querySelector(".score");
    let count = 0;
    

    $("#inicio").hide();

    let jogo = {};

    jogo.timer = setInterval(loop, 30);
	

	function loop() {
	
        movefundo();
        crabCollision()
        butterdroidCollision()

	
	} // Fim da função loop()

    function movefundo() {
	
        esquerda = parseInt($("#Game").css("background-position"));
        $("#Game").css("background-position",esquerda-1);
        
    }// fim da função movefundo()
    
    
    // // Animação do pulo do sonic e de Abaixar

    document.onkeydown = teclado;

    function teclado(e) {
        if (e.keyCode == 40) { //representa a tecla de seta para baixo.
            
            
            sonic.src = './assets/img/sonic-down.png';
            sonic.style.width = '140px';
            sonic.style.height = '110px';
            

            document.onkeyup = teclado = () => { // Faz o sonic voltar a posição de pé ao soltar a tecla de seta para baixo.
                (e.keyCode == 40)
                    sonic.src = './assets/img/sonic.gif';
                    sonic.style.width = '120px';
                    sonic.style.height = '120px';                
       
            }
        }
        else if (e.keyCode == 32) { //representa a tecla tab. 

            somJump.play()
            sonic.classList.add('jump');
            setTimeout(() => {
            sonic.classList.remove('jump');
            }, 1100);
            
        }

    }

    // Colisão com o crab

    function crabCollision() {
        const crabPosition = crab.offsetLeft;
        const sonicPosition = +window.getComputedStyle(sonic).bottom.replace('px' , '')  
        /*Utilizei o getComputedStyle, para poder pegar o style bottom, usei o replace para retirar o 'px' e o '+' na frente do
        window para converter a string em number*/
        


        if (crabPosition <= 120 && crabPosition > 0 && sonicPosition < 85) {
            
            crab.style.animation = 'none';
            crab.style.left = `${crabPosition}px`;

            sonic.style.animation = 'none';
            sonic.style.bottom = `${sonicPosition}px`; // Fazendo o sonic parar na posição onde bateu no crab.
            
            sonic.src = './assets/img/contato-sonic.png'; // quando o sonic bater no crab, a imagem troca.
            sonic.style.width = '160px'; // alterando o tamanho da imagem de contato.

            gameOver()
            
        }
        
    }

    // Colisão com o butterdroid

    function butterdroidCollision() {
        const butterdroidPosition = butterdroid.offsetLeft;
        const sonicPosition = +window.getComputedStyle(sonic).height.replace('px' , '')
        const sonicPositionUp = +window.getComputedStyle(sonic).bottom.replace('px' , '')  
        /*Utilizei o getComputedStyle, para poder pegar o style height e o bottom, usei o replace para retirar o 'px' e o '+' na frente do
        window para converter a string em number*/

        if (butterdroidPosition <= 90 && butterdroidPosition > 0 && sonicPosition > 115 && sonicPositionUp < 170) {

            butterdroid.style.animation = 'none';
            butterdroid.style.left = `${butterdroidPosition}px`;

            sonic.style.animation = 'none';
            sonic.style.bottom = `${sonicPositionUp}px`; // Fazendo o sonic parar na posição onde bateu no butterdroid.

            sonic.src = './assets/img/contato-sonic.png'; // quando o sonic bater no butterdroid, a imagem troca.
            sonic.style.width = '160px'; // alterando o tamanho da imagem de contato.

            

            gameOver()  
            
            
        }
 
    }


    //Música do jogo
    let musica = document.getElementById("musica");
    let somJump = document.getElementById("somJump");
    let somGameOver = document.getElementById("gameOver");
    let somTemaAbertura = document.getElementById("opening_theme");


    //Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();


    // score do jogo
    setInterval(()=> {                    
        count++;
        score.innerHTML = `${count}`;
    }, 100);

    

    //Função GAME OVER
    function gameOver() {

        
        musica.pause();
        somGameOver.play();
        window.clearInterval(jogo.timer);    
        pontuação()
    }

    function pontuação () {
        
        if (gameOver) {
            alert(`Game Over! Seu score foi: ${count} \nQuer tentar outra vez?`);
            location.reload();
        }
    }
    
    
}
