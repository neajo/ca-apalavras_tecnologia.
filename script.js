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

const grid = document.getElementById("grid");
const mensagem = document.getElementById("mensagem");

const tamanho = 12;
let matriz = [];
let selecionadas = [];
let encontradas = [];

function criarMatriz() {
  matriz = Array.from({ length: tamanho }, () =>
    Array.from({ length: tamanho }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    )
  );
}

function posicionarPalavras() {
  palavras.forEach(palavra => {
    let colocada = false;
    palavra = palavra.toUpperCase();

    while (!colocada) {
      const dir = Math.floor(Math.random() * 8); // direção 0-7
      const dx = [1, -1, 0, 0, 1, 1, -1, -1][dir];
      const dy = [0, 0, 1, -1, 1, -1, 1, -1][dir];

      let x = Math.floor(Math.random() * tamanho);
      let y = Math.floor(Math.random() * tamanho);

      let ok = true;

      for (let i = 0; i < palavra.length; i++) {
        if (
          x < 0 || y < 0 || x >= tamanho || y >= tamanho ||
          (matriz[y][x] !== undefined && matriz[y][x] !== palavra[i])
        ) {
          ok = false;
          break;
        }
        x += dx;
        y += dy;
      }

      if (ok) {
        x = x - dx * palavra.length;
        y = y - dy * palavra.length;
        for (let i = 0; i < palavra.length; i++) {
          matriz[y][x] = palavra[i];
          x += dx;
          y += dy;
        }
        colocada = true;
      }
    }
  });
}

function desenharMatriz() {
  grid.innerHTML = "";
  for (let y = 0; y < tamanho; y++) {
    for (let x = 0; x < tamanho; x++) {
      const letra = document.createElement("div");
      letra.classList.add("letra");
      letra.dataset.x = x;
      letra.dataset.y = y;
      letra.textContent = matriz[y][x];
      letra.addEventListener("click", selecionarLetra);
      grid.appendChild(letra);
    }
  }
}

function selecionarLetra(e) {
  const el = e.target;
  if (el.classList.contains("certa")) return;

  el.classList.toggle("selecionada");

  const pos = `${el.dataset.x},${el.dataset.y}`;
  const index = selecionadas.indexOf(pos);

  if (index === -1) {
    selecionadas.push(pos);
  } else {
    selecionadas.splice(index, 1);
  }

  verificarPalavra();
}

function verificarPalavra() {
  if (selecionadas.length < 2) return;

  const letras = selecionadas.map(pos => {
    const [x, y] = pos.split(",").map(Number);
    return matriz[y][x];
  });

  const tentativa = letras.join("");
  const tentativaReversa = letras.reverse().join("");

  const palavrasUpper = palavras.map(p => p.toUpperCase());

  if (palavrasUpper.includes(tentativa) || palavrasUpper.includes(tentativaReversa)) {
    selecionadas.forEach(pos => {
      const [x, y] = pos.split(",").map(Number);
      const index = y * tamanho + x;
      grid.children[index].classList.remove("selecionada");
      grid.children[index].classList.add("certa");
    });

    const index = palavrasUpper.indexOf(tentativa);
    const palavraCerta = index !== -1 ? palavras[index] : palavras[palavrasUpper.indexOf(tentativaReversa)];

    if (!encontradas.includes(palavraCerta)) {
      encontradas.push(palavraCerta);
      document.querySelectorAll("#palavras li").forEach(li => {
        if (li.textContent === palavraCerta) {
          li.classList.add("encontrada");
        }
      });
    }

    if (encontradas.length === palavras.length) {
      mensagem.textContent = "🎉 Parabéns! Você encontrou todas as palavras!";
    }

    selecionadas = [];
  }
}

criarMatriz();
posicionarPalavras();
desenharMatriz();
