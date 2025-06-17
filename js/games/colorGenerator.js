import modalStyles from '../styles/modalStyles.js';
import logger from '../utils/logger.js';
import gameElementStyles from '../styles/gameElementStyles.js';

/**
 * Генератор случайных цветов
 * 
 * Игра позволяет генерировать случайные цвета и специальные названные цвета.
 * При каждом клике на кнопку генерируется новый цвет, который отображается
 * в виде квадрата и его HEX-кода. Также показываются комплименты и цитаты
 * о цветах.
 */
export function startColorGeneratorGame() {
    logger.info('Starting Color Generator Game');
    let score = 0;
    
    const colorCompliments = [
        'Отлично! Ты создаешь настоящую радугу! ❤️',
        'Восхитительно! Твои цвета просто завораживают! 🎨',
        'Потрясающе! Ты настоящий художник! 🖌️',
        'Браво! Ты чувствуешь цвет как никто другой! 🎯',
        'Супер! Твои цвета излучают позитив! ✨',
        'Невероятно! Ты создаешь шедевры! 🎭',
        'Превосходно! Твои цвета вдохновляют! 💫',
        'Замечательно! Ты настоящий колорист! 🎪',
        'Фантастически! Твои цвета оживают! 🌟',
        'Умница! Ты создаешь магию цвета! 🎪'
    ];

    const colorQuotes = [
        'Цвет - это сила, которая непосредственно влияет на душу. - Василий Кандинский 🎨',
        'Цвета - это улыбки природы. - Ли Хант ❤️',
        'Жизнь - это холст, и ты должен бросить на него все краски, какие можешь. - Дэнни Кэй 🖌️',
        'Цвет - это клавиатура, глаза - молоточки, душа - многострунный рояль. - Василий Кандинский 🎹',
        'Цвета - это эмоции, которые мы видим. - Марк Шагал 🎭',
        'Каждый цвет имеет свою историю. - Пабло Пикассо 📚',
        'Цвета - это язык души. - Винсент Ван Гог 🎨',
        'Жизнь подобна картине: нарисуй её яркими красками! - Далила 🌟',
        'Цвета - это улыбки природы. - Ли Хант ❤️',
        'Каждый цвет имеет свою музыку. - Клод Моне 🎵'
    ];

    const specialColors = {
        'Небесная лазурь': '#87CEEB',
        'Морская волна': '#20B2AA',
        'Лавандовый': '#E6E6FA',
        'Персиковый': '#FFDAB9',
        'Мятный': '#98FF98',
        'Коралловый': '#FF7F50',
        'Бирюзовый': '#40E0D0',
        'Аметистовый': '#9966CC',
        'Оливковый': '#808000',
        'Индиго': '#4B0082',
        'Пурпурный': '#800080',
        'Бордовый': '#800000',
        'Терракотовый': '#E2725B',
        'Бирюзовый': '#30D5C8',
        'Лимонный': '#FDFF00',
        'Малиновый': '#DC143C',
        'Сливовый': '#8E4585',
        'Медный': '#B87333',
        'Бронзовый': '#CD7F32',
        'Песочный': '#F4A460'
    };
    
    try {
        const modal = document.createElement('div');
        modal.style.cssText = modalStyles.modal;

        const gameContent = document.createElement('div');
        gameContent.style.cssText = modalStyles.modalContent;

        const startScreen = document.createElement('div');
        startScreen.style.cssText = 'padding: 32px 0; text-align: center;';
        startScreen.innerHTML = `
          <h2 style="font-size: 2em; margin-bottom: 16px;">Генератор случайных цветов</h2>
          <p style="font-size: 1.1em; color: #202027; margin-bottom: 24px;">
            Нажимай на кнопку и получай случайные цвета!<br>
            Каждый цвет — это вдохновение, а заодно и комплимент или цитата о цвете.<br>
            Экспериментируй и находи свои любимые оттенки!
          </p>
          <button id="startColorGenBtn" style="margin-top: 24px; font-size: 1.2em; padding: 10px 32px; background: #33d17a; color: #fff; border: none; border-radius: 8px; cursor: pointer;">Начать игру</button>
        `;
        gameContent.appendChild(startScreen);
        modal.appendChild(gameContent);
        document.body.appendChild(modal);

        const title = document.createElement('h2');
        title.style.cssText = modalStyles.title;
        title.textContent = 'Генератор случайных цветов';

        const colorDisplay = document.createElement('div');
        colorDisplay.style.cssText = 'width: 120px; height: 120px; margin: 0 auto 16px auto; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);';

        const colorCode = document.createElement('div');
        colorCode.style.cssText = 'font-size: 1.2em; color: #202027; margin-bottom: 16px; text-align: center;';

        const message = document.createElement('p');
        message.style.cssText = modalStyles.message;

        const generateButton = document.createElement('button');
        generateButton.textContent = 'Сгенерировать цвет';
        generateButton.style.cssText = modalStyles.button;
        generateButton.addEventListener('mouseover', () => {
            generateButton.style.cssText = modalStyles.button + modalStyles.buttonHover;
        });
        generateButton.addEventListener('mouseout', () => {
            generateButton.style.cssText = modalStyles.button;
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Закрыть';
        closeButton.style.cssText = modalStyles.button;
        closeButton.addEventListener('mouseover', () => {
            closeButton.style.cssText = modalStyles.button + modalStyles.buttonHover;
        });
        closeButton.addEventListener('mouseout', () => {
            closeButton.style.cssText = modalStyles.button;
        });

        function startGame() {
            startScreen.remove();
            gameContent.appendChild(title);
            gameContent.appendChild(colorDisplay);
            gameContent.appendChild(colorCode);
            gameContent.appendChild(message);
            gameContent.appendChild(generateButton);
            gameContent.appendChild(closeButton);
        }

        document.getElementById('startColorGenBtn').onclick = startGame;

        function generateRandomColor() {
            try {
                if (Math.random() < 0.3) {
                    const specialColorNames = Object.keys(specialColors);
                    const randomColorName = specialColorNames[Math.floor(Math.random() * specialColorNames.length)];
                    const colorValue = specialColors[randomColorName];
                    logger.info(`Generated special color: ${randomColorName} (${colorValue})`);
                    return { value: colorValue, name: randomColorName };
                }

                const letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                logger.info(`Generated random color: ${color}`);
                return { value: color, name: null };
            } catch (error) {
                logger.error('Error generating color:', error);
                throw error;
            }
        }

        generateButton.addEventListener('click', () => {
            try {
                const newColor = generateRandomColor();
                colorDisplay.style.backgroundColor = newColor.value;
                colorCode.textContent = newColor.name ? `${newColor.name} (${newColor.value})` : newColor.value;
                score++;

                const category = 'Генератор случайных цветов';
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
                if (score % 2 === 0) {
                    message.innerHTML = `
                        <div style="margin-top: 15px; font-size: 18px; color: #33d17a;">
                            ${randomEncouragement}
                        </div>
                        <div style="margin-top: 15px; font-size: 16px; color: #666;">
                            ${quoteText}
                        </div>`;
                } else {
                    message.innerHTML = `
                        <div style="margin-top: 15px; font-size: 18px; color: #33d17a;">
                            ${randomEncouragement}
                        </div>`;
                }
                message.style.color = '#202027';
            } catch (error) {
                logger.error('Error generating color', error);
                message.textContent = 'Произошла ошибка. Попробуйте еще раз!';
                message.style.color = '#f44336';
            }
        });

        closeButton.addEventListener('click', () => {
            logger.info('Closing Color Generator Game');
            document.body.removeChild(modal);
        });
    } catch (error) {
        logger.error('Error starting game:', error);
        throw error;
    }
}