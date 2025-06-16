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
    // Адаптивная ширина модального окна для мобильных
    if (window.innerWidth <= 768) {
        gameContent.style.width = '100vw';
        gameContent.style.maxWidth = '100vw';
        gameContent.style.padding = '16px 0 16px 0';
        gameContent.style.borderRadius = '0';
    }

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

    function isMobile() {
        return window.innerWidth <= 768;
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
            // Адаптивный результат
            const emojiFontSize = isMobile() ? '1.5em' : '2.2em';
            const emojiGap = isMobile() ? '2px' : '10px';
            const resultFontSize = isMobile() ? '0.9em' : '1.1em';
            resultDisplay.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; font-size: ${emojiFontSize}; gap: ${emojiGap}; margin-bottom: 2px;">
                <span>${emojis[choice]}</span>
                <span>${emojis[computerChoice]}</span>
              </div>
              <div style="text-align: center; font-size: ${resultFontSize}; margin: 0;">${result}</div>
            `;
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
    const smallButtonStyleDesktop = modalStyles.button +
      'width: 80px; min-width: 0; padding: 6px 0; font-size: 15px; margin: 0; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); flex-shrink: 1; transition: background 0.2s, color 0.2s;';

    const smallButtonStyleMobile = modalStyles.button +
      'width: 28vw; min-width: 0; max-width: 32vw; padding: 3px 0; font-size: 11px; margin: 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); flex-shrink: 1; transition: background 0.2s, color 0.2s;';

    const smallButtonStyle = isMobile() ? smallButtonStyleMobile : smallButtonStyleDesktop;

    const buttonRow = document.createElement('div');
    buttonRow.style.display = 'flex';
    buttonRow.style.justifyContent = 'center';
    buttonRow.style.gap = isMobile() ? '6px' : '16px';
    buttonRow.style.margin = '0 auto 12px auto';
    buttonRow.style.maxWidth = '100%';

    buttonsContainer.innerHTML = '';
    choices.forEach((choice) => {
        const button = document.createElement('button');
        button.textContent = `${emojis[choice]} ${choice}`;
        button.style.cssText = smallButtonStyle;
        button.style.background = '#202027';
        button.style.color = 'white';
        button.addEventListener('mouseover', () => {
            button.style.background = '#33d17a';
            button.style.color = '#202027';
        });
        button.addEventListener('mouseout', () => {
            button.style.background = '#202027';
            button.style.color = 'white';
        });
        button.addEventListener('click', () => handlePlayerChoice(choice));
        buttonRow.appendChild(button);
    });
    buttonsContainer.appendChild(buttonRow);

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