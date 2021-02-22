'use strict';
/**
 * * Lesson14
 */


//функция проверки ввода числа на цисле
const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};


// * проверка на ввод символов кириллицы ?!,. а-я А-Я ёЁ
const handleCyrChars = function (event) {
    // срабатывает на ввод всех символов кроме кириллицы
    // event.target.value = event.target.value.replace(/[^\?\!,\.а-яА-ЯёЁ\s]/g, '');
    event.target.value = event.target.value.replace(/[^\?\!,\.а-яё\s]/ig, '');
}

// * проверка на ввод цифр 0123456789 и точка .
const handleNubmers = function (event) {
    let value = event.target.value;
    //срабатывает на замену всех символов которые не подходят под шаблон
    value = value.replace(/[^0-9.]/g, '');
    event.target.value = value;
};




 //! buttons
const start = document.getElementById('start');   //? startBtn кнопка Рассчитать
const cancel = document.getElementById('cancel'); //? cancelBtn кнопка Сбросить
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




// ! ДЗ 14 КЛАСС ПРОТОТИПНЫЙ ООП

const AppData = function () {
    //? fields Поля свойства внутри конструктора

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

    //? methodes методы класса в прототипах

AppData.prototype.start = function () {
    console.log('start this', this);
    // * при нажатии на кнопку Рассчитать
    this.budget = +salaryAmount.value;
    this.getExpenses(); // *
    this.getIncome(); // *
    this.getExpensesMonth(); // *расчет обязательных расходов
    this.getAddExpenses(); // * расчет дополнительных расходов
    this.getAddIncome(); // * расчет дополнительных доходов

    this.getBudget(); // * по смыслу считаем бюджет на месяц и на день

    // *Блокировать все input[type=text] деактивируем все инпуты
    let inputText = document.querySelectorAll('.data input[type="text"]');
    inputText.forEach(function (inputItem) {
        inputItem.disabled = true;
    }, this);
    
    this.showResult(); // заполняем все поля с результатами справа

    start.style.display = 'none'; // * скрываем кнопку РАССЧИТАТЬ
    cancel.style.display = 'block'; // * отображаем кнопка СБРОСИТЬ

    // УДАЛЯЕМ слушатели с кнопок expensesPlus и incomePlus
    // expensesPlus.removeEventListener('click', eventAddExpensesBlock);
    // incomePlus.removeEventListener('click', eventAddIncomeBlock);    
    
    // * деактивируем кнопки + 
    expensesPlus.disabled = true;
    incomePlus.disabled = true;
    
    // * отключим чекбокс
    depositCheck.disabled = true;

    // отключение ползунока input range
    // periodSelect.disabled = true;
};


AppData.prototype.checkStart = function () {
    console.log('ПРОВЕРЯЕМ нужно активировать кнопку РАССЧИТАТЬ checkStart this', this);
    // let salaryAmount = document.querySelector('.salary-amount');
    // let start = document.getElementById('start');

    // if (salaryAmount.value.trim() === '') {
    //     start.disabled = true;
    // } else {
    //     start.disabled = false;  // start.removeAttribute('disabled');
    // }
};


AppData.prototype.showResult = function () {
    console.log('showResult this: ', this);
    // * showResult выводит результаты вычисления в правый блок data

    budgetMonthValue.value = Math.floor(this.budgetMonth); // * Округлить
    budgetDayValue.value = Math.floor(this.budgetDay); // * Округлить вывод дневного бюджета
    expensesMonthValue.value = this.expensesMonth;

    additionalExpensesValue.value = this.addExpenses.join(', '); // * собираем назад весь масиив в строку
    additionalIncomeValue.value = this.addIncome.join(', '); // * собираем назад весь массив в строку для вывода в поле

    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcIncomePeriodValue();

    periodSelect = document.querySelector('input.period-select');

    // * добавить addEventListener() и убрать removeEventListener()
    const _this = this;
    periodSelect.removeEventListener('input', _this.changePeriodAmount.bind(_this));
    periodSelect.addEventListener('input', _this.changePeriodAmount.bind(_this));
};


AppData.prototype.addExpensesBlock = function () {
    console.log('addExpensesBlock this: ',  this);

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
    // this.setListeners();
};


AppData.prototype.addIncomeBlock = function () {
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
    // this.setListeners();
};


AppData.prototype.getExpenses = function () {
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
};


AppData.prototype.getIncome = function () {
    // *
    //подсчет дополнительных доходов
    let _this = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value.trim();
        let cashIncome = item.querySelector('.income-amount').value.trim();
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = +parseFloat(cashIncome);
        } else {
            //? console.log('Заполнены не все поля дополнительных доходов');
            return; //?
        }
    }, this);
    //* обнуляем доходы в самом начале и суммируем доп доходы за месяц заново
    this.incomeMonth = 0;
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};


AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(', '); //разбираем строку на массив
    this.addExpenses = []; //обнуляем переменную
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    }, this); //forEach context this
};


AppData.prototype.getAddIncome = function () {
    this.addIncome = [];
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    }, this); //forEach context this
};


