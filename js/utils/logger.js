// Утилита для логирования
const logger = {
    // Уровни логирования
    levels: {
        INFO: 'INFO',
        WARNING: 'WARNING',
        ERROR: 'ERROR'
    },

    // Функция для логирования сообщений
    log: function(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const logMessage = {
            timestamp,
            level,
            message,
            data
        };

        // Выводим в консоль с соответствующим форматированием
        switch(level) {
            case this.levels.INFO:
                console.log(`%c[${timestamp}] INFO: ${message}`, 'color: #33d17a');
                break;
            case this.levels.WARNING:
                console.warn(`%c[${timestamp}] WARNING: ${message}`, 'color: #f5a623');
                break;
            case this.levels.ERROR:
                console.error(`%c[${timestamp}] ERROR: ${message}`, 'color: #ff3b30');
                break;
        }

        // Если есть дополнительные данные, выводим их
        if (data) {
            console.log('Additional data:', data);
        }

        // В будущем здесь можно добавить отправку логов на сервер
        return logMessage;
    },

    // Методы для разных уровней логирования
    info: function(message, data = null) {
        return this.log(this.levels.INFO, message, data);
    },

    warning: function(message, data = null) {
        return this.log(this.levels.WARNING, message, data);
    },

    error: function(message, data = null) {
        return this.log(this.levels.ERROR, message, data);
    }
};

// Экспортируем логгер для использования в других файлах
export default logger;