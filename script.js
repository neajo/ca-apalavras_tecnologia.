document.addEventListener('DOMContentLoaded', function() {
    // Palavras para encontrar e suas explicações
    const words = [
        { word: "TECNOLOGIA", explanation: "Tecnologia: Conjunto de técnicas e processos usados no armazenamento, recuperação e gerenciamento de dados em bancos de dados." },
        { word: "PROTECAO", explanation: "Proteção: Medidas de segurança implementadas para salvaguardar os dados contra acesso não autorizado ou perda." },
        { word: "IA", explanation: "IA (Inteligência Artificial): Tecnologia cada vez mais usada em bancos de dados para análise preditiva e automatização de processos." },
        { word: "CONFIANCA", explanation: "Confiança: Característica essencial em sistemas de banco de dados, garantindo que os dados sejam precisos e disponíveis quando necessário." },
        { word: "ANALISE", explanation: "Análise: Processo de examinar dados para extrair insights valiosos, uma das principais funções dos bancos de dados." },
        { word: "TI", explanation: "TI (Tecnologia da Informação): Área que engloba os sistemas de banco de dados e sua infraestrutura." },
        { word: "ARMAZENAMENTO", explanation: "Armazenamento: Função primária de um banco de dados - guardar informações de forma organizada e acessível." },
        { word: "DADOS", explanation: "Dados: Matéria-prima dos bancos de dados, informações brutas que são processadas e armazenadas." },
        { word: "DIGITAL", explanation: "Digital: Forma como os dados são representados e manipulados em bancos de dados modernos." },
        { word: "TRABALHO", explanation: "Trabalho: Bancos de dados facilitam o trabalho colaborativo permitindo que múltiplos usuários acessem e atualizem informações." }
    ];

    // Configurações da grade
    const gridSize = 15;
    let grid = [];
    let selectedCells = [];
    let foundWords = [];
    let isMouseDown = false;

    // Elementos DOM
    const wordSearchGrid = document.getElementById('word-search');
    const wordsToFindElement = document.getElementById('words-to-find');
    const foundWordsElement = document.getElementById('found-words');
    const wordExplanationsElement = document.getElementById('word-explanations');
    const resetButton = document.getElementById('reset-btn');

    // Inicializar o jogo
    function initGame() {
        // Limpar arrays
        grid = [];
        selectedCells = [];
        foundWords = [];
        
        // Criar grade vazia
        createEmptyGrid();
        
        // Inserir palavras na grade
        insertWords();
        
        // Preencher espaços vazios com letras aleatórias
        fillEmptySpaces();
        
        // Renderizar grade
        renderGrid();
        
        // Atualizar lista de palavras para encontrar
        updateWordsToFind();
        
        // Adicionar explicações
        addExplanations();
        
        // Atualizar contador
        updateFoundWordsCount();
    }

    // Criar grade vazia
    function createEmptyGrid() {
        for (let i = 0; i < gridSize; i++) {
            grid[i] = [];
            for (let j = 0; j < gridSize; j++) {
                grid[i][j] = '';
            }
        }
    }

    // Inserir palavras na grade
    function insertWords() {
        words.forEach(wordObj => {
            const word = wordObj.word.toUpperCase().replace(/[^A-Z]/g, '');
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < 100) {
                attempts++;
                
                // Escolher direção aleatória (0: horizontal, 1: vertical, 2: diagonal)
                const direction = Math.floor(Math.random() * 3);
                
                // Escolher posição inicial aleatória
                let row, col;
                
                if (direction === 0) { // Horizontal
                    row = Math.floor(Math.random() * gridSize);
                    col = Math.floor(Math.random() * (gridSize - word.length));
                } else if (direction === 1) { // Vertical
                    row = Math.floor(Math.random() * (gridSize - word.length));
                    col = Math.floor(Math.random() * gridSize);
                } else { // Diagonal
                    row = Math.floor(Math.random() * (gridSize - word.length));
                    col = Math.floor(Math.random() * (gridSize - word.length));
                }
                
                // Verificar se a palavra cabe na posição escolhida
                let canPlace = true;
                const cellsToCheck = [];
                
                for (let i = 0; i < word.length; i++) {
                    let currentRow, currentCol;
                    
                    if (direction === 0) { // Horizontal
                        currentRow = row;
                        currentCol = col + i;
                    } else if (direction === 1) { // Vertical
                        currentRow = row + i;
                        currentCol = col;
                    } else { // Diagonal
                        currentRow = row + i;
                        currentCol = col + i;
                    }
                    
                    // Verificar se a célula está vazia ou contém a mesma letra
                    if (grid[currentRow][currentCol] !== '' && grid[currentRow][currentCol] !== word[i]) {
                        canPlace = false;
                        break;
                    }
                    
                    cellsToCheck.push({ row: currentRow, col: currentCol, letter: word[i] });
                }
                
                // Se puder colocar, inserir a palavra
                if (canPlace) {
                    cellsToCheck.forEach(cell => {
                        grid[cell.row][cell.col] = cell.letter;
                    });
                    placed = true;
                    
                    // Registrar a palavra e suas posições
                    foundWords.push({
                        word: word,
                        cells: cellsToCheck,
                        found: false
                    });
                }
            }
        });
    }

    // Preencher espaços vazios com letras aleatórias
    function fillEmptySpaces() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === '') {
                    grid[i][j] = letters.charAt(Math.floor(Math.random() * letters.length));
                }
            }
        }
    }

    // Renderizar grade no DOM
    function renderGrid() {
        wordSearchGrid.innerHTML = '';
        
        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement('tr');
            
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('td');
                cell.textContent = grid[i][j];
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                // Eventos de seleção
                cell.addEventListener('mousedown', handleMouseDown);
                cell.addEventListener('mouseenter', handleMouseEnter);
                cell.addEventListener('mouseup', handleMouseUp);
                
                row.appendChild(cell);
            }
            
            wordSearchGrid.appendChild(row);
        }
    }

    // Atualizar lista de palavras para encontrar
    function updateWordsToFind() {
        const wordsList = words.map(wordObj => wordObj.word).join(', ');
        wordsToFindElement.textContent = wordsList;
    }

    // Adicionar explicações das palavras
    function addExplanations() {
        wordExplanationsElement.innerHTML = '';
        
        words.forEach(wordObj => {
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'word-explanation';
            explanationDiv.innerHTML = `<strong>${wordObj.word}:</strong> ${wordObj.explanation}`;
            wordExplanationsElement.appendChild(explanationDiv);
        });
    }

    // Atualizar contador de palavras encontradas
    function updateFoundWordsCount() {
        const foundCount = foundWords.filter(word => word.found).length;
        foundWordsElement.textContent = `${foundCount}/${words.length}`;
    }

    // Manipuladores de eventos
    function handleMouseDown(e) {
        isMouseDown = true;
        selectedCells = [];
        toggleCellSelection(e.target);
        e.preventDefault(); // Evitar seleção de texto
    }

    function handleMouseEnter(e) {
        if (isMouseDown) {
            toggleCellSelection(e.target);
        }
    }

    function handleMouseUp() {
        isMouseDown = false;
        checkSelectedWord();
    }

    // Alternar seleção de célula
    function toggleCellSelection(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        // Verificar se a célula já está selecionada
        const index = selectedCells.findIndex(c => c.row === row && c.col === col);
        
        if (index === -1) {
            // Se não estiver selecionada, adicionar
            selectedCells.push({ row, col, letter: cell.textContent });
            cell.classList.add('selected');
        } else {
            // Se já estiver selecionada, remover
            selectedCells.splice(index, 1);
            cell.classList.remove('selected');
        }
    }

    // Verificar se as células selecionadas formam uma palavra
    function checkSelectedWord() {
        if (selectedCells.length < 2) {
            clearSelection();
            return;
        }
        
        // Ordenar células selecionadas
        selectedCells.sort((a, b) => {
            if (a.row !== b.row) return a.row - b.row;
            return a.col - b.col;
        });
        
        // Verificar direção da seleção
        const firstCell = selectedCells[0];
        const lastCell = selectedCells[selectedCells.length - 1];
        
        let direction;
        if (firstCell.row === lastCell.row) {
            direction = 'horizontal';
        } else if (firstCell.col === lastCell.col) {
            direction = 'vertical';
        } else if (Math.abs(firstCell.row - lastCell.row) === Math.abs(firstCell.col - lastCell.col)) {
            direction = 'diagonal';
        } else {
            clearSelection();
            return;
        }
        
        // Verificar se todas as células estão na mesma linha/coluna/diagonal
        let isValid = true;
        for (let i = 1; i < selectedCells.length; i++) {
            const prev = selectedCells[i - 1];
            const curr = selectedCells[i];
            
            if (direction === 'horizontal' && curr.row !== prev.row) {
                isValid = false;
                break;
            } else if (direction === 'vertical' && curr.col !== prev.col) {
                isValid = false;
                break;
            } else if (direction === 'diagonal' && 
                      Math.abs(curr.row - prev.row) !== Math.abs(curr.col - prev.col)) {
                isValid = false;
                break;
            }
        }
        
        if (!isValid) {
            clearSelection();
            return;
        }
        
        // Construir palavra a partir das células selecionadas
        const selectedWord = selectedCells.map(cell => cell.letter).join('');
        
        // Verificar se a palavra está na lista
        const foundWord = foundWords.find(word => 
            word.word === selectedWord || 
            word.word === selectedWord.split('').reverse().join('')
        );
        
        if (foundWord && !foundWord.found) {
            // Marcar palavra como encontrada
            foundWord.found = true;
            
            // Marcar células como encontradas
            const cells = document.querySelectorAll('td');
            selectedCells.forEach(cell => {
                cells.forEach(td => {
                    if (parseInt(td.dataset.row) === cell.row && 
                        parseInt(td.dataset.col) === cell.col) {
                        td.classList.remove('selected');
                        td.classList.add('found');
                    }
                });
            });
            
            // Atualizar contador
            updateFoundWordsCount();
            
            // Verificar se todas as palavras foram encontradas
            if (foundWords.every(word => word.found)) {
                setTimeout(() => {
                    alert('Parabéns! Você encontrou todas as palavras!');
                }, 300);
            }
        } else {
            clearSelection();
        }
    }

    // Limpar seleção
    function clearSelection() {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.classList.remove('selected');
        });
        selectedCells = [];
    }

    // Reiniciar jogo
    resetButton.addEventListener('click', initGame);

    // Iniciar o jogo
    initGame();
});
