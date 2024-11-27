let score = 0;

// Получаем элементы из DOM
const scoreElement = document.getElementById("score");
const clickButton = document.getElementById("clickButton");
const resetButton = document.getElementById("resetButton");

// Обработчик события для кнопки "Кликнуть!"
clickButton.addEventListener("click", function() {
    score++; // Увеличиваем счет
    scoreElement.innerText = score; // Обновляем отображение счета
});

// Обработчик события для кнопки "Сбросить очки"
resetButton.addEventListener("click", function() {
    score = 0; // Сбрасываем счет
    scoreElement.innerText = score; // Обновляем отображение счета
});
