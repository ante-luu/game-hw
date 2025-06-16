import modalStyles from '../styles/modalStyles.js';
import logger from '../utils/logger.js';
import gameElementStyles from '../styles/gameElementStyles.js';

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
    modal.style.cssText = modalStyles.modal;

    const gameContent = document.createElement('div');
    gameContent.style.cssText = modalStyles.modalContent;
    gameContent.style.maxWidth = '600px';

    // Создаем элементы интерфейса
    const title = document.createElement('h2');
    title.style.cssText = modalStyles.title;
    title.textContent = 'Камень, ножницы, бумага';

    function showRound() {
        // Описание всегда актуально
        let description = gameContent.querySelector('.rps-description');
        if (!description) {
            description = document.createElement('div');
            description.className = 'rps-description';
            description.style.cssText = 'margin-bottom: 15px; color: #202027; font-size: 16px;';
            gameContent.insertBefore(description, title.nextSibling);
        }
        description.textContent = 'Выберите камень, ножницы или бумагу и попробуйте победить компьютер!';
    }

    const statsContainer = document.createElement('div');
    statsContainer.style.cssText = gameElementStyles.statsContainer;

    /**
     * Создает блок статистики
     * @param {string} label - Название статистики
     * @param {string} value - Значение статистики
     * @returns {HTMLElement} Блок статистики
     */
    const createStatBox = (label, value) => {
        const box = document.createElement('div');
        box.style.cssText = gameElementStyles.statBox;
        const labelEl = document.createElement('div');
        labelEl.textContent = label;
        labelEl.style.cssText = gameElementStyles.statLabel;
        const valueEl = document.createElement('div');
        valueEl.textContent = value;
        valueEl.style.cssText = gameElementStyles.statValue;
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
    resultDisplay.style.cssText = gameElementStyles.resultDisplay;
    resultDisplay.style.textAlign = 'center';

    const messageDisplay = document.createElement('div');
    messageDisplay.style.cssText = gameElementStyles.messageDisplay;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = gameElementStyles.buttonsContainer;

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
            
            const category = 'Камень, ножницы, бумага';
            let message;
            if (result === 'Ты победил!') {
                const encouragements = window.gameMessages.encouragements && window.gameMessages.encouragements[category];
                message = encouragements && encouragements.length
                    ? encouragements[Math.floor(Math.random() * encouragements.length)]
                    : window.gameMessages.compliments[Math.floor(Math.random() * window.gameMessages.compliments.length)];
            } else if (result === 'Ничья!') {
                message = 'Ничья! Попробуй еще раз! 🤝';
            } else {
                message = window.gameMessages.motivation[Math.floor(Math.random() * window.gameMessages.motivation.length)];
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
        button.style.cssText = modalStyles.button + 'padding: 15px 30px; font-size: 24px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);';
        if (window.innerWidth <= 768) {
            button.style.cssText = modalStyles.button + 'padding: 10px 10px; font-size: 18px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);';
        }
        button.addEventListener('mouseover', () => {
            button.style.cssText = modalStyles.button + (modalStyles.buttonHover || '') + (window.innerWidth <= 768 ? 'padding: 10px 10px; font-size: 18px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);' : 'padding: 15px 30px; font-size: 24px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);');
        });
        button.addEventListener('mouseout', () => {
            button.style.cssText = modalStyles.button + (window.innerWidth <= 768 ? 'padding: 10px 10px; font-size: 18px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);' : 'padding: 15px 30px; font-size: 24px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);');
        });
        button.addEventListener('click', () => handlePlayerChoice(choice));
        buttonsContainer.appendChild(button);
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    closeButton.style.cssText = modalStyles.button;
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.cssText = modalStyles.button + (modalStyles.buttonHover || '');
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.cssText = modalStyles.button;
    });

    closeButton.addEventListener('click', () => {
        logger.info('Closing Rock Paper Scissors Game');
        document.body.removeChild(modal);
    });

    // Собираем интерфейс
    showRound();
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