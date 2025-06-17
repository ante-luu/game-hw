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
        gameContent.style.padding = '16px 16px 16px 16px';
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
            const emojiResultStyle = isMobile()
              ? 'display: flex; align-items: center; justify-content: center; font-size:4em; gap: 100px; margin-bottom: 2px;'
              : 'display: flex; align-items: center; justify-content: center; font-size: 5rem; gap: 100px; margin-bottom: 2px;';
            resultDisplay.innerHTML = `
              <div style="${emojiResultStyle}">
                <span>${emojis[choice]}</span>
                <span>${emojis[computerChoice]}</span>
              </div>
            `;
            const category = 'Камень, ножницы, бумага';
            let message;
            let bgColor = '#e8f5e9';
            let resultColor = '#33d17a';
            let resultEmoji = '🎉';
            if (result === 'Ты победил!') {
                const encouragements = window.gameMessages.encouragements && window.gameMessages.encouragements[category];
                const randomEncouragement = encouragements && encouragements.length
                    ? encouragements[Math.floor(Math.random() * encouragements.length)]
                    : window.gameMessages.compliments[Math.floor(Math.random() * window.gameMessages.compliments.length)];
                const categoryQuotes = window.gameMessages.quotesByCategory && window.gameMessages.quotesByCategory[category];
                const randomQuote = categoryQuotes && categoryQuotes.length
                    ? categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
                    : window.gameMessages.quotes[Math.floor(Math.random() * window.gameMessages.quotes.length)];
                const quoteText = randomQuote && typeof randomQuote === 'object' 
                    ? `<div style="margin-top: 15px; font-size: 16px; color: #666;">
                        ${randomQuote.text}${randomQuote.emoji ? ' ' + randomQuote.emoji : ''}
                        ${randomQuote.author ? '<br><span style=\"font-size: 0.9em; color: #888;\">— ' + randomQuote.author + '</span>' : ''}
                       </div>`
                    : randomQuote;
                message = `
                    <div style="margin-top: 15px; font-size: 18px; color: ${resultColor};">
                        ${result} ${resultEmoji}
                    </div>
                    <div style="margin-top: 15px; font-size: 16px; color: #666;">
                        ${randomEncouragement.text ? randomEncouragement.text : randomEncouragement}
                        ${randomEncouragement.emoji ? ' ' + randomEncouragement.emoji : ''}
                    </div>
                    <div style="margin-top: 15px; font-size: 16px; color: #666;">
                        ${quoteText}
                    </div>`;
                messageDisplay.style.background = bgColor;
            } else if (result === 'Ничья!') {
                resultColor = '#888';
                resultEmoji = '🤝';
                bgColor = '#f5f5f5';
                const randomMotivation = window.gameMessages.motivation[Math.floor(Math.random() * window.gameMessages.motivation.length)];
                message = `
                    <div style="margin-top: 15px; font-size: 18px; color: ${resultColor};">
                        ${result} ${resultEmoji}
                    </div>
                    <div style="margin-top: 15px; font-size: 16px; color: #666;">
                        ${randomMotivation.text ? randomMotivation.text : randomMotivation}
                        ${randomMotivation.emoji ? ' ' + randomMotivation.emoji : ''}
                    </div>`;
                messageDisplay.style.background = bgColor;
            } else {
                resultColor = '#ff0000';
                resultEmoji = '😢';
                bgColor = '#ffebee';
                const randomMotivation = window.gameMessages.motivation[Math.floor(Math.random() * window.gameMessages.motivation.length)];
                message = `
                    <div style="margin-top: 15px; font-size: 18px; color: ${resultColor};">
                        ${result} ${resultEmoji}
                    </div>
                    <div style="margin-top: 15px; font-size: 16px; color: #666;">
                        ${randomMotivation.text ? randomMotivation.text : randomMotivation}
                        ${randomMotivation.emoji ? ' ' + randomMotivation.emoji : ''}
                    </div>`;
                messageDisplay.style.background = bgColor;
            }
            messageDisplay.innerHTML = message;
        } catch (error) {
            logger.error('Error in handlePlayerChoice', error);
            messageDisplay.innerHTML = `<div style="color: #ff4444;">Произошла ошибка. Попробуйте еще раз.</div>`;
            messageDisplay.style.background = '#ffebee';
        }
    }

    // Создаем кнопки выбора
    const buttonRow = document.createElement('div');
    buttonRow.style.display = 'flex';
    buttonRow.style.justifyContent = 'center';
    buttonRow.style.gap = isMobile() ? '60px' : '80px';
    buttonRow.style.margin = '0 auto 12px auto';
    buttonRow.style.maxWidth = '100%';

    buttonsContainer.innerHTML = '';
    // Добавляю CSS для скрытия текста на мобильных, 
    if (isMobile() && !document.getElementById('hide-btn-text-style')) {
        const style = document.createElement('style');
        style.id = 'hide-btn-text-style';
        style.textContent = '.btn-text { display: none !important; }';
        document.head.appendChild(style);
    }
    choices.forEach((choice) => {
        const btn = document.createElement('button');
        btn.innerHTML = emojis[choice];
        // Базовые стили для кнопки
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.background = '#fff';
        btn.style.border = '2px solid #33d17a';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'transform 0.2s, background 0.2s';
        btn.style.borderRadius = '30%';
        // Функция для адаптивных размеров
        function updateButtonSize() {
            if (window.innerWidth <= 600) { // Мобильные
                btn.style.width = '90px';
                btn.style.height = '90px';
                btn.style.fontSize = '3em';
            } else if (window.innerWidth <= 1024) { // Планшеты
                btn.style.width = '90px';
                btn.style.height = '90px';
                btn.style.fontSize = '3em';
            } else { // ПК
                btn.style.width = '130px';
                btn.style.height = '130px';
                btn.style.fontSize = '3.5em';
            }
        }
        updateButtonSize();
        window.addEventListener('resize', updateButtonSize);
        btn.addEventListener('mouseover', () => {
            btn.style.background = '#e8f5e9';
            btn.style.transform = 'scale(1.08)';
        });
        btn.addEventListener('mouseout', () => {
            btn.style.background = '#fff';
            btn.style.transform = 'scale(1)';
        });
        btn.title = choice.charAt(0).toUpperCase() + choice.slice(1);
        btn.onclick = () => handlePlayerChoice(choice);
        buttonRow.appendChild(btn);
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
    gameContent.appendChild(buttonsContainer);
    gameContent.appendChild(messageDisplay);
    gameContent.appendChild(closeButton);
    modal.appendChild(gameContent);
    document.body.appendChild(modal);

    // --- Функция запуска игры после стартового экрана ---
    function startGame() {
        gameContent.innerHTML = '';
        gameContent.appendChild(title);
        gameContent.appendChild(statsContainer);
        gameContent.appendChild(resultDisplay);
        gameContent.appendChild(buttonsContainer);
        gameContent.appendChild(messageDisplay);
        gameContent.appendChild(closeButton);
        showRound();
    }
    // --- Обработчик кнопки старта ---
    document.getElementById('startRPSBtn').onclick = startGame;
    logger.info('Rock Paper Scissors Game initialized successfully');
}