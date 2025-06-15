import { modalStyles } from '../styles/modalStyles.js';
import logger from '../utils/logger.js';

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

    const compliments = [
        'Отлично! Ты справляешься великолепно! 😊',
        'Восхитительно! Ты настоящий мастер слов! 🌟',
        'Потрясающе! Ты делаешь это с легкостью! ⭐',
        'Браво! Ты на верном пути! 🎯',
        'Супер! Ты справляешься лучше всех! 🏆',
        'Невероятно! Ты просто молодец! ❤️',
        'Превосходно! Ты справляешься на отлично! 🎉',
        'Замечательно! Ты делаешь это блестяще! ✨',
        'Фантастически! Ты настоящий профи! 🚀',
        'Умница! Ты справляешься просто великолепно! 💫'
    ];

    const motivationalPhrases = [
        'Не сдавайся! Каждая попытка приближает к победе! 💪',
        'Продолжай в том же духе! Ты обязательно справишься! 🌟',
        'Ошибка - это не конец, а подсказка к правильному ответу! 🛣️',
        'Верь в себя! Ты способен на большее! 💫',
        'Каждая попытка - это шаг к успеху! 📈',
        'Не бойся ошибаться, бойся не пробовать! 🎯',
        'Ты ближе к победе, чем думаешь! ❤️',
        'Каждая попытка делает тебя сильнее! 💪',
        'Не останавливайся на достигнутом! 🚀',
        'Ты справишься, просто продолжай! ⭐'
    ];

    const idioms = [
        'Без труда не вытащишь и рыбку из пруда! 🐟',
        'Терпение и труд всё перетрут! ⚒️',
        'Ученье свет, а неученье тьма! 📚',
        'Повторение - мать учения! 🔄',
        'Глаза боятся, а руки делают! 👀',
        'Тише едешь - дальше будешь! 🐢',
        'Семь раз отмерь, один раз отрежь! ✂️',
        'Не откладывай на завтра то, что можно сделать сегодня! ⏰',
        'Век живи - век учись! 🎓',
        'Тяжело в учении - легко в бою! 🛡️'
    ];
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    Object.assign(modal.style, modalStyles.modal);

    const gameContent = document.createElement('div');
    Object.assign(gameContent.style, modalStyles.content);

    // Создаем элементы интерфейса
    const title = document.createElement('h2');
    Object.assign(title.style, modalStyles.title);
    title.textContent = 'Переверни текст';

    const scoreDisplay = document.createElement('p');
    Object.assign(scoreDisplay.style, modalStyles.score);
    scoreDisplay.textContent = 'Счёт: 0/0';

    const questionDisplay = document.createElement('p');
    Object.assign(questionDisplay.style, modalStyles.question);
    questionDisplay.textContent = '';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Введите перевернутый текст';
    Object.assign(input.style, modalStyles.input);

    const message = document.createElement('p');
    Object.assign(message.style, modalStyles.message);

    const button = document.createElement('button');
    button.textContent = 'Проверить';
    Object.assign(button.style, modalStyles.button);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    Object.assign(closeButton.style, modalStyles.button);

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

            if (userAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
                score++;
                const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
                message.innerHTML = `
                    <div style="margin-bottom: 15px; color: #33d17a;">
                        Правильно! ${randomCompliment}
                    </div>
                    ${idioms[Math.floor(Math.random() * idioms.length)]}
                `;
                message.style.background = '#e8f5e9';
                logger.info('Correct answer', { userAnswer, correctAnswer: currentAnswer });
            } else {
                const randomMotivation = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
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
        logger.info('Closing Reverse Text Game');
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
    logger.info('Reverse Text Game initialized successfully');
}

window.startReverseTextGame = startReverseTextGame;
