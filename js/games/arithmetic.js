import modalStyles from '../styles/modalStyles.js';
import logger from '../utils/logger.js';

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
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.style.cssText = modalStyles.modal;

    const gameContent = document.createElement('div');
    gameContent.style.cssText = modalStyles.content;

    // Создаем элементы интерфейса
    const title = document.createElement('h2');
    title.style.cssText = modalStyles.title;
    title.textContent = 'Простая арифметика';

    const scoreDisplay = document.createElement('p');
    scoreDisplay.style.cssText = modalStyles.score;
    scoreDisplay.textContent = 'Счёт: 0/0';

    const questionDisplay = document.createElement('p');
    questionDisplay.style.cssText = modalStyles.question;
    questionDisplay.textContent = '';

    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Введите ответ';
    input.style.cssText = modalStyles.input;

    const message = document.createElement('p');
    message.style.cssText = modalStyles.message;

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
                const randomCompliment = gameMessages.compliments[Math.floor(Math.random() * gameMessages.compliments.length)];
                message.innerHTML = `
                    <div style="margin-bottom: 15px; color: #33d17a;">
                        Правильно! ${randomCompliment}
                    </div>
                    ${getRandomQuote()}
                `;
                message.style.background = '#e8f5e9';
                logger.info('Correct answer', { userAnswer, correctAnswer: currentAnswer });
            } else {
                const randomMotivation = gameMessages.motivation[Math.floor(Math.random() * gameMessages.motivation.length)];
                message.innerHTML = `
                    <div style="margin-bottom: 15px; color: #202027;">
                        Неправильно! Правильный ответ: ${currentAnswer}
                    </div>
                    <div style="font-style: italic; color: #666; border-left: 3px solid #202027; padding-left: 15px; margin-top: 10px;">
                        "${randomMotivation}"
                    </div>
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
        logger.info('Closing Arithmetic Game');
        document.body.removeChild(modal);
    });

    // Собираем интерфейс
    gameContent.appendChild(title);
    gameContent.appendChild(scoreDisplay);
    gameContent.appendChild(questionDisplay);
    gameContent.appendChild(input);
    gameContent.appendChild(message);
    gameContent.appendChild(button);
    gameContent.appendChild(closeButton);
    modal.appendChild(gameContent);
    document.body.appendChild(modal);

    input.focus();
    logger.info('Arithmetic Game initialized successfully');
}