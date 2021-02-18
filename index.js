'use strict';
/**
 * * Lesson13
 */


//функция проверки ввода числа на цисле
const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};


// todo проверка на ввод символов кириллицы ?!,. а-я А-Я ёЁ
const handleCyrChars = function (event) {
    // срабатывает на ввод
    // event.target.value = event.target.value.replace(/[^\?\!,\.а-яА-ЯёЁ\s]/g, '');
    event.target.value = event.target.value.replace(/[^\?\!,\.а-яё\s]/ig, '');
}

// todo проверка на ввод цифр 0123456789 и точка .
const handleNubmers = function (event) {
    let value = event.target.value;
    //срабатывает на замену всех символов которые не подходят под шаблон
    value = value.replace(/[^0-9.]/g, '');
    event.target.value = value;
};

const setListeners = function () {
    // * находим поля для заполнения по значению placeholder
    const inputString = document.querySelectorAll('input[placeholder="Наименование"]');
    const inputNumber = document.querySelectorAll('input[placeholder="Сумма"]'); 
    // * цепляем соответствующие слушатели на соответствующие элементы
    inputString.forEach(function (item) {
        // item.addEventListener('input', handleLatChars);
        item.addEventListener('input', handleCyrChars);
    });
    inputNumber.forEach(function (item) {
        item.addEventListener('input', handleNubmers);
    });
};
setListeners();


 //buttons
const start = document.getElementById('start');   //? startBtn
const cancel = document.getElementById('cancel'); //? cancelBtn

const btnPlus = document.getElementsByTagName('button'); //NodeList buttons 0, 1, ..

//! data весь блок с input слева
const salaryAmount = document.querySelector('.salary-amount'); //Месячный доход salary
let incomeItems = document.querySelectorAll('.income-items'); // *
const incomePlus = btnPlus[0]; //? incomePlus КНОПКА + добавить поле ввода поля дополнительных доходов
const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); //? Возможный доход через запятую
const expensesTitle = document.querySelector('input.expenses-title'); // Обязательные расходы наименование
const expensesAmount = document.querySelector('input.expenses-amount'); // Обязательные расходы размер
let expensesItems = document.querySelectorAll('.expenses-items'); // * block
const expensesPlus = btnPlus[1]; //? expensesPlus КНОПКА + добавить поле ввода поля дополнительных расходов
const additionalExpenses = document.querySelector('additional_expenses');
const additionalExpensesItem = document.querySelector('input.additional_expenses-item'); // Возможные расходы <span>(перечислите через запятую)</span>
const depositCheck = document.querySelector('#deposit-check'); //? check галочка наличие депозита
const selectDepositBank = document.querySelector('.deposit-bank'); //* выбор банка скрыто
const depositAmount = document.querySelector('.input.deposit-amount'); //сумма депозита .deposit-calc скрыто
const depositPercent = document.querySelector('.input.deposit-percent'); //процент депозита .deposit-calc скрыто
const targetAmount = document.querySelector('.target-amount'); // * цель сумма
let periodSelect = document.querySelector('input.period-select'); //Выбор Периода расчета 
const periodAmount = document.querySelector('.period-amount'); //Период расчета отображение

//! result весь блок с результатами справа //
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0]; //? Доход за месяц
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0]; //? Дневной бюджет
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0]; //? Расход за месяц
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0]; // Возможные доходы
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]; // Возможные расходы
const accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value'); //? accumulatedMonthValue
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0]; //? incomePeriodValue Накопления за период 
const targetMonthValue = document.getElementsByClassName('target_month-value')[0]; // Срок достижения цели в месяцах



// !! основные данные приложения в объекте appData
let appData = {
    budget: 0, // 
    income: {}, // основной доход
    addIncome: [], // доп доход

    expenses: {}, // обязательные расходы
    addExpenses: [], // доп расходы

    deposit: false, //есть ли депозит
    percentDeposit: 0,
    moneyDeposit: 0,

    budgetDay: 0, //бюджет на день
    budgetMonth: 0, //бюджет на месяц
    expensesMonth: 0, // расходы на месяц
    incomeMonth: 0,

    start: function () {
        //? запускает наше приложение при клике на кнопку РАСЧИТАТЬ
        // console.log('тест start: ', this); //* 

        this.budget = +salaryAmount.value;

        this.getExpenses(); // *
        this.getIncome(); // *

        this.getExpensesMonth(); //расчет обязательных расходов
        this.getAddExpenses(); //расчет дополнительных расходов
        this.getAddIncome(); //расчет дополнительных доходов

        this.getBudget(); // по смыслу считаем бюджет на месяц и на день

        // ! 4) Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать, 
        // ! после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить, 
        // * блокируем все инпуты
        let inputText = document.querySelectorAll('.data input[type="text"]');
        // console.log('inputText: ', inputText);
        inputText.forEach(function (inputItem) {
            inputItem.disabled = true;
            // console.log('inputItem: ', inputItem);
        }, this);
        
        this.showResult(); // заполняем все поля с результатами справа

        start.style.display = 'none'; // * после этого кнопка Рассчитать пропадает и 
        cancel.style.display = 'block'; // * появляется кнопка Сбросить навешиваем событие и выполнение метода reset

        // ! УДАЛЯЕМ слушатели с кнопок expensesPlus и incomePlus
        // expensesPlus.removeEventListener('click', eventAddExpensesBlock);
        // incomePlus.removeEventListener('click', eventAddIncomeBlock);    
        // * деактивируем кнопки или одно или другое
        expensesPlus.disabled = true;
        incomePlus.disabled = true;

        depositCheck.disabled = true;

        // * отключим ползунок range
        periodSelect.disabled = true;
    },

    reset: function () {
        // * сбрасываем значения переменных
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;

        // * удаляем лишние блоки расходов
        expensesItems = document.querySelectorAll('.expenses-items'); // * expenses block узнаем текущее состояние блока
        while (expensesItems.length >= 2) {
            expensesItems[0].remove();
            expensesItems = document.querySelectorAll('.expenses-items');
        }
        // * удаляем лишние блоки доходов
        incomeItems = document.querySelectorAll('.income-items'); // * expenses block узнаем текущее состояние блока
        while (incomeItems.length >= 2) {
            incomeItems[0].remove();
            incomeItems = document.querySelectorAll('.income-items');
        }

        // * возвращаем на страницу кнопки incomePlus и expensesPlus
        expensesPlus.style.display = 'block';
        incomePlus.style.display = 'block';
        // * вешаем обратно слушатели на кнопки
        // expensesPlus.addEventListener('click', eventAddExpensesBlock);
        // incomePlus.addEventListener('click', eventAddIncomeBlock);
        expensesPlus.disabled = false;
        incomePlus.disabled = false;


        // * очищаем и активируем поля слева
        let inputText = document.querySelectorAll('.data input[type="text"]');
        inputText.forEach(function (inputItem) {
            inputItem.disabled = false; // * активируем поля
            inputItem.value = '';  // * очищаем поля
        }, this);
        // * очищаем поля справа
        let resultInputs = document.querySelectorAll('.result input');
        resultInputs.forEach(function (inputItem) {
            inputItem.value = '';  // * очищаем поля
        }, this);

        // * устанавливаем ползунок в начальное положение
        periodSelect.disabled = false;
        periodSelect.value = 1;
        periodAmount.textContent = '1';
        
        start.style.display = 'block'; //* показываем кнопку Расчитать
        start.disabled = true; // * деактивируем кнопку Расчитать
        cancel.style.display = 'none'; //* прячем кнопку Сбросить
        
        // * ресет для чекбокса
        depositCheck.disabled = false;
        depositCheck.checked = false;
    },
    
    showResult: function () {
        // *
        //! showResult выводит результаты вычисления в правый блок data
        // console.log('тест showResult', this);

        budgetMonthValue.value = Math.floor(this.budgetMonth); // * Округлить
        budgetDayValue.value = Math.floor(this.budgetDay); // * Округлить вывод дневного бюджета
        expensesMonthValue.value = this.expensesMonth;

        additionalExpensesValue.value = this.addExpenses.join(', '); // * собираем назад весь масиив в строку
        additionalIncomeValue.value = this.addIncome.join(', '); // * собираем назад весь массив в строку для вывода в поле

        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcIncomePeriodValue();

        periodSelect = document.querySelector('input.period-select');

        //! добавить addEventListener() и убрать removeEventListener()
        // Добавить обработчик события внутри метода showResult, который будет отслеживать период
        // и сразу менять значение в поле “Накопления за период” (После нажатия кнопки рассчитать,
        // если меняем ползунок в range, “Накопления за период” меняются динамически аналогично 4-ому пункту)
        periodSelect.removeEventListener('input', this.changePeriodAmount.bind(appData), false);
        periodSelect.addEventListener('input', this.changePeriodAmount.bind(appData));
    },

    addExpensesBlock: function () {
        // * добавление новых полей дополнительных расходов плюсику // expensesPlus
        let cloneExpensesItems = expensesItems[0].cloneNode(true); // * клонируем блок делаем глубокую копию true
        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus); //вставляем копию блока до кнопки

        expensesItems = document.querySelectorAll('.expenses-items'); // * expenses block узнаем текущее состояние блока
        if (expensesItems.length >= 3) {
            expensesPlus.style.display = 'none'; // * прячим кнопку после 3го раза
        }
        //console.log("добавить новый блок расходов");
        // * в конце еще раз вешаем слушатели на наши поля
        setListeners();
    },

    addIncomeBlock: function () {
        let cloneIncomeBlock = incomeItems[0].cloneNode(true); //? глубоко кловнируем блок
        cloneIncomeBlock.querySelector('.income-title').value = ''; //? очищаем наименование
        cloneIncomeBlock.querySelector('.income-amount').value = ''; //? очищаем доход
        incomeItems[0].parentElement.insertBefore(cloneIncomeBlock, incomePlus); //? добавляем перед кнопкой

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length >= 3) {
            incomePlus.style.display = 'none'; //прячим кнопку после 3го раза
            // console.log("прячем кнопку");
        }
        // console.log("добавить новый блок доходов");
        // * в конце еще раз вешаем слушатели на новые поля
        setListeners();
    },

    getExpenses: function () {
        // *
        // проходимся по ключ:значению
        let _this = this;

        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value.trim();
            let cashExpenses = item.querySelector('.expenses-amount').value.trim();
            // проверка на пустые поля
            if (itemExpenses !== '' && cashExpenses !== '') {

                this.expenses[itemExpenses] = parseFloat(cashExpenses);
            } else {
                return;
            }
        }, this); //* пробуем по совету передать this в контекст вызова
    },

    getIncome: function () {
        // *
        //подсчет дополнительных доходов
        let _this = this;
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value.trim();
            let cashIncome = item.querySelector('.income-amount').value.trim();
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = +parseFloat(cashIncome);
            } else {
                //? console.log('Заполнены не все поля дополнительных доходов');
                return; //?
            }
        });
        //* обнуляем доходы в самом начале и суммируем доп доходы за месяц заново
        this.incomeMonth = 0;
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(', '); //разбираем строку на массив
        this.addExpenses = []; //обнуляем переменную
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this); //forEach context this
    },

    getAddIncome: function () {
        this.addIncome = [];
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this); //forEach context this
    },

    getExpensesMonth: function () {
        let sum = 0; //обнуляем переменную перед новым суммированием
        // расчет обязательныз расходов суммируем по полям expenses
        for (let key in this.expenses) {
            //проверка на собственное свойство
            if (this.expenses.hasOwnProperty(key)) {
                sum += +this.expenses[key];
            }
        }
        this.expensesMonth = sum;
    },

    getBudget: function () {
        //расчет бюджетов
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30; //? округляем
    },

    getTargetMonth: function () {
        //за сколько месяцев будет достигнута цель
        return targetAmount.value / this.budgetMonth;
    },

    getStatusIncome: function () {
        //возвращает результат вычислений уровня средних доходов на день
        if (this.budgetDay >= 1200) {
            return 'Поздравляем!\nУ вас высокий уровень дохода';
        } else if (this.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (this.budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что-то пошло не так';
        }
    },

    getInfoDeposit: function () {
        //спрашиваем и вычисляем информацию о депозите
        if (this.deposit) {
            //проверка ввода процента депозита
            do {
                this.percentDeposit = prompt(
                    'Какой годовой процент? Введите число',
                    '10'
                );
            } while (!isNumber(this.percentDeposit));
            this.percentDeposit = +this.percentDeposit;

            //проверка ввода суммы депозита
            do {
                this.moneyDeposit = prompt(
                    'Какая сумма заложена в депосит? Введите число',
                    10000
                );
            } while (!isNumber(this.moneyDeposit));
            this.moneyDeposit = +this.moneyDeposit;
        }
    },

    calcIncomePeriodValue: function () {
        // * возвращает накопления за период расчета
        return this.budgetMonth * periodSelect.value;
    },

    changePeriodAmount: function () {
        console.log('changePeriodAmount', this);
        // * изменяет значение поля periodAmount под ползунком range periodSelect
        let value = periodSelect.value;
        periodAmount.textContent = value;
        // * изменяет значение поля накопления за период при движении ползунка
        incomePeriodValue.value = this.calcIncomePeriodValue();
    },
}; //*appData



const disableAndAnableStart = function () {
    let salaryAmount = document.querySelector('.salary-amount');

    if (salaryAmount.value.trim() === '') {
        // start.setAttribute('disabled');
        start.disabled = 'true';
        // console.log('start disabled');
    } else {
        // start.disabled = 'false';
        start.removeAttribute('disabled');
        // console.log('start anabled');
    }
};
// * первый запуск для инициализации состояния кнопки
disableAndAnableStart();



//! привязываем слушатели событий !//

// * вешаем клик на кнопку start Расчитать
// * обычный без биндинга
// start.addEventListener('click', appData.start);

// * набиндить обкт appData
//! ДЗ 13 1) Привязать контекст вызова функции start к appData 
start.addEventListener('click', appData.start.bind(appData));

//! ДЗ 13 4) ...появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset()
cancel.addEventListener('click', appData.reset.bind(appData));


// * клик на кнопку плюс expensesPlus и incomePlus
// expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
// incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));

const eventAddExpensesBlock = appData.addExpensesBlock.bind(appData);
const eventAddIncomeBlock = appData.addIncomeBlock.bind(appData);
expensesPlus.addEventListener('click', eventAddExpensesBlock);
incomePlus.addEventListener('click', eventAddIncomeBlock);


//! Число под полоской (input type range) должно меняться в зависимости от позиции range, 
// periodSelect.addEventListener('input', appData.changePeriodAmount); // без явной привязки контекста //* привязка к инпуту
periodSelect.addEventListener('input', appData.changePeriodAmount.bind(appData)); //с привязкой контекста


// * изменения ввода в поле salaryAmount слушатель на input (или на change)
salaryAmount.addEventListener('input', disableAndAnableStart);



/** 
console.log('button: ', btnPlus);
console.log('salaryAmount: ', salaryAmount);
console.log('incomeTitle: ', incomeTitle);
console.log('incomeAmount: ', incomeAmount);
console.log('incomePlus: ', incomePlus);
console.log('additionalIncomeItem: ', additionalIncomeItem);
console.log('expensesItems: ', expensesItems);
console.log('expensesTitle: ', expensesTitle);
console.log('expensesAmount: ', expensesAmount);
console.log('expensesPlus: ', expensesPlus);
console.log('additionalExpensesItem: ', additionalExpensesItem);
console.log('depositCheck: ', depositCheck);
console.log('selectDepositBank: ', selectDepositBank);
console.log('depositAmount: ', depositAmount);
console.log('depositPercent: ', depositPercent);
console.log('targetAmount: ', targetAmount);
console.log('periodSelect: ', periodSelect);
console.log('periodAmount: ', periodAmount);
console.log('budgetMonthValue: ', budgetMonthValue);
console.log('budgetDayValue: ', budgetDayValue);
console.log('expensesMonthValue: ', expensesMonthValue);
console.log('additionalIncomeValue: ', additionalIncomeValue);
console.log('additionalExpensesValue: ', additionalExpensesValue);
console.log('accumulatedMonthValue: ', accumulatedMonthValue);
console.log('incomePeriodValue: ', incomePeriodValue);
console.log('targetMonthValue: ', targetMonthValue);
console.log('start: ', start);
console.log('cancel: ', cancel);
 */
