// Импортируем необходимые модули
import modalStyles from '../styles/modalStyles.js';
import logger from '../utils/logger.js';

/**
 * Игра "Угадай число"
 * 
 * Правила игры:
 * - Компьютер загадывает число от 1 до 100
 * - Игрок пытается угадать это число
 * - После каждой попытки компьютер подсказывает, больше или меньше загаданное число
 * - Игра заканчивается, когда игрок угадывает число
 * 
 * @returns {Promise<void>}
 */
export async function startGuessNumberGame() {
    try {
        // Определяем категорию игры
        const category = 'Угадай число';
        
        // Генерируем случайное число
        const secretNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;
        
        logger.info('Игра "Угадай число" запущена', { secretNumber });
        
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.style.cssText = modalStyles.modal;

        const gameContent = document.createElement('div');
        gameContent.style.cssText = modalStyles.modalContent;

        // Добавляем анимацию
        const style = document.createElement('style');
        style.textContent = modalStyles.modalAnimation;
        document.head.appendChild(style);

        // Создаем элементы интерфейса
        const title = document.createElement('h2');
        title.textContent = 'Угадайка';
        title.style.cssText = modalStyles.title;

        let description = gameContent.querySelector('.quiz-description');
        if (!description) {
            description = document.createElement('div');
            description.className = 'quiz-description';
            description.style.cssText = 'margin-bottom: 15px; color: #202027; font-size: 16px;';
            gameContent.insertBefore(description, title.nextSibling);
        }
        description.textContent = 'Угадайте число от 1 до 100. После каждой попытки вы получите подсказку, больше или меньше загаданное число.';

        const attemptsDisplay = document.createElement('p');
        attemptsDisplay.style.cssText = modalStyles.message;
        attemptsDisplay.textContent = 'Попыток: 0';

        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.max = '100';
        input.placeholder = 'Введите число от 1 до 100';
        input.style.cssText = modalStyles.input;

        // Обработчики событий для поля ввода
        input.addEventListener('focus', () => {
            input.style.borderColor = '#33d17a';
        });

        input.addEventListener('blur', () => {
            input.style.borderColor = '#202027';
        });

        const message = document.createElement('p');
        message.style.cssText = modalStyles.message;

        const button = document.createElement('button');
        button.textContent = 'Проверить';
        button.style.cssText = modalStyles.button;

        // Обработчики событий для кнопки
        button.addEventListener('mouseover', () => {
            button.style.background = '#33d17a';
            button.style.color = '#202027';
        });

        button.addEventListener('mouseout', () => {
            button.style.background = '#202027';
            button.style.color = 'white';
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Закрыть';
        closeButton.style.cssText = modalStyles.button;
        closeButton.onclick = () => {
            logger.info('Игра "Угадай число" закрыта', { attempts, secretNumber });
            modal.remove();
        };

        // Функция проверки числа
        function checkNumber() {
            try {
                const guess = parseInt(input.value);
                attempts++;
                attemptsDisplay.textContent = `Попыток: ${attempts}`;

                logger.info('Попытка угадать число', { guess, attempts });

                if (isNaN(guess) || guess < 1 || guess > 100) {
                    message.innerHTML = `
                        <div style="color: #202027;">
                            Пожалуйста, введите число от 1 до 100
                        </div>
                    `;
                    message.style.background = '#f5f5f5';
                    logger.warning('Некорректный ввод', { guess });
                    return;
                }

                if (guess === secretNumber) {
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

                    message.innerHTML = `
                        <div style="margin-bottom: 15px; color: #33d17a; font-weight: bold;">Поздравляем! Вы угадали число ${secretNumber} за ${attempts} попыток!</div>
                        <div style="margin-bottom: 10px; color: #202027;">${randomEncouragement}</div>
                        <div style="font-style: italic; color: #666; border-left: 3px solid #202027; padding-left: 15px; margin-top: 10px;">${randomQuote}</div>
                    `;
                    message.style.background = '#e8f5e9';
                    button.disabled = true;
                    input.disabled = true;
                    button.style.background = '#33d17a';
                    button.style.cursor = 'default';
                    logger.info('Игра выиграна', { attempts, secretNumber });
                } else {
                    let hint = '';
                    if (guess < secretNumber) {
                        hint = 'Загаданное число больше!';
                    } else {
                        hint = 'Загаданное число меньше!';
                    }
                    const randomMotivation = window.gameMessages.motivation[Math.floor(Math.random() * window.gameMessages.motivation.length)];
                    message.innerHTML = `
                        <div style="color: #f44336; font-weight: bold;">${hint}</div>
                        <div style="margin-top: 10px; color: #202027;">${randomMotivation}</div>
                    `;
                    message.style.background = '#ffebee';
                    logger.info('Подсказка: число не угадано', { guess, hint });
                }
            } catch (error) {
                logger.error('Ошибка при проверке числа', error);
                message.innerHTML = `
                    <div style="color: #ff3b30;">
                        Произошла ошибка: ${error.message}
                    </div>
                `;
                message.style.background = '#ffebee';
            }
        }

        // Добавляем обработчики событий
        button.onclick = checkNumber;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                checkNumber();
            }
        };

        // Собираем интерфейс
        gameContent.appendChild(title);
        gameContent.appendChild(attemptsDisplay);
        gameContent.appendChild(input);
        gameContent.appendChild(message);
        gameContent.appendChild(button);
        gameContent.appendChild(closeButton);
        modal.appendChild(gameContent);
        document.body.appendChild(modal);

        // Фокусируемся на поле ввода
        input.focus();

    } catch (error) {
        logger.error('Критическая ошибка в игре "Угадай число"', error);
        throw error; // Пробрасываем ошибку для обработки в main.js
    }
}