AppData.prototype.getExpensesMonth = function () {
    let sum = 0; //обнуляем переменную перед новым суммированием
    // расчет обязательныз расходов суммируем по полям expenses
    for (let key in this.expenses) {
        //проверка на собственное свойство
        if (this.expenses.hasOwnProperty(key)) {
            sum += +this.expenses[key];
        }
    }
    this.expensesMonth = sum;
};


AppData.prototype.getBudget = function () {
    //расчет бюджетов
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30; //? округляем
};

AppData.prototype.getTargetMonth = function () {
    //за сколько месяцев будет достигнута цель
    return targetAmount.value / this.budgetMonth;
};


AppData.prototype.getStatusIncome = function () {
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
};


AppData.prototype.getInfoDeposit = function () {
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
};


AppData.prototype.calcIncomePeriodValue = function () { ///*calcPeriod()
    // * возвращает накопления за период расчета
    return this.budgetMonth * periodSelect.value;
};


AppData.prototype.changePeriodAmount = function () {
    console.log('changePeriodAmount', this);
    // * изменяет значение поля periodAmount под ползунком range periodSelect
    let value = periodSelect.value;
    periodAmount.textContent = value;
    // * изменяет значение поля накопления за период при движении ползунка
    incomePeriodValue.value = this.calcIncomePeriodValue();
};


AppData.prototype.reset = function () {
    // * сбрасываем значения переменных свойств объекта
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;

    // * удаляем лишние блоки расходов
    expensesItems = document.querySelectorAll('.expenses-items'); // expenses block узнаем текущее состояние блока
    while (expensesItems.length >= 2) {
        expensesItems[0].remove();
        expensesItems = document.querySelectorAll('.expenses-items');
    }
    // * удаляем лишние блоки доходов
    incomeItems = document.querySelectorAll('.income-items'); // expenses block узнаем текущее состояние блока
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
    // * ПРОСТО активируем кнопки
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

    // * ресет ползунок в начальное положение
    periodSelect.disabled = false;
    periodSelect.value = 1;
    periodAmount.textContent = '1';
    
    cancel.style.display = 'none'; //* прячем кнопку Сбросить
    start.style.display = 'block'; //* показываем кнопку Расчитать
    start.disabled = true; // * деактивируем кнопку Расчитать
    
    // * ресет для чекбокса
    depositCheck.disabled = false;
    depositCheck.checked = false;
};

AppData.prototype.setListeners = function () {
    // * навешивает все слушатели
    console.log('setListeners :', this)

    // * вешаем клик на кнопку start Расчитать
    // * Привязать контекст вызова функции start к appData 
    start.addEventListener('click', this.start.bind(this));
    // start.disabled = true; // * деактивируем или активируем кнопку Рассчитать
    start.disabled = (salaryAmount.value.trim() === '');
    
    // * start button зависит от состояния поля salaryAmount
    // ! в данном случае Я СЧИТАЮ событие change более уместно!
    salaryAmount.addEventListener('change', function(event) {
        console.log('salaryAmount.value', salaryAmount.value);
        // if (salaryAmount.value.trim() === '') {
        //     start.disabled = true;
        // } else {
        //     start.disabled = false;
        // }
        start.disabled = (salaryAmount.value.trim() === '');
    })

    // * ...появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset()
    cancel.addEventListener('click', this.reset.bind(this));

    // * клик на кнопку плюс expensesPlus и incomePlus
    // expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
    // incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
    // expensesPlus.addEventListener('click', eventAddExpensesBlock);
    // incomePlus.addEventListener('click', eventAddIncomeBlock);
    // ! ПОЧЕМУ ВОТ ЗДЕСЬ СЛУШАТЕЛЬ НЕ УДАЛЯЕТСЯ !!!
    expensesPlus.removeEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.removeEventListener('click', this.addIncomeBlock.bind(this));
    
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));

    // * Число под полоской (input type range) должно меняться в зависимости от позиции range, 
    periodSelect.addEventListener('input', this.changePeriodAmount.bind(this)); //с привязкой контекста


    // * изменения ввода в поле salaryAmount слушатель на input (или на change)
    // salaryAmount.addEventListener('input', _this.checkStart.bind(_this)); // активирует кнопку Расчитать почле ввода
    salaryAmount.addEventListener('input', this.checkStart); // активирует кнопку Расчитать почле ввода

    // * находим поля для заполнения по значению placeholder
    const inputString = document.querySelectorAll('input[placeholder="Наименование"]');
    const inputNumber = document.querySelectorAll('input[placeholder="Сумма"]');
    // * цепляем соответствующие слушатели на соответствующие элементы input
    inputString.forEach(function (item) {
        item.addEventListener('input', handleCyrChars);
    });
    inputNumber.forEach(function (item) {
        item.addEventListener('input', handleNubmers);
    });
};



// * НАШ ОБЪЕКТ ПРИЛОЖЕНИЯ
let appData = new AppData();

// * ссылки на частрые функции явно привязанные к объекту appData
// const eventAddExpensesBlock = appData.addExpensesBlock.bind(appData);
// const eventAddIncomeBlock = appData.addIncomeBlock.bind(appData);

appData.setListeners(); //*
