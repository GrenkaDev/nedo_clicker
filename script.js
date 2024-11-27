let score = 0;
let autoclickerBought = false;
let autoclickerInterval;

// Получаем элементы из DOM
const scoreElement = document.getElementById("score");
const clickButton = document.getElementById("clickButton");
const autoclickerButton = document.getElementById("autoclickerButton");

// Загружаем сохраненные данные из Local Storage
function loadGame() {
    const savedScore = localStorage.getItem("score");
    const savedAutoclicker = localStorage.getItem("autoclickerBought");

    if (savedScore) {
        score = parseInt(savedScore);
    }

    if (savedAutoclicker === "true") {
        autoclickerBought = true;
        autoclickerButton.disabled = true; // Отключаем кнопку после покупки
        autoclickerButton.innerText = 'Автокликер куплен!'; // Изменяем текст на кнопке
        startAutoclicker(); // Запускаем автокликер
    }

    scoreElement.innerText = score; // Обновляем отображение счета
}

// Сохраняем данные в Local Storage
function saveGame() {
    localStorage.setItem("score", score);
    localStorage.setItem("autoclickerBought", autoclickerBought);
}

// Обработчик события для кнопки "Кликнуть!"
clickButton.addEventListener("click", function() {
    score++; // Увеличиваем счет
    scoreElement.innerText = score; // Обновляем отображение счета
    saveGame(); // Сохраняем данные
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
        saveGame(); // Сохраняем данные
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
        saveGame(); // Сохраняем данные
    }, 1000); // Каждые 1000 миллисекунд (1 секунда)
}

// Загружаем игру при старте
loadGame();
