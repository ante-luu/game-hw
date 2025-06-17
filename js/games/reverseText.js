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

    // --- СТАРТОВЫЙ ЭКРАН ---
    const startScreen = document.createElement('div');
    startScreen.style.cssText = 'padding: 32px 0; text-align: center;';
    startScreen.innerHTML = `
      <h2 style="font-size: 2em; margin-bottom: 16px;">Переверни текст</h2>
      <p style="font-size: 1.1em; color: #202027; margin-bottom: 24px;">
        Тебе будет показано слово или фраза. Введи этот текст в обратном порядке и проверь себя!<br>
        За каждый правильный ответ ты получаешь 1 очко. Удачи!
      </p>
      <button id="startReverseTextBtn" style="margin-top: 24px; font-size: 1.2em; padding: 10px 32px; background: #33d17a; color: #fff; border: none; border-radius: 8px; cursor: pointer;">Начать игру</button>
    `;
    gameContent.appendChild(startScreen);
    modal.appendChild(gameContent);
    document.body.appendChild(modal);

    // --- Основной игровой интерфейс (создаётся только после старта) ---
    function startGame() {
        gameContent.innerHTML = '';
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
        closeButton.addEventListener('click', () => {
            logger.info('Closing Reverse Text Game');
            document.body.removeChild(modal);
        });
        // --- Логика игры ---
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
        let currentAnswer;
        function checkAnswer() {
            logger.info('Checking user answer');
            const userAnswer = input.value.trim();
            totalQuestions++;
            const category = 'Переверни текст';
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
                    const quoteText = randomQuote && typeof randomQuote === 'object' 
                        ? `<div style="margin-top: 15px; font-size: 16px; color: #666;">
                            ${randomQuote.text}${randomQuote.emoji ? ' ' + randomQuote.emoji : ''}
                            ${randomQuote.author ? '<br><span style="font-size: 0.9em; color: #888;">— ' + randomQuote.author + '</span>' : ''}
                           </div>`
                        : randomQuote;
                    message.innerHTML = `
                        <div style="margin-top: 15px; font-size: 18px; color: #33d17a;">
                            ${randomEncouragement.text ? randomEncouragement.text : randomEncouragement}
                            ${randomEncouragement.emoji ? ' ' + randomEncouragement.emoji : ''}
                        </div>
                        <div style="margin-top: 15px; font-size: 16px; color: #666;">
                            ${quoteText}
                        </div>`;
                    message.style.background = '#e8f5e9';
                    logger.info('Correct answer', { userAnswer, correctAnswer: currentAnswer });
                } else {
                    const randomMotivation = window.gameMessages.motivation[Math.floor(Math.random() * window.gameMessages.motivation.length)];
                    message.innerHTML = `
                        <div style="color: #ff0000; font-weight: bold; font-size: 20px; margin-bottom: 10px;">
                            Неправильно! 😢
                        </div>
                        <div style="margin-bottom: 10px; font-size: 18px; color: #202027;">
                            Правильный ответ: <b>${currentAnswer}</b>
                        </div>
                        <div style="margin-top: 15px; font-size: 18px; color: #202027;">
                            ${randomMotivation.text ? randomMotivation.text : randomMotivation}
                            ${randomMotivation.emoji ? ' ' + randomMotivation.emoji : ''}
                        </div>`;
                    message.style.background = '#ffebee';
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
        // --- Добавляем элементы игрового интерфейса ---
        gameContent.appendChild(scoreDisplay);
        gameContent.appendChild(questionDisplay);
        gameContent.appendChild(input);
        gameContent.appendChild(message);
        gameContent.appendChild(button);
        gameContent.appendChild(closeButton);
        currentAnswer = generateQuestion();
        input.focus();
    }
    // --- Обработчик кнопки старта ---
    const startBtn = gameContent.querySelector('#startReverseTextBtn');
    if (startBtn) startBtn.onclick = startGame;
    logger.info('Reverse Text Game initialized successfully');
}

window.startReverseTextGame = startReverseTextGame;
