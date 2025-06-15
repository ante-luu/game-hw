import modalStyles from '../styles/modalStyles.js';
import logger from '../utils/logger.js';
import gameElementStyles from '../styles/gameElementStyles.js';

/**
 * Игра "Переверни текст"
 * 
 * Правила:
 * - Игроку предлагается слово или фраза
 * - Нужно ввести это слово/фразу в обратном порядке
 * - За правильный ответ начисляется 1 очко
 * - После каждого ответа показывается мотивационное сообщение
 * 
 * @returns {void}
 */
export function startReverseTextGame() {
    logger.info('Starting Reverse Text Game');
    
    let score = 0;
    let totalQuestions = 0;
    
    // Массивы с данными для игры
    const phrases = [
        'Кот', 'Мороз', 'Дуб', 'Сказка', 'Богатырь', 'Ветер', 'Кит', 'Ложь',
        'Дорога', 'Лес', 'Козлик', 'Тропа', 'Царство', 'Горы', 'Государство',
        'Волшебство', 'Приключение', 'Сокровище', 'Замок', 'Рыцарь', 'Дракон',
        'Принцесса', 'Королевство', 'Волшебник', 'Чародей', 'Тайна', 'Загадка',
        'Сокровище', 'Кладезь', 'Лабиринт', 'Звездопад', 'Радуга', 'Метеорит',
        'Комета', 'Галактика', 'Вселенная', 'Космос', 'Планета', 'Созвездие',
        'Млечный путь', 'Красная шапочка', 'Белоснежка', 'Золушка', 'Русалочка',
        'Алиса', 'Питер Пэн', 'Винни Пух', 'Карлсон', 'Буратино', 'Чиполлино'
    ];

    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.style.cssText = modalStyles.modal;

    const gameContent = document.createElement('div');
    gameContent.style.cssText = modalStyles.modalContent;

    // Создаем элементы интерфейса
    const title = document.createElement('h2');
    title.style.cssText = modalStyles.title;
    title.textContent = 'Переверни текст';

    function showQuestion() {
        // Описание всегда актуально
        let description = gameContent.querySelector('.reverse-description');
        if (!description) {
            description = document.createElement('div');
            description.className = 'reverse-description';
            description.style.cssText = 'margin-bottom: 15px; color: #202027; font-size: 16px;';
            gameContent.insertBefore(description, title.nextSibling);
        }
        description.textContent = 'Вы видите текст. Введите его в перевернутом виде. Попробуйте угадать, как он будет выглядеть!';

        const scoreDisplay = document.createElement('p');
        scoreDisplay.style.cssText = gameElementStyles.score;
        scoreDisplay.textContent = 'Счёт: 0/0';

        const questionDisplay = document.createElement('p');
        questionDisplay.style.cssText = gameElementStyles.question;
        questionDisplay.textContent = '';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Введите перевернутый текст';
        input.style.cssText = modalStyles.input;

        const message = document.createElement('p');
        message.style.cssText = gameElementStyles.message;

        const button = document.createElement('button');
        button.textContent = 'Проверить';
        button.style.cssText = modalStyles.button;
        button.addEventListener('mouseover', () => {
            button.style.cssText = modalStyles.button + (modalStyles.buttonHover || '');
        });
        button.addEventListener('mouseout', () => {
            button.style.cssText = modalStyles.button;
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

        /**
         * Генерирует новое слово для переворота
         * @returns {string} Перевернутое слово
         */
        function generateQuestion() {
            logger.info('Generating new text to reverse');
            
            try {
                const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                questionDisplay.textContent = randomPhrase;
                const reversed = randomPhrase.split('').reverse().join('');
                logger.info(`Generated phrase: "${randomPhrase}", reversed: "${reversed}"`);
                return reversed;
            } catch (error) {
                logger.error('Error generating question', error);
                throw error;
            }
        }

        let currentAnswer = generateQuestion();

        /**
         * Проверяет ответ пользователя
         */
        function checkAnswer() {
            logger.info('Checking user answer');
            
            const userAnswer = input.value.trim();
            totalQuestions++;

            try {
                if (!userAnswer) {
                    message.innerHTML = `
                        <div style="color: #202027;">
                            Пожалуйста, введите текст
                        </div>
                    `;
                    message.style.background = '#f5f5f5';
                    logger.warning('User entered empty input');
                    return;
                }

                const category = 'Переверни текст';
                if (userAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
                    score++;
                    const encouragements = window.gameMessages.encouragements && window.gameMessages.encouragements[category];
                    const randomEncouragement = encouragements && encouragements.length
                        ? encouragements[Math.floor(Math.random() * encouragements.length)]
                        : window.gameMessages.compliments[Math.floor(Math.random() * window.gameMessages.compliments.length)];
                    const categoryQuotes = window.gameMessages.quotesByCategory && window.gameMessages.quotesByCategory[category];
                    const randomQuote = categoryQuotes && categoryQuotes.length
                        ? categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
                        : window.gameMessages.quotes[Math.floor(Math.random() * window.gameMessages.quotes.length)];
                    message.innerHTML = `
                        <div style="margin-bottom: 15px; color: #33d17a; font-weight: bold;">Правильно! 🎉</div>
                        <div style="margin-bottom: 10px; color: #202027;">${randomEncouragement}</div>
                        <div style="font-style: italic; color: #666; border-left: 3px solid #202027; padding-left: 15px; margin-top: 10px;">${randomQuote}</div>
                    `;
                    message.style.background = '#e8f5e9';
                    logger.info('Correct answer', { userAnswer, correctAnswer: currentAnswer });
                } else {
                    const randomMotivation = window.gameMessages.motivation[Math.floor(Math.random() * window.gameMessages.motivation.length)];
                    message.innerHTML = `
                        <div style="margin-bottom: 15px; color: #ff4444; font-weight: bold;">Неправильно! Правильный ответ: ${currentAnswer}</div>
                        <div style="font-style: italic; color: #666; border-left: 3px solid #202027; padding-left: 15px; margin-top: 10px;">${randomMotivation}</div>
                    `;
                    message.style.background = '#f5f5f5';
                    logger.info('Incorrect answer', { userAnswer, correctAnswer: currentAnswer });
                }

                scoreDisplay.textContent = `Счёт: ${score}/${totalQuestions}`;
                input.value = '';
                currentAnswer = generateQuestion();
            } catch (error) {
                logger.error('Error checking answer', error);
                message.innerHTML = `
                    <div style="color: #ff4444;">
                        Произошла ошибка. Попробуйте еще раз.
                    </div>
                `;
                message.style.background = '#ffebee';
            }
        }

        // Добавляем обработчики событий
        button.addEventListener('click', checkAnswer);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });

        closeButton.addEventListener('click', () => {
            logger.info('Closing Reverse Text Game');
            document.body.removeChild(modal);
        });

        // Собираем интерфейс
        gameContent.appendChild(title);
        gameContent.appendChild(description);
        gameContent.appendChild(scoreDisplay);
        gameContent.appendChild(questionDisplay);
        gameContent.appendChild(input);
        gameContent.appendChild(message);
        gameContent.appendChild(button);
        gameContent.appendChild(closeButton);
        modal.appendChild(gameContent);
        document.body.appendChild(modal);

        input.focus();
        logger.info('Reverse Text Game initialized successfully');
    }

    showQuestion();
}

window.startReverseTextGame = startReverseTextGame;
