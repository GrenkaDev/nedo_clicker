let score = 0;
let autoclickerBought = false;
let autoclickerInterval;

// Получаем элементы из DOM
const scoreElement = document.getElementById("score");
const clickButton = document.getElementById("clickButton");
const autoclickerButton = document.getElementById("autoclickerButton");

// Обработчик события для кнопки "Кликнуть!"
clickButton.addEventListener("click", function() {
    score++; // Увеличиваем счет
    scoreElement.innerText = score; // Обновляем отображение счета
});

// Обработчик события для кнопки "Купить автокликер"
autoclickerButton.addEventListener("click", function() {
    if (score >= 50 && !autoclickerBought) {
        score -= 50; // Уменьшаем счет на 50
        scoreElement.innerText = score; // Обновляем отображение счета
        autoclickerBought = true; // Устанавливаем флаг, что автокликер куплен
        autoclickerButton.disabled = true; // Отключаем кнопку после покупки
        autoclickerButton.innerText = 'Автокликер куплен!'; // Изменяем текст на кнопке
        startAutoclicker(); // Запускаем автокликер
    } else if (autoclickerBought) {
        alert('Автокликер уже приобретен!');
    } else {
        alert('Недостаточно очков для покупки автокликера!');
    }
});

// Функция для старта автокликера
function startAutoclicker() {
    autoclickerInterval = setInterval(function() {
        score++; // Увеличиваем счет каждую секунду
        scoreElement.innerText = score; // Обновляем отображение счета
    }, 1000); // Каждые 1000 миллисекунд (1 секунда)
}
