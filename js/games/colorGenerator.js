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

        const title = document.createElement('h2');
        title.style.cssText = modalStyles.modalTitle;
        title.textContent = 'Генератор случайных цветов';

        function showColor() {
            let description = gameContent.querySelector('.color-description');
            if (!description) {
                description = document.createElement('div');
                description.className = 'color-description';
                description.style.cssText = 'margin-bottom: 15px; color: #202027; font-size: 16px;';
                gameContent.insertBefore(description, title.nextSibling);
            }
            description.textContent = 'Нажмите на кнопку, чтобы сгенерировать случайный цвет и узнать его название.';
        }

        showColor();

        const colorDisplay = document.createElement('div');
        colorDisplay.style.cssText = gameElementStyles.colorDisplay;

        const colorCode = document.createElement('p');
        colorCode.style.cssText = gameElementStyles.colorCode;
        colorCode.textContent = '#202027';

        const message = document.createElement('p');
        message.style.cssText = gameElementStyles.message;

        const generateButton = document.createElement('button');
        generateButton.style.cssText = modalStyles.button;
        generateButton.textContent = 'Сгенерировать цвет';
        generateButton.addEventListener('mouseover', () => {
            generateButton.style.cssText = modalStyles.button + (modalStyles.buttonHover || '');
        });
        generateButton.addEventListener('mouseout', () => {
            generateButton.style.cssText = modalStyles.button;
        });

        const closeButton = document.createElement('button');
        closeButton.style.cssText = modalStyles.button;
        closeButton.textContent = 'Закрыть';
        closeButton.addEventListener('mouseover', () => {
            closeButton.style.cssText = modalStyles.button + (modalStyles.buttonHover || '');
        });
        closeButton.addEventListener('mouseout', () => {
            closeButton.style.cssText = modalStyles.button;
        });

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

                const category = 'Генератор цветов';
                const encouragements = window.gameMessages.encouragements && window.gameMessages.encouragements[category];
                const randomEncouragement = encouragements && encouragements.length
                    ? encouragements[Math.floor(Math.random() * encouragements.length)]
                    : window.gameMessages.compliments[Math.floor(Math.random() * window.gameMessages.compliments.length)];
                const categoryQuotes = window.gameMessages.quotesByCategory && window.gameMessages.quotesByCategory[category];
                const randomQuote = categoryQuotes && categoryQuotes.length
                    ? categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
                    : window.gameMessages.quotes[Math.floor(Math.random() * window.gameMessages.quotes.length)];
                let colorNameBlock = '';
                if (newColor.name) {
                    colorNameBlock = `<div style=\"margin-bottom: 10px; color: #202027; font-weight: bold;\">${newColor.name}</div>`;
                }
                if (score % 2 === 0) {
                    message.innerHTML = `${colorNameBlock}<div>${randomQuote}</div>`;
                    logger.info('Displayed color quote');
                } else {
                    message.innerHTML = `${colorNameBlock}<div>${randomEncouragement}</div>`;
                    logger.info('Displayed color compliment');
                }
                message.style.color = '#202027';
            } catch (error) {
                logger.error('Error handling color generation:', error);
                message.textContent = 'Произошла ошибка при генерации цвета';
                message.style.color = '#ff0000';
            }
        });

        closeButton.addEventListener('click', () => {
            logger.info('Closing Color Generator Game');
            document.body.removeChild(modal);
        });

        gameContent.appendChild(showColor());
        gameContent.appendChild(title);
        gameContent.appendChild(colorDisplay);
        gameContent.appendChild(colorCode);
        gameContent.appendChild(message);
        gameContent.appendChild(generateButton);
        gameContent.appendChild(closeButton);
        modal.appendChild(gameContent);
        document.body.appendChild(modal);

        logger.info('Color Generator Game initialized successfully');
    } catch (error) {
        logger.error('Error initializing Color Generator Game:', error);
        throw error;
    }
}
