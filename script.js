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
                    } el
