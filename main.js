			defineIntervalos();
			/*-------------------- DEFINE INTERVALOS ---------------------*/
			function defineIntervalos() {
				i =	setInterval(ataqueInimigo, 500);
				j = setInterval(carregaEnergia, 30);
				k = setInterval(animar, 90);
				l = setInterval(folegoJogador, 30);
			}
			
			/*-------------------- ATAQUE AO INIMIGO E CONSEQUENCIAS ---------------------*/
			function atacar() {
				var som = document.getElementById('sd1');
				var energia1 = document.getElementById('energia1');
				var forca2 = document.getElementById('forca2');
				var folego = document.getElementById('folego1');
				if (energia1.value == 100) {
					estado1 = 'f';
					mudaBotao("fogo",0);
					som.innerHTML = '<audio src="fire-sound.mp3" type="audio/mpeg" autoplay></audio>';		
					if (folego.value < 33) {
						var nivel = 1;
					}
					if (folego.value >= 33 && folego.value < 66) {
						var nivel = 2;
					}
					if (folego.value >= 66 && folego.value < 99) {
						var nivel = 3;
					}
					if (folego.value >= 99) {
						var nivel = 4;
					}
					forca2.value -= 3*nivel;
					energia1.value -= 30*nivel;
					folego.value = 0;
				}
				if (forca2.value == 0) {
					var campo = document.getElementById('mensagem');
					var controle = document.getElementById('controle');
					campo.innerHTML = '<p align="center"><font size="7"><b>VOCÊ VENCEU!!!<br/>QUER JOGAR NOVAMENTE?</b><br/><img id="denovo" width="70%" src="img/recomecar.svg" onclick="reiniciarJogo();"/></font></p>';
					controle.innerHTML = '';
					clearInterval(i);
				}
			}
			
			/*-----------------ATAQUE EFETUADO PELO INIMIGO E CONSEQUENCIAS-------------------------*/
			function ataqueInimigo() {
				var nivel = Math.floor((Math.random() * 6));
				var som = document.getElementById('sd2');
				var energia2 = document.getElementById('energia2');
				var forca1 = document.getElementById('forca1');
				if (energia2.value == 100 && nivel < 5) {
					forca1.value -= 3*nivel;
					energia2.value -= 30*nivel;
					estado2 = 'f';
					som.innerHTML = '<audio src="fire-sound.mp3" type="audio/mpeg" autoplay></audio>';
				}
				if (forca1.value == 0) {
					var campo = document.getElementById('mensagem');
					var controle = document.getElementById('controle');
					campo.innerHTML = '<p align="center"><font size="7"><b>VOCÊ PERDEU...<br/>QUER TENTAR MAIS UMA VEZ?</b><br/><img id="denovo" width="70%" src="img/recomecar.svg" onclick="reiniciarJogo();"/></font></p>';
					controle.innerHTML = '';
					som.innerHTML = '';
					estado2 = 'n';
					clearInterval(i);
					clearInterval(l);
				}
			}
			/*-------------------------RECARGA CONSTANTE DAS BARRAS DE ENERGIA----------------------- */
			function carregaEnergia() {
				var som1 = document.getElementById('sd1');
				var som2 = document.getElementById('sd2');
				var energia1 = document.getElementById('energia1');
				var energia2 = document.getElementById('energia2');
				energia1.value++;
				energia2.value++;
				if (energia1.value == 100) {
					estado1 = 'n';
					som1.innerHTML = '';
					mudaBotao("fogo",1);
				}
				if (energia2.value == 100) {
					estado2 = 'n';
					som2.innerHTML = '';
				}
			}
			/*-------------------------------ANIMACOES PERFIL---------------------------------------*/
			var x = 0;
			var r = false;
			var estado1 = 'n';
			var estado2 = 'n';
			function animar() {
				dragao1 = document.getElementById('d1');
				dragao2 = document.getElementById('d2');
				dragao1.src = ('img/d1'+estado1+x+'.svg');
				dragao2.src = ('img/d2'+estado2+x+'.svg');
				if (r == false && x < 9) {
					x++;
				}
				if (r == true && x >= 0) {
					x--;
				}
				if (x == 9 ) {
					r = true;
				}
				if (x == 0) {
					r = false;
				}
			}
			/*-----------------------------FOLEGO DO DRAGAO JOGADOR--------------------------------*/
			var rf = false;
			function folegoJogador() {
			var folego = document.getElementById('folego1');
			if (rf == false && folego.value < 100) {
					folego.value += 5;
				}
				if (rf == true && folego.value > 0) {
					folego.value -= 5;
				}
				if (folego.value == 100 ) {
					rf = true;
				}
				if (folego.value == 0) {
					rf = false;
				}
			}
			/*-----------------------------APARÊNCIA DO BOTÂO DE ATAQUE--------------------------------*/
			function mudaBotao(b, num) {
				if (b == 'fogo') {
					botao = document.getElementById('botao');
					botao.src = ('img/bf'+num+'.svg');
				}
				if (b == 'denovo') {
					botao = document.getElementById('denovo');
					botao.src = ('img/recomecar'+num+'.svg');
				}
			}
			/*----------------------------- REINICIA O JOGO --------------------------------*/
			function reiniciarJogo() {
				clearInterval(i);
				clearInterval(j);
				clearInterval(k);
				clearInterval(l);
				var campo = document.getElementById('mensagem');
				var controle = document.getElementById('controle');
				campo.innerHTML = '';
				controle.innerHTML = '<img src="img/bf0.svg" id="botao" onclick="atacar()" width="100%"/>';
				var forca1 = document.getElementById('forca1');
				var forca2 = document.getElementById('forca2');
				forca1.value = 100;
				forca2.value = 100;
				defineIntervalos();
			}
