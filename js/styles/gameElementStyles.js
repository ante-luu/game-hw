// Общие стили для элементов интерфейса игр
const gameElementStyles = {
  score: `
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0;
    color: #202027;
  `,
  question: `
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    line-height: 1.4;
    color:black;
  `,
  message: `
    margin: 20px 0;
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 500;
    min-height: 24px;
    line-height: 1.4;
  `,
  statsContainer: `
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    flex-wrap: wrap;
    gap: 20px;
  `,
  statBox: `
    text-align: center;
    padding: 10px;
    min-width: 120px;
  `,
  statLabel: `
    font-size: 16px;
    color: #666;
    margin-bottom: 5px;
    font-family: Montserrat;
  `,
  statValue: `
    font-size: 24px;
    font-weight: bold;
    color: #202027;
    font-family: Montserrat;
  `,
  colorDisplay: `
    width: 200px;
    height: 200px;
    margin: 30px auto;
    border-radius: 24px;
    background: #202027;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  `,
  colorCode: `
    color: #202027;
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 600;
    margin: 20px 0;
  `,
  optionsContainer: `
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
  `,
  questionContainer: `
    margin: 20px 0;
    text-align: center;
  `,
  resultDisplay: `
    margin: 20px 0;
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 500;
    min-height: 36px;
    line-height: 1.4;
  `,
  messageDisplay: `
    margin: 20px 0;
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 500;
    min-height: 27px;
    color: #666;
    line-height: 1.4;
  `,
  buttonsContainer: `
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  `,
};

export default gameElementStyles; 