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

        // --- СТАРТОВЫЙ ЭКРАН ---
        const startScreen = document.createElement('div');
        startScreen.style.cssText = 'padding: 32px 0; text-align: center;';
        startScreen.innerHTML = `
          <h2 style="font-size: 2em; margin-bottom: 16px;">Угадай число</h2>
          <p style="font-size: 1.1em; color: #202027; margin-bottom: 24px;">
            Компьютер загадал число от 1 до 100. Твоя задача — угадать его за наименьшее количество попыток!<br>
            После каждой попытки ты получишь подсказку: больше или меньше.<br>
            Введи число и проверь свою интуицию!
          </p>
          <button id="startGuessNumberBtn" style="margin-top: 24px; font-size: 1.2em; padding: 10px 32px; background: #33d17a; color: #fff; border: none; border-radius: 8px; cursor: pointer;">Начать игру</button>
        `;
        gameContent.appendChild(startScreen);
        modal.appendChild(gameContent);
        document.body.appendChild(modal);
        // --- Основной игровой интерфейс (скрыт до старта) ---
        const attemptsDisplay = document.createElement('p');
        attemptsDisplay.style.cssText = 'font-size: 1.1em; color: #202027; margin-bottom: 10px;';
        attemptsDisplay.textContent = 'Попыток: 0';
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Введите число от 1 до 100';
        input.style.cssText = modalStyles.input;
        const message = document.createElement('p');
        message.style.cssText = modalStyles.message;
        const button = document.createElement('button');
        button.textContent = 'Проверить';
        button.style.cssText = modalStyles.button;
        button.onclick = checkNumber;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                checkNumber();
            }
        };
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
                    const randomEncouragement = window.gameMessages.compliments[Math.floor(Math.random() * window.gameMessages.compliments.length)];
                    const randomQuote = window.gameMessages.quotes[Math.floor(Math.random() * window.gameMessages.quotes.length)];
                    const quoteText = randomQuote && typeof randomQuote === 'object' 
                        ? `<div style="margin-top: 15px; font-size: 16px; color: #666;">
                            ${randomQuote.text}${randomQuote.emoji ? ' ' + randomQuote.emoji : ''}
                            ${randomQuote.author ? '<br><span style=\"font-size: 0.9em; color: #888;\">— ' + randomQuote.author + '</span>' : ''}
                           </div>`
                        : randomQuote;
                    message.innerHTML = `
                        <div style="margin-top: 15px; font-size: 18px; color: #33d17a;">
                            Поздравляем! Вы угадали число ${secretNumber} за ${attempts} попыток!
                        </div>
                        <div style="margin-top: 15px; font-size: 16px; color: #666;">
                            ${randomEncouragement.text ? randomEncouragement.text : randomEncouragement}
                            ${randomEncouragement.emoji ? ' ' + randomEncouragement.emoji : ''}
                        </div>
                        <div style="margin-top: 15px; font-size: 16px; color: #666;">
                            ${quoteText}
                        </div>`;
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
                        <div style="margin-top: 10px; color: #202027;">
                            ${randomMotivation.text ? randomMotivation.text : randomMotivation}
                            ${randomMotivation.emoji ? ' ' + randomMotivation.emoji : ''}
                        </div>
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
        // --- Функция запуска игры после стартового экрана ---
        function startGame() {
            startScreen.remove();
            gameContent.appendChild(attemptsDisplay);
            gameContent.appendChild(input);
            gameContent.appendChild(message);
            gameContent.appendChild(button);
            gameContent.appendChild(closeButton);
            input.focus();
        }
        // --- Обработчик кнопки старта ---
        document.getElementById('startGuessNumberBtn').onclick = startGame;
    } catch (error) {
        logger.error('Критическая ошибка в игре "Угадай число"', error);
        throw error; // Пробрасываем ошибку для обработки в main.js
    }
}

