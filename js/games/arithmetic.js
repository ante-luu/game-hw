import modalStyles from '../styles/modalStyles.js';
import logger from '../utils/logger.js';
import gameElementStyles from '../styles/gameElementStyles.js';

/**
 * Игра "Простая арифметика"
 * 
 * Правила:
 * - Игроку предлагаются простые арифметические задачи
 * - Поддерживаются операции: сложение, вычитание, умножение и деление
 * - За правильный ответ начисляется 1 очко
 * - После каждого ответа показывается мотивационное сообщение
 * 
 * @returns {void}
 */
export function startArithmeticGame() {
    logger.info('Starting Arithmetic Game');
    
    let score = 0;
    let totalQuestions = 0;
    
    // Определяем, является ли устройство планшетом
    const isTablet = window.innerWidth >= 769 && window.innerWidth <= 1024;
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.style.cssText = modalStyles.modal;

    const gameContent = document.createElement('div');
    gameContent.style.cssText = isTablet ? modalStyles.tablet.modalContent : modalStyles.modalContent;

    // Создаем элементы интерфейса
    const title = document.createElement('h2');
    title.style.cssText = isTablet ? modalStyles.tablet.title : modalStyles.title;
    title.textContent = 'Простая арифметика';

    // --- СТАРТОВЫЙ ЭКРАН ---
    const startScreen = document.createElement('div');
    startScreen.style.cssText = 'padding: 32px 0; text-align: center;';
    startScreen.innerHTML = `
      <h2 style="font-size: 2em; margin-bottom: 16px;">Простая арифметика</h2>
      <p style="font-size: 1.1em; color: #202027; margin-bottom: 24px;">
        Решайте арифметические задачи на сложение, вычитание, умножение и деление.<br>
        За каждый правильный ответ вы получаете 1 очко. Удачи!
      </p>
      <button id="startArithmeticBtn" style="margin-top: 24px; font-size: 1.2em; padding: 10px 32px; background: #33d17a; color: #fff; border: none; border-radius: 8px; cursor: pointer;">Начать игру</button>
    `;
    gameContent.appendChild(startScreen);
    modal.appendChild(gameContent);
    document.body.appendChild(modal);

    // --- Основной игровой интерфейс (скрыт до старта) ---
    const scoreDisplay = document.createElement('p');
    scoreDisplay.style.cssText = isTablet ? gameElementStyles.tablet.score : gameElementStyles.score;
    scoreDisplay.textContent = 'Счёт: 0/0';

    const questionDisplay = document.createElement('p');
    questionDisplay.style.cssText = isTablet ? gameElementStyles.tablet.question : gameElementStyles.question;
    questionDisplay.textContent = '';

    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Введите ответ';
    input.style.cssText = isTablet ? modalStyles.tablet.input : modalStyles.input;

    const message = document.createElement('p');
    message.style.cssText = isTablet ? gameElementStyles.tablet.message : gameElementStyles.message;

    const button = document.createElement('button');
    button.textContent = 'Проверить';
    button.style.cssText = isTablet ? modalStyles.tablet.button : modalStyles.button;
    button.addEventListener('mouseover', () => {
        button.style.cssText = (isTablet ? modalStyles.tablet.button : modalStyles.button) + modalStyles.buttonHover;
    });
    button.addEventListener('mouseout', () => {
        button.style.cssText = isTablet ? modalStyles.tablet.button : modalStyles.button;
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    closeButton.style.cssText = isTablet ? modalStyles.tablet.button : modalStyles.button;
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.cssText = (isTablet ? modalStyles.tablet.button : modalStyles.button) + modalStyles.buttonHover;
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.cssText = isTablet ? modalStyles.tablet.button : modalStyles.button;
    });

    /**
     * Генерирует новую арифметическую задачу
     * @returns {number} Правильный ответ
     */
    function generateQuestion() {
        logger.info('Generating new arithmetic question');
        
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let num1, num2, answer;

        try {
            switch(operation) {
                case '+':
                    num1 = Math.floor(Math.random() * 50) + 1;
                    num2 = Math.floor(Math.random() * 50) + 1;
                    answer = num1 + num2;
                    break;
                case '-':
                    num1 = Math.floor(Math.random() * 50) + 1;
                    num2 = Math.floor(Math.random() * num1) + 1;
                    answer = num1 - num2;
                    break;
                case '*':
                    num1 = Math.floor(Math.random() * 12) + 1;
                    num2 = Math.floor(Math.random() * 12) + 1;
                    answer = num1 * num2;
                    break;
                case '/':
                    num2 = Math.floor(Math.random() * 10) + 1;
                    answer = Math.floor(Math.random() * 10) + 1;
                    num1 = num2 * answer;
                    break;
                default:
                    throw new Error('Unknown operation');
            }

            questionDisplay.textContent = `${num1} ${operation} ${num2} = ?`;
            logger.info(`Generated question: ${num1} ${operation} ${num2} = ${answer}`);
            return answer;
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
        
        const userAnswer = parseFloat(input.value);
        totalQuestions++;
        const category = 'Арифметика';

        try {
            if (isNaN(userAnswer)) {
                message.innerHTML = `
                    <div style="color: #202027;">
                        Пожалуйста, введите число
                    </div>
                `;
                message.style.background = '#f5f5f5';
                logger.warning('User entered invalid input');
                return;
            }

            if (userAnswer === currentAnswer) {
                score++;
                // Похвала по категории или общая
                const encouragements = window.gameMessages.encouragements && window.gameMessages.encouragements[category];
                const randomEncouragement = encouragements && encouragements.length
                    ? encouragements[Math.floor(Math.random() * encouragements.length)]
                    : window.gameMessages.compliments[Math.floor(Math.random() * window.gameMessages.compliments.length)];
                
                // Цитата по категории или общая
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

    // Добавляем обработчики событий
    button.addEventListener('click', checkAnswer);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    closeButton.addEventListener('click', () => {
        logger.info('Closing Arithmetic Game');
        document.body.removeChild(modal);
    });

    // --- Функция запуска игры после стартового экрана ---
    function startGame() {
        startScreen.remove();
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
    document.getElementById('startArithmeticBtn').onclick = startGame;
    logger.info('Arithmetic Game initialized successfully');
}