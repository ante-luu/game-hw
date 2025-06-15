// Общие стили для модальных окон
const modalStyles = {
    // Стили для основного контейнера модального окна
    modal: `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(32, 32, 39, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    `,
    
    // Стили для контента модального окна
    modalContent: `
        background: white;
        padding: 40px;
        border-radius: 24px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        animation: modalAppear 0.3s ease-out;
        max-height: 90vh;
        overflow-y: auto;
    `,
    
    // Стили для заголовка
    title: `
        color: #202027;
        font-family: Montserrat;
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 30px;
    `,
    
    // Стили для кнопок
    button: `
        background: #202027;
        color: white;
        border: none;
        padding: 16px 32px;
        border-radius: 60px;
        cursor: pointer;
        font-family: Montserrat;
        font-size: 18px;
        font-weight: 600;
        margin: 10px 0 30px 0;
        transition: all 0.3s;
        min-width: 200px;
    `,
    
    // Стили для полей ввода
    input: `
        padding: 16px 24px;
        margin: 20px 0;
        width: 80%;
        border: 2px solid #202027;
        border-radius: 60px;
        font-size: 18px;
        font-family: Montserrat;
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
    `
};

// Экспортируем стили для использования в других файлах
export default modalStyles; 