// Импортируем необходимые модули
import logger from './utils/logger.js';
import modalStyles from './styles/modalStyles.js';
import { startGuessNumberGame } from './games/guessNumber.js';
import { startArithmeticGame } from './games/arithmetic.js';
import { startReverseTextGame } from './games/reverseText.js';
import { startQuizGame } from './games/quiz.js';
import { startRockPaperScissorsGame } from './games/rockPaperScissors.js';
import { startColorGeneratorGame } from './games/colorGenerator.js';

// Функция для адаптивной навигации кнопки "Поехали!"
function setupAdaptiveNavigation() {
    const headerButton = document.getElementById('headerButton');
    if (!headerButton) {
        logger.warning('Кнопка "Поехали!" не найдена');
        return;
    }

    // Функция для определения целевой секции в зависимости от размера экрана
    function getTargetSection() {
        const screenWidth = window.innerWidth;
        // Мобильные устройства (до 768px) - переход к карточкам игр
        if (screenWidth < 768) {
            return '#games';
        }
        // Планшеты и десктопы (768px и больше) - переход к секции "Об играх"
        return '#about';
    }

    // Функция для обновления ссылки
    function updateButtonTarget() {
        const targetSection = getTargetSection();
        headerButton.href = targetSection;
        logger.info(`Обновлена цель кнопки "Поехали!" на: ${targetSection} (ширина экрана: ${window.innerWidth}px)`);
    }

    // Обновляем цель при загрузке страницы
    updateButtonTarget();

    // Обновляем цель при изменении размера окна
    window.addEventListener('resize', () => {
        updateButtonTarget();
    });

    logger.info('Адаптивная навигация для кнопки "Поехали!" настроена');
}

// Функция для создания модального окна с ошибкой
function showErrorModal(message) {
    const modal = document.createElement('div');
    modal.style.cssText = modalStyles.modal;

    const content = document.createElement('div');
    content.style.cssText = modalStyles.modalContent;

    const title = document.createElement('h2');
    title.textContent = 'Ошибка';
    title.style.cssText = modalStyles.title;

    const errorMessage = document.createElement('p');
    errorMessage.innerHTML = message;
    errorMessage.style.cssText = modalStyles.message;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    closeButton.style.cssText = modalStyles.button;
    closeButton.onclick = () => modal.remove();

    content.appendChild(title);
    content.appendChild(errorMessage);
    content.appendChild(closeButton);
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// Функция для безопасного запуска игры
async function startGameSafely(gameFunction, gameName) {
    try {
        logger.info(`Запуск игры: ${gameName}`);
        await gameFunction();
    } catch (error) {
        logger.error(`Ошибка при запуске игры ${gameName}:`, error);
        console.error('Полная ошибка:', error);
        showErrorModal(`Произошла ошибка при запуске игры "${gameName}".<br><br>
            Тип ошибки: ${typeof error}<br>
            Ошибка: ${error && error.message ? error.message : error}<br>
            Стек: ${error && error.stack ? error.stack : 'нет данных'}`);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    logger.info('Страница загружена, инициализация обработчиков событий');
    
    // Настраиваем адаптивную навигацию
    setupAdaptiveNavigation();
    
    const gameButtons = document.querySelectorAll('.game-list__button');
    
    gameButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.game-list__card');
            const gameType = card.querySelector('.game-list__image').classList[1];
            
            // Определяем, какую игру запускать
            switch(gameType) {
                case 'game-list__image_type_guess-number':
                    startGameSafely(startGuessNumberGame, 'Угадай число');
                    break;
                case 'game-list__image_type_arithmetic':
                    startGameSafely(startArithmeticGame, 'Простая арифметика');
                    break;
                case 'game-list__image_type_reverse-text':
                    startGameSafely(startReverseTextGame, 'Переверни текст');
                    break;
                case 'game-list__image_type_quiz':
                    startGameSafely(startQuizGame, 'Викторина');
                    break;
                case 'game-list__image_type_rps':
                    startGameSafely(startRockPaperScissorsGame, 'Камень, ножницы, бумага');
                    break;
                case 'game-list__image_type_color-gen':
                    startGameSafely(startColorGeneratorGame, 'Генератор цветов');
                    break;
                default:
                    logger.warning(`Попытка запуска неизвестной игры: ${gameType}`);
                    showErrorModal('Эта игра пока недоступна!');
            }
        });
    });

    document.querySelectorAll('.about__game-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const gameName = card.querySelector('.game-card__title').textContent.trim();
            let targetId = '';
            switch (gameName) {
                case 'Угадай число': targetId = 'guess-number'; break;
                case 'Простая арифметика': targetId = 'arithmetic'; break;
                case 'Переверни текст': targetId = 'reverse-text'; break;
                case 'Камень, ножницы, бумага': targetId = 'rps'; break;
                case 'Простая викторина': targetId = 'quiz'; break;
                case 'Генератор случайных цветов': targetId = 'color-gen'; break;
            }
            if (targetId) {
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });

    logger.info('Обработчики событий успешно инициализированы');
});