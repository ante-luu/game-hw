// Функция для получения случайной цитаты с красивым форматированием
function getRandomQuote() {
    const quote = gameMessages.quotes[Math.floor(Math.random() * gameMessages.quotes.length)];
    return `
        <div style="font-style: italic; color: #666; border-left: 3px solid #33d17a; padding-left: 15px; margin: 10px 0; font-size: 0.9em;">
            "${quote.text}"
            <div style="text-align: right; font-size: 0.9em; margin-top: 5px;">
                — ${quote.author} ${quote.emoji}
            </div>
        </div>
    `;
}

// Вспомогательная функция для получения автора цитаты
function getQuoteAuthor(quote) {
    return quote.author;
}

// Вспомогательная функция для получения эмодзи цитаты
function getQuoteEmoji(quote) {
    return quote.emoji;
}

