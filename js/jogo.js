// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função auxiliar para alterar visibilidade de um elemento
function alternarVisibilidade(elemento, visivel) {
  elemento.className = visivel ? 'visivel' : 'invisivel';
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML = 
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Função para remover imagem do Smile se existir
function removerImagemSmile() {
  const imagem = document.getElementById("imagem");
  if (imagem) imagem.remove();
}

// Função para reiniciar os valores e o jogo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  alternarVisibilidade(btnJogarNovamente, true);
  alternarVisibilidade(btnReiniciar, false);
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;
  const divis = document.getElementsByTagName("div");

  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2) {
      divis[i].className = "inicial";
    }
  }

  removerImagemSmile();
}

// Função chamada quando o jogador acerta
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  obj.appendChild(img);
}

// Função que verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas === 3) {
      alternarVisibilidade(btnJogarNovamente, false);
      alternarVisibilidade(btnReiniciar, true);
    }

    const sorteado = Math.floor(Math.random() * 3);

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
