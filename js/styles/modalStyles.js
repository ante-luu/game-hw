// Общие стили для модальных окон
const modalStyles = {
    // Стили для основного контейнера модального окна
    modal: `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `,
    
    // Стили для контента модального окна
    modalContent: `
        background: white;
        padding: 32px;
        border-radius: 24px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    `,
    
    // Стили для заголовка
    title: `
        font-size: 32px;
        color: #202027;
        margin-bottom: 24px;
        font-weight: 700;
    `,
    
    // Стили для кнопок
    button: `
        background: #202027;
        color: white;
        border: none;
        padding: 16px 32px;
        border-radius: 12px;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s;
        margin: 8px 0;
        width: 100%;
    `,
    
    // Стили для полей ввода
    input: `
        width: 100%;
        padding: 16px;
        margin: 16px 0;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        font-size: 18px;
        outline: none;
        transition: border-color 0.3s;
    `,
    
    // Стили для сообщений
    message: `
        margin: 20px 0;
        font-family: Montserrat;
        font-size: 24px;
        font-weight: 500;
        min-height: 24px;
        line-height: 1.4;
    `,
    
    // Анимация появления модального окна
    modalAnimation: `
        @keyframes modalAppear {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `,
    
    // Стили для планшетной версии
    tablet: {
        modalContent: `
            padding: 24px;
            max-width: 500px;
            border-radius: 20px;
        `,
        title: `
            font-size: 28px;
            margin-bottom: 20px;
        `,
        input: `
            padding: 14px;
            font-size: 16px;
            border-radius: 10px;
        `,
        button: `
            padding: 14px 28px;
            font-size: 16px;
            border-radius: 10px;
        `
    },
    
    // Стили для кнопки при наведении
    buttonHover: `
        background: #333;
        transform: translateY(-2px);
    `
};

// Экспортируем стили для использования в других файлах
export default modalStyles; 