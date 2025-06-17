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
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'center';
    buttonsContainer.style.gap = '20px';
    buttonsContainer.style.marginTop = '20px';
    buttonsContainer.style.flexWrap = 'wrap';

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
            const emojiResultStyle = isMobile()
              ? 'display: flex; align-items: center; justify-content: center; font-size: 2em; gap: 80px; margin-bottom: 2px;'
              : 'display: flex; align-items: center; justify-content: center; font-size: 3.4rem; gap: 97px; margin-bottom: 2px;';
            resultDisplay.innerHTML = `
              <div style="${emojiResultStyle}">
                <span>${emojis[choice]}</span>
                <span>${emojis[computerChoice]}</span>
              </div>
              <div style="text-align: center; font-size: ${resultFontSize}; margin: 0;">${result}</div>
            `;
            const category = 'Камень, ножницы, бумага';
            let message;
            if (result === 'Ты победил!') {
                // Получаем похвалу для категории или общую похвалу
                const encouragements = window.gameMessages.encouragements && window.gameMessages.encouragements[category];
                const randomEncouragement = encouragements && encouragements.length
                    ? encouragements[Math.floor(Math.random() * encouragements.length)]
                    : window.gameMessages.compliments[Math.floor(Math.random() * window.gameMessages.compliments.length)];
                
                // Получаем цитату для категории или общую цитату
                const categoryQuotes = window.gameMessages.quotesByCategory && window.gameMessages.quotesByCategory[category];
                const randomQuote = categoryQuotes && categoryQuotes.length
                    ? categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
                    : window.gameMessages.quotes[Math.floor(Math.random() * window.gameMessages.quotes.length)];

                const quoteText = randomQuote && typeof randomQuote === 'object' 
                    ? `<div style="margin-top: 15px; font-size: 16px; color: #666;">
                        ${randomQuote.text}${randomQuote.emoji ? ' ' + randomQuote.emoji : ''}
                        ${randomQuote.author ? '<br><span style="font-size: 0.9em; color: #888;">— ' + randomQuote.author + '</span>' : ''}
                       </div>`
                    : randomQuote;
                message = `
                    <div style="margin-top: 15px; font-size: 18px; color: #33d17a;">
                        ${result} 🎉
                    </div>
                    <div style="margin-top: 15px; font-size: 16px; color: #666;">
                        ${randomEncouragement}
                    </div>
                    <div style="margin-top: 15px; font-size: 16px; color: #666;">
                        ${quoteText}
                    </div>`;
            } else if (result === 'Ничья!') {
                message = 'Ничья! Попробуй еще раз! 🤝';
            } else {
                const randomMotivation = window.gameMessages.motivation[Math.floor(Math.random() * window.gameMessages.motivation.length)];
                message = `
                    <div style="color: #f44336; font-weight: bold;">${result}</div>
                    <div style="margin-top: 10px; color: #202027;">${randomMotivation}</div>
                `;
            }
            messageDisplay.innerHTML = message;
            logger.info('Round result', { result, message });
        } catch (error) {
            logger.error('Error handling player choice', error);
            messageDisplay.textContent = 'Произошла ошибка. Попробуй еще раз!';
        }
    }

    // Используем существующие массивы choices и emojis
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.innerHTML = `<span class="emoji-only">${emojis[index]}</span>`;
        button.style.padding = '20px';
        button.style.fontSize = '2.5em';
        button.style.border = '2px solid #33d17a';
        button.style.borderRadius = '50%';
        button.style.backgroundColor = '#ffffff';
        button.style.color = '#202027';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.3s ease';
        button.style.width = '80px';
        button.style.height = '80px';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.title = choice; // Добавляем подсказку при наведении

        // Добавляем эффект при наведении
        button.onmouseover = () => {
            button.style.backgroundColor = '#33d17a';
            button.style.color = '#ffffff';
            button.style.transform = 'scale(1.1)';
        };
        button.onmouseout = () => {
            button.style.backgroundColor = '#ffffff';
            button.style.color = '#202027';
            button.style.transform = 'scale(1)';
        };

        // Добавляем медиа-запрос для планшетов
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const updateButtonStyle = (e) => {
            if (e.matches) {
                // Стили для планшетов
                button.style.padding = '15px';
                button.style.fontSize = '2em';
                button.style.width = '60px';
                button.style.height = '60px';
            } else {
                // Стили для десктопа
                button.style.padding = '20px';
                button.style.fontSize = '2.5em';
                button.style.width = '80px';
                button.style.height = '80px';
            }
        };

        // Применяем стили сразу и добавляем слушатель
        updateButtonStyle(mediaQuery);
        mediaQuery.addListener(updateButtonStyle);

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
    gameContent.appendChild(buttonsContainer);
    gameContent.appendChild(messageDisplay);
    gameContent.appendChild(closeButton);
    modal.appendChild(gameContent);
    document.body.appendChild(modal);

    logger.info('Rock Paper Scissors Game initialized successfully');
}