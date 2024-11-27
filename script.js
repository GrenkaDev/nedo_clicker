let score = 0;
let autoclickerBought = false;
let autoclickerInterval;

// Получаем элементы из DOM
const scoreElement = document.getElementById("score");
const clickButton = document.getElementById("clickButton");
const autoclickerButton = document.getElementById("autoclickerButton");
const consoleInput = document.getElementById("consoleInput");
const consoleButton = document.getElementById("consoleButton");
const consoleOutput = document.getElementById("consoleOutput");

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

// Обработчик события для консольной команды
consoleButton.addEventListener("click", function() {
    const command = consoleInput.value.trim(); // Получаем команду
    consoleInput.value = ''; // Очищаем поле ввода

    if (command === 'reset') {
        score = 0;
        autoclickerBought = false;
        autoclickerButton.disabled = false; // Включаем кнопку для покупки
        autoclickerButton.innerText = 'Купить автокликер (50 очков)'; // Сбрасываем текст на кнопке
        clearInterval(autoclickerInterval); // Останавливаем автокликер, если он работает
        consoleOutput.innerText = 'Игра сброшена!';
        saveGame(); // Сохраняем данные
    } else if (command.startsWith('set ')) {
        const value = parseInt(command.split(' ')[1]);
        if (!isNaN(value)) {
            score = value;
            scoreElement.innerText = score; // Обновляем отображение счета
            saveGame(); // Сохраняем данные
            consoleOutput.innerText = `Очки установлены на ${value}!`;
        } else {
            consoleOutput.innerText = 'Ошибка: введите корректное число.';
        }
    } else {
        consoleOutput.innerText = 'Ошибка: нераспознанная команда.';
    }
});

// Загружаем игру при старте
loadGame();
