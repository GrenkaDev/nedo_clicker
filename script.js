let score = 0;
let autoclickerLevel = 0; // Уровень автокликера
let autoclickerPrice = 100; // Начальная цена улучшения
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
    const savedLevel = localStorage.getItem("autoclickerLevel");

    if (savedScore) {
        score = parseInt(savedScore);
    }

    if (savedLevel) {
        autoclickerLevel = parseInt(savedLevel);
        updateAutoclickerButton(); // Обновляем состояние кнопки автокликера
        startAutoclicker(); // Запускаем автокликер
    }

    scoreElement.innerText = score; // Обновляем отображение счета
}

// Сохраняем данные в Local Storage
function saveGame() {
    localStorage.setItem("score", score);
    localStorage.setItem("autoclickerLevel", autoclickerLevel);
}

// Обработчик события для кнопки "Кликнуть!"
clickButton.addEventListener("click", function() {
    score++; // Увеличиваем счет
    scoreElement.innerText = score; // Обновляем отображение счета
    saveGame(); // Сохраняем данные
});

// Функция для обновления текста кнопки автокликера
function updateAutoclickerButton() {
    if (autoclickerLevel < 10) {
        autoclickerPrice = getNextPrice(autoclickerLevel); // Получаем цену для следующего уровня
        autoclickerButton.innerText = `Улучшить автокликер до уровня ${autoclickerLevel + 1} (${autoclickerPrice} очков)`;
    } else {
        autoclickerButton.disabled = true; // Отключаем кнопку после 10 уровня
        autoclickerButton.innerText = 'Максимальный уровень автокликера достигнут!';
    }
}

// Функция для получения цены следующего уровня
function getNextPrice(level) {
    switch (level) {
        case 0: return 100;
        case 1: return 200;
        case 2: return 500;
        case 3: return 1000;
        case 4: return 1500;
        case 5: return 2000;
        case 6: return 2500;
        case 7: return 3000;
        case 8: return 3500;
        case 9: return 4000;
        default: return Infinity; // Если уровень больше 9, цена бесконечная
    }
}

// Обработчик события для кнопки "Купить автокликер"
autoclickerButton.addEventListener("click", function() {
    if (score >= autoclickerPrice && autoclickerLevel < 10) {
        score -= autoclickerPrice; // Уменьшаем счет на цену автокликера
        scoreElement.innerText = score; // Обновляем отображение счета
        autoclickerLevel++; // Увеличиваем уровень автокликера
        updateAutoclickerButton(); // Обновляем состояние кнопки
        saveGame(); // Сохраняем данные
        restartAutoclicker(); // Перезапускаем автокликер с новым уровнем
    } else if (autoclickerLevel >= 10) {
        alert('Максимальный уровень автокликера достигнут!');
    } else {
        alert('Недостаточно очков для улучшения автокликера!');
    }
});

// Функция для старта автокликера
function startAutoclicker() {
    autoclickerInterval = setInterval(function() {
        score += autoclickerLevel; // Увеличиваем счет на уровень автокликера
        scoreElement.innerText = score; // Обновляем отображение счета
        saveGame(); // Сохраняем данные
    }, 1000); // Каждые 1000 миллисекунд (1 секунда)
}

// Функция для перезапуска автокликера
function restartAutoclicker() {
    clearInterval(autoclickerInterval); // Останавливаем текущий автокликер
    startAutoclicker(); // Запускаем новый автокликер
}

// Обработчик события для консольной команды
consoleButton.addEventListener("click", function() {
    const command = consoleInput.value.trim(); // Получаем команду
    consoleInput.value = ''; // Очищаем поле ввода

    if (command.toLowerCase() === 'reset') {
        score = 0;
        autoclickerLevel = 0;
        autoclickerButton.disabled = false; // Включаем кнопку для покупки
        updateAutoclickerButton(); // Обновляем текст на кнопке
        clearInterval(autoclickerInterval); // Останавливаем автокликер, если он работает
        consoleOutput.innerText = 'Игра сброшена!';
        document.getElementById('score').innerText = score; // Обновляем текст очков на экране
        saveGame(); // Сохраняем данные
        
    } else if (command.toLowerCase().startsWith('set ')) {
        const value = parseInt(command.split(' ')[1]);
        if (!isNaN(value)) {
            score = value;
            scoreElement.innerText = score; // Обновляем отображение счета
            saveGame(); // Сохраняем данные
            consoleOutput.innerText = `Очки установлены на ${value}!`;
        } else {
            consoleOutput.innerText = 'Ошибка! Введите корректное число.';
        }
        
    } else if (command.toLowerCase() === 'help') {
        consoleOutput.innerHTML = `
            Команды есть такие:
            <div id="consoleOutput" style="text-align: left;">
                <ul style="list-style-type: none; padding-left: 0; margin: 0;">
                    <li>help</li>
                    <li>set [число]</li>
                    <li>reset</li>
                </ul>
            </div>
        `;
    } else {
        consoleOutput.innerText = 'Ошибка! Такой команды нет(';
    }
});

// Загружаем игру при старте
loadGame();
