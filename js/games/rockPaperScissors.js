import modalStyles from '../styles/modalStyles.js';
import logger from '../utils/logger.js';

/**
 * Игра "Камень, ножницы, бумага"
 * 
 * Правила:
 * - Игрок выбирает один из трех вариантов: камень, ножницы или бумага
 * - Компьютер делает свой выбор случайным образом
 * - Камень побеждает ножницы, ножницы побеждают бумагу, бумага побеждает камень
 * - При одинаковом выборе объявляется ничья
 * - Ведется подсчет побед, поражений и ничьих
 * 
 * @returns {void}
 */
export function startRockPaperScissorsGame() {
    logger.info('Starting Rock Paper Scissors Game');
    
    let playerScore = 0;
    let computerScore = 0;
    let draws = 0;
    let totalGames = 0;
    
    const choices = ['камень', 'ножницы', 'бумага'];
    const emojis = {
        'камень': '🗿',
        'ножницы': '✂️',
        'бумага': '📜'
    };
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    Object.assign(modal.style, modalStyles.modal);

    const gameContent = document.createElement('div');
    Object.assign(gameContent.style, {
        ...modalStyles.content,
        maxWidth: '600px'
    });

    // Создаем элементы интерфейса
    const title = document.createElement('h2');
    Object.assign(title.style, modalStyles.title);
    title.textContent = 'Камень, ножницы, бумага';

    const statsContainer = document.createElement('div');
    statsContainer.style.cssText = `
        display: flex;
        justify-content: space-around;
        margin: 20px 0;
        flex-wrap: wrap;
        gap: 20px;
    `;

    /**
     * Создает блок статистики
     * @param {string} label - Название статистики
     * @param {string} value - Значение статистики
     * @returns {HTMLElement} Блок статистики
     */
    const createStatBox = (label, value) => {
        const box = document.createElement('div');
        box.style.cssText = `
            text-align: center;
            padding: 10px;
            min-width: 120px;
        `;
        
        const labelEl = document.createElement('div');
        labelEl.textContent = label;
        labelEl.style.cssText = `
            font-size: ${window.innerWidth <= 768 ? '14px' : '16px'};
            color: #666;
            margin-bottom: 5px;
            font-family: Montserrat;
        `;
        
        const valueEl = document.createElement('div');
        valueEl.textContent = value;
        valueEl.style.cssText = `
            font-size: ${window.innerWidth <= 768 ? '18px' : '24px'};
            font-weight: bold;
            color: #202027;
            font-family: Montserrat;
        `;
        
        box.appendChild(labelEl);
        box.appendChild(valueEl);
        return box;
    };

    const playerScoreBox = createStatBox('Твои победы', '0');
    const computerScoreBox = createStatBox('Победы компьютера', '0');
    const drawsBox = createStatBox('Ничьи', '0');

    statsContainer.appendChild(playerScoreBox);
    statsContainer.appendChild(computerScoreBox);
    statsContainer.appendChild(drawsBox);

    const resultDisplay = document.createElement('div');
    Object.assign(resultDisplay.style, {
        ...modalStyles.message,
        fontSize: '24px',
        minHeight: '36px'
    });

    const messageDisplay = document.createElement('div');
    Object.assign(messageDisplay.style, {
        ...modalStyles.message,
        fontSize: '18px',
        minHeight: '27px',
        color: '#666'
    });

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: ${window.innerWidth <= 768 ? '10px' : '20px'};
        flex-wrap: wrap;
    `;

    /**
     * Определяет победителя раунда
     * @param {string} playerChoice - Выбор игрока
     * @param {string} computerChoice - Выбор компьютера
     * @returns {string} Результат раунда
     */
    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'Ничья!';
        }
        
        if (
            (playerChoice === 'камень' && computerChoice === 'ножницы') ||
            (playerChoice === 'ножницы' && computerChoice === 'бумага') ||
            (playerChoice === 'бумага' && computerChoice === 'камень')
        ) {
            return 'Ты победил!';
        }
        
        return 'Компьютер победил!';
    }

    /**
     * Обрабатывает ход игрока
     * @param {string} choice - Выбор игрока
     */
    function handlePlayerChoice(choice) {
        logger.info('Player made a choice', { choice });
        
        try {
            const computerChoice = choices[Math.floor(Math.random() * 3)];
            logger.info('Computer made a choice', { computerChoice });
            
            const result = determineWinner(choice, computerChoice);
            totalGames++;
            
            if (result === 'Ничья!') {
                draws++;
                drawsBox.lastChild.textContent = draws;
            } else if (result === 'Ты победил!') {
                playerScore++;
                playerScoreBox.lastChild.textContent = playerScore;
            } else {
                computerScore++;
                computerScoreBox.lastChild.textContent = computerScore;
            }
            
            resultDisplay.textContent = `${emojis[choice]} vs ${emojis[computerChoice]} - ${result}`;
            
            // Выбираем сообщение в зависимости от результата
            let message;
            if (result === 'Ты победил!') {
                message = gameMessages.compliments[Math.floor(Math.random() * gameMessages.compliments.length)];
            } else if (result === 'Ничья!') {
                message = 'Ничья! Попробуй еще раз! 🤝';
            } else {
                message = gameMessages.motivation[Math.floor(Math.random() * gameMessages.motivation.length)];
            }
            
            messageDisplay.textContent = message;
            logger.info('Round result', { result, message });
        } catch (error) {
            logger.error('Error handling player choice', error);
            messageDisplay.textContent = 'Произошла ошибка. Попробуй еще раз!';
        }
    }

    // Создаем кнопки выбора
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = `${emojis[choice]} ${choice}`;
        Object.assign(button.style, {
            ...modalStyles.button,
            padding: window.innerWidth <= 768 ? '10px 10px' : '15px 30px',
            fontSize: window.innerWidth <= 768 ? '18px' : '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        });

        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });

        button.addEventListener('click', () => handlePlayerChoice(choice));
        buttonsContainer.appendChild(button);
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    Object.assign(closeButton.style, {
        ...modalStyles.button,
        marginTop: '20px'
    });

    closeButton.addEventListener('click', () => {
        logger.info('Closing Rock Paper Scissors Game');
        document.body.removeChild(modal);
    });

    // Собираем интерфейс
    gameContent.appendChild(title);
    gameContent.appendChild(statsContainer);
    gameContent.appendChild(resultDisplay);
    gameContent.appendChild(messageDisplay);
    gameContent.appendChild(buttonsContainer);
    gameContent.appendChild(closeButton);
    modal.appendChild(gameContent);
    document.body.appendChild(modal);

    logger.info('Rock Paper Scissors Game initialized successfully');
}