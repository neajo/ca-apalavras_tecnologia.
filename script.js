const palavras = [
  "tecnologia",
  "proteção",
  "ia",
  "confiança",
  "análise",
  "ti",
  "armazenamento",
  "dados",
  "digital",
  "trabalho"
];

const gridSize = 12;
let matriz = Array(gridSize)
  .fill(null)
  .map(() => Array(gridSize).fill(""));

const grid = document.getElementById("grid");
let selecionadas = [];
let encontradas = [];

function colocarPalavrasNaGrade() {
  palavras.forEach(palavra => {
    palavra = palavra.toUpperCase();
    let colocada = false;

    while (!colocada) {
      const direcao = Math.floor(Math.random() * 8);
      const dx = [1, -1, 0, 0, 1, -1, 1, -1][direcao];
      const dy = [0, 0, 1, -1, 1, 1, -1, -1][direcao];

      let x = Math.floor(Math.random() * gridSize);
      let y = Math.floor(Math.random() * gridSize);

      let cabem = true;

      for (let i = 0; i < palavra.length; i++) {
        let nx = x + dx * i;
        let ny = y + dy * i;

        if (
          nx < 0 || ny < 0 ||
          nx >= gridSize || ny >= gridSize ||
          (matriz[ny][nx] && matriz[ny][nx] !== palavra[i])
        ) {
          cabem = false;
          break;
        }
      }

      if (cabem) {
        for (let i = 0; i < palavra.length; i++) {
          let nx = x + dx * i;
          let ny = y + dy * i;
          matriz[ny][nx] = palavra[i];
        }
        colocada = true;
      }
    }
  });
}

function completarComLetrasAleatorias() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (!matriz[y][x]) {
        matriz[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }
}

function desenharGrade() {
  grid.innerHTML = "";
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const div = document.createElement("div");
      div.classList.add("letra");
      div.textContent = matriz[y][x];
      div.dataset.x = x;
      div.dataset.y = y;
      div.addEventListener("click", clicarLetra);
      grid.appendChild(div);
    }
  }
}

function clicarLetra(e) {
  const el = e.target;
  if (el.classList.contains("certa")) return;

  el.classList.toggle("selecionada");
  const pos = `${el.dataset.x},${el.dataset.y}`;
  const i = selecionadas.indexOf(pos);

  if (i >= 0) {
    selecionadas.splice(i, 1);
  } else {
    selecionadas.push(pos);
  }

  verificarSelecao();
}

function verificarSelecao() {
  const letras = selecionadas.map(pos => {
    const [x, y] = pos.split(",").map(Number);
    return matriz[y][x];
  });

  const palavraTentativa = letras.join("");
  const palavraReversa = letras.reverse().join("");
  const todas = palavras.map(p => p.toUpperCase());

  let encontrada = "";

  if (todas.includes(palavraTentativa)) {
    encontrada = palavraTentativa;
  } else if (todas.includes(palavraReversa)) {
    encontrada = palavraReversa;
  }

  if (encontrada) {
    selecionadas.forEach(pos => {
      const [x, y] = pos.split(",").map(Number);
      const index = y * gridSize + x;
      grid.children[index].classList.remove("selecionada");
      grid.children[index].classList.add("certa");
    });

    document.querySelectorAll("#palavras li").forEach(li => {
      if (li.textContent.toUpperCase() === encontrada) {
        li.classList.add("encontrada");
      }
    });

    encontradas.push(encontrada);
    selecionadas = [];

    if (encontradas.length === palavras.length) {
      document.getElementById("mensagem").textContent = "🎉 Você encontrou todas as palavras!";
    }
  }
}

// EXECUÇÃO
colocarPalavrasNaGrade();
completarComLetrasAleatorias();
desenharGrade();
