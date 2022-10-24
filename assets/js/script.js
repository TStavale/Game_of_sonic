


    /* Musica do jogo */
    var musica=document.getElementById("song_game");
    
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();