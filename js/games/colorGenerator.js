import { modalStyles } from '../styles/modalStyles.js';
import { logger } from '../utils/logger.js';

/**
 * Генератор случайных цветов
 * 
 * Игра позволяет генерировать случайные цвета и специальные названные цвета.
 * При каждом клике на кнопку генерируется новый цвет, который отображается
 * в виде квадрата и его HEX-кода. Также показываются комплименты и цитаты
 * о цветах.
 */
function startColorGeneratorGame() {
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
        Object.assign(modal.style, modalStyles.modal);

        const gameContent = document.createElement('div');
        Object.assign(gameContent.style, modalStyles.modalContent);

        const title = document.createElement('h2');
        Object.assign(title.style, modalStyles.modalTitle);
        title.textContent = 'Генератор случайных цветов';

        const colorDisplay = document.createElement('div');
        Object.assign(colorDisplay.style, {
            width: '200px',
            height: '200px',
            margin: '30px auto',
            borderRadius: '24px',
            background: '#202027',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
        });

        const colorCode = document.createElement('p');
        Object.assign(colorCode.style, {
            color: '#202027',
            fontFamily: 'Montserrat',
            fontSize: '24px',
            fontWeight: '600',
            margin: '20px 0'
        });
        colorCode.textContent = '#202027';

        const message = document.createElement('p');
        Object.assign(message.style, {
            margin: '20px 0',
            fontFamily: 'Montserrat',
            fontSize: '24px',
            fontWeight: '500',
            minHeight: '24px',
            lineHeight: '1.4'
        });

        const generateButton = document.createElement('button');
        Object.assign(generateButton.style, modalStyles.modalButton);
        generateButton.textContent = 'Сгенерировать цвет';

        const closeButton = document.createElement('button');
        Object.assign(closeButton.style, modalStyles.modalButton);
        closeButton.textContent = 'Закрыть';

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

        generateButton.addEventListener('mouseover', () => {
            Object.assign(generateButton.style, modalStyles.modalButtonHover);
        });

        generateButton.addEventListener('mouseout', () => {
            Object.assign(generateButton.style, modalStyles.modalButton);
        });

        generateButton.addEventListener('click', () => {
            try {
                const newColor = generateRandomColor();
                colorDisplay.style.backgroundColor = newColor.value;
                colorCode.textContent = newColor.name ? `${newColor.name} (${newColor.value})` : newColor.value;
                score++;

                if (score % 2 === 0) {
                    const randomQuote = colorQuotes[Math.floor(Math.random() * colorQuotes.length)];
                    message.innerHTML = randomQuote;
                    logger.info('Displayed color quote');
                } else {
                    const randomCompliment = colorCompliments[Math.floor(Math.random() * colorCompliments.length)];
                    message.textContent = randomCompliment;
                    logger.info('Displayed color compliment');
                }
                message.style.color = '#202027';
            } catch (error) {
                logger.error('Error handling color generation:', error);
                message.textContent = 'Произошла ошибка при генерации цвета';
                message.style.color = '#ff0000';
            }
        });

        closeButton.addEventListener('mouseover', () => {
            Object.assign(closeButton.style, modalStyles.modalButtonHover);
        });

        closeButton.addEventListener('mouseout', () => {
            Object.assign(closeButton.style, modalStyles.modalButton);
        });

        closeButton.addEventListener('click', () => {
            logger.info('Closing Color Generator Game');
            document.body.removeChild(modal);
        });

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

export { startColorGeneratorGame };
