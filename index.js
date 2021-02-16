'use strict';
/**
 * * Lesson11
 */
/** 
 * ! регулярное выражение
 * todo сделать это оранжевым
 * ? ^[?!,.а-яА-ЯёЁ0-9\s]+$  кириллица пробелы и знаки
 * ? /^[?!.,a-zA-Z0-9\s]+$/ english symbols 
 * ? ^beginstring    endofstring$
 */

 //buttons
const start = document.getElementById('start');   //? startBtn
const cancel = document.getElementById('cancel'); //? cancelBtn

const btnPlus = document.getElementsByTagName('button'); //NodeList buttons 0, 1, ..

//! data весь блок с input слева
const salaryAmount = document.querySelector('.salary-amount'); //Месячный доход salary
// * const incomeTitle = document.querySelector('input.income-title'); //Дополнительный доход income title
// * const incomeAmount = document.querySelector('input.income-amount'); //Дополнительный доход income размер
let incomeItems = document.querySelectorAll('.income-items'); // * 28:30

const incomePlus = btnPlus[0]; //? incomePlus КНОПКА + добавить поле ввода поля дополнительных доходов

const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); //? Возможный доход через запятую
const expensesTitle = document.querySelector('input.expenses-title'); // Обязательные расходы наименование
const expensesAmount = document.querySelector('input.expenses-amount'); // Обязательные расходы размер
let expensesItems = document.querySelectorAll('.expenses-items'); // * 08:22 block

const expensesPlus = btnPlus[1]; //? expensesPlus КНОПКА + добавить поле ввода поля дополнительных расходов

const additionalExpenses = document.querySelector('additional_expenses');
const additionalExpensesItem = document.querySelector('input.additional_expenses-item'); // Возможные расходы <span>(перечислите через запятую)</span>
const depositCheck = document.querySelector('#deposit-check'); //? check галочка наличие депозита
const selectDepositBank = document.querySelector('.deposit-bank'); //* выбор банка скрыто
const depositAmount = document.querySelector('.input.deposit-amount'); //сумма депозита .deposit-calc скрыто
const depositPercent = document.querySelector('.input.deposit-percent'); //процент депозита .deposit-calc скрыто
const targetAmount = document.querySelector('.target-amount'); //* 24:55 цель сумма
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



//функция проверки ввода числа на цисле
const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};


// ! основные данные приложения в объекте appData
let appData = {
    
    budget: 0,  // *
    income: {},   // основной доход
    addIncome: [], // доп доход

    expenses: {},    // обязательные расходы
    addExpenses: [], // доп расходы
    
    deposit: false, //есть ли депозит
    percentDeposit: 0,
    moneyDeposit: 0,

    budgetDay: 0, //бюджет на день
    budgetMonth: 0, //бюджет на месяц
    expensesMonth: 0, // расходы на месяц
    incomeMonth: 0,
    
    start: function () { //? запускает наше приложение при клике на РАСЧИТАТЬ
/**
 *  TODO ВРЕМЕННО ОТКЛЮЧИЛ ПРОВЕРКУ ДЛЯ ОТЛАДКИ */     
        if (salaryAmount.value === '') {  //проверка на пустую строку
            alert('Ошибка, поле Месячный доход должно быть заполнено');
            console.log('Ошибка, поле Месячный доход должно быть заполнено');
            return;
        }
 
        appData.budget = +salaryAmount.value;
        console.log('salaryAmount.value: ', salaryAmount.value);
        
        appData.getExpenses(); // * 09:45
        appData.getIncome(); // ! ДЗ 11

        appData.getExpensesMonth(); //расчет обязательных расходов
        appData.getAddExpenses();
        appData.getAddIncome();
        //? appData.getInfoDeposit(); //расчет информации по депозиту

        appData.getBudget(); // по смыслу считаем бюджет на месяц и на день
        appData.showResult(); // заполняем все поля с результатами справа
    },

    showResult: function () { // * 14:00
        //выводим результаты вычисления в правый блок data
        //* let value = salaryAmount.value; //? TEST 
        //* value %= 12; //? TEST
        //* periodSelect.value = value; //? НОВОЕ ЗНАЧЕНИЕ INPUT RANGE
        //* periodAmount.textContent = value;

        budgetMonthValue.value = Math.floor(appData.budgetMonth); //! Округлить
        budgetDayValue.value = Math.floor(appData.budgetDay); //! 3) Округлить вывод дневного бюджета
        expensesMonthValue.value = appData.expensesMonth;

        additionalExpensesValue.value = appData.addExpenses.join(', '); // * 18:35 собираем назад в строку
        additionalIncomeValue.value = appData.addIncome.join(', '); // * 22:34 весь массив для вывода в поле

        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcIncomePeriodValue();

        periodSelect = document.querySelector('input.period-select');
        
        
        // ! добавить addEventListener()
        // ! и убрать removeEventListener()
        //! 5) Добавить обработчик события внутри метода showResult, который будет отслеживать период 
        //! и сразу менять значение в поле “Накопления за период” (После нажатия кнопки рассчитать, 
        //! если меняем ползунок в range, “Накопления за период” меняются динамически аналогично 4-ому пункту)
        periodSelect.removeEventListener('input', appData.changePeriodAmount, false);
        periodSelect.addEventListener('input', appData.changePeriodAmount);
    },

    addExpensesBlock: function () { // * добавление новых полей дополнительных расходов плюсику // expensesPlus
       
        let cloneExpensesItems = expensesItems[0].cloneNode(true); // *7 клонируем блок делаем глубокую копию true
        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus); //вставляем копию блока до кнопки
        
        expensesItems = document.querySelectorAll('.expenses-items'); // * 06:50 block узнаем текущее состояние блока
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none'; //прячим кнопку после 3го раза
        }
        //console.log("добавить новый блок расходов");
    },

    addIncomeBlock: function () {
        // ! ДЗ 11
        let cloneIncomeBlock = incomeItems[0].cloneNode(true); //? глубоко кловнируем блок
        cloneIncomeBlock.querySelector('.income-title').value = ''; //? очищаем наименование
        cloneIncomeBlock.querySelector('.income-amount').value = ''; //? очищаем доход
        incomeItems[0].parentElement.insertBefore(cloneIncomeBlock, incomePlus); //? добавляем перед кнопкой

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none'; //прячим кнопку после 3го раза
            console.log("прячем кнопку");
        }
        // console.log("добавить новый блок доходов");
    },

    getExpenses: function () { // * 09:00
        // проходимся по ключ:значению
        expensesItems.forEach(function (item) {
            // * 11:00 получаем значения инпутов
            let itemExpenses = item.querySelector('.expenses-title').value.trim();
            let cashExpenses = item.querySelector('.expenses-amount').value.trim();
            // проверка на пустые поля
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses; //number
            } else {
                console.log('Необходимо заполнить поля обязательных расходов'); //?
                return; //?
            }
        });
    },

    getIncome: function () { //подсчет дополнительных доходов
        //!!!! на ДЗ 11
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value.trim();
            let cashIncome = item.querySelector('.income-amount').value.trim();
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            } else {
                console.log('Заполнены не все поля дополнительных доходов');
                return; //?
            }
        });
        //* обнуляем доходы в самом начале и суммируем доп доходы за месяц заново
        appData.incomeMonth = 0;
        for (let key in appData.income) {  
            appData.incomeMonth += +appData.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(', '); //разбираем строку на массив
        appData.addExpenses = []; //обнуляем переменную
        //перебираем массив по элементам
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        appData.addIncome = [];

        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function() {
        let sum = 0; //обнуляем переменную перед новым суммированием
        // расчет обязательныз расходов суммируем по полям expenses
        for (let key in appData.expenses) {
            //проверка на собственное свойство
            if (appData.expenses.hasOwnProperty(key)) {
                // appData.expensesMonth += +appData.expenses[key]; //?
                sum += +appData.expenses[key];
            }
        }
        appData.expensesMonth = sum;
    },

    getBudget: function() {
        //расчет бюджетов
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        // appData.budgetDay = Math.floor(appData.budgetMonth / 30); //? округляем
        appData.budgetDay = appData.budgetMonth / 30; //? округляем
    },
 
    getTargetMonth: function() {
        //за сколько месяцев будет достигнута цель
        // let periodMission = targetAmount.value / appData.budgetMonth;
        return targetAmount.value / appData.budgetMonth;
    },
        
    getStatusIncome: function() {
        //возвращает результат вычислений уровня средних доходов на день
        if (appData.budgetDay >= 1200) {
            return 'Поздравляем!\nУ вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что-то пошло не так';
        }
    },
    getInfoDeposit: function() {
        //спрашиваем и вычисляем информацию о депозите 
        //а также в методе asking спрашиваем appData.deposit
        if(appData.deposit) {
            //проверка ввода процента депозита
            do {
                appData.percentDeposit = prompt('Какой годовой процент? Введите число', '10');
            } while (!isNumber(appData.percentDeposit));
            appData.percentDeposit = +appData.percentDeposit;

            //проверка ввода суммы депозита
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена в депосит? Введите число', 10000);
            } while (!isNumber(appData.moneyDeposit));
            appData.moneyDeposit = +appData.moneyDeposit;
        }
    },
    calcIncomePeriodValue: function () {
        // * возвращает накопления за период расчета
        // console.log('calcIncomePeriodValue:', appData.budgetMonth*periodSelect.value);
        return appData.budgetMonth * periodSelect.value;
    },
    changePeriodAmount: function () {
        // * изменяет значение поля periodAmount под ползунком range periodSelect
        let value = periodSelect.value;
        console.log('showresult value', value);
        periodAmount.textContent = value;
        // * изменяет значение поля накопления за период при движении ползунка
        incomePeriodValue.value = appData.calcIncomePeriodValue();
    }
}; //appData



//! привязываем слушатели событий !//

// * вешаем клик на кнопку start Расчитать
start.addEventListener('click', appData.start);

// * клик на кнопку плюс expensesPlus и incomePlus
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

//! 4) Число под полоской (input type range) должно меняться в зависимости от позиции range, используем событие input
periodSelect.addEventListener('input', event => {
    let value = event.target.value;
    console.log('Global value: ', value);
    periodAmount.textContent = value;
});





// * 2 Вызвать все необходимые методы после объекта (порядок очень важен)
// * перенесли в asking()
//appData.asking(); //спрашиваем пользователя
//appData.getExpensesMonth(); //расчет обязательных расходов
//appData.getBudget(); //по смыслу countBudget() считаем бюджет на месяц и на день
//appData.getInfoDeposit(); //расчет информации по депозиту



// *console.log('button: ', btnPlus);
//*console.log('salaryAmount: ', salaryAmount);
//*console.log('incomeTitle: ', incomeTitle);
//*console.log('incomeAmount: ', incomeAmount);
//*console.log('incomePlus: ', incomePlus);
//*console.log('additionalIncomeItem: ', additionalIncomeItem);
//*console.log('expensesItems: ', expensesItems);
//*console.log('expensesTitle: ', expensesTitle);
//*console.log('expensesAmount: ', expensesAmount);
//*console.log('expensesPlus: ', expensesPlus);
//*console.log('additionalExpensesItem: ', additionalExpensesItem);
//*console.log('depositCheck: ', depositCheck);
//*console.log('selectDepositBank: ', selectDepositBank);
//*console.log('depositAmount: ', depositAmount);
//*console.log('depositPercent: ', depositPercent);
//*console.log('targetAmount: ', targetAmount);
//*console.log('periodSelect: ', periodSelect);
//*console.log('periodAmount: ', periodAmount);
//*console.log('budgetMonthValue: ', budgetMonthValue);
//*console.log('budgetDayValue: ', budgetDayValue);
//*console.log('expensesMonthValue: ', expensesMonthValue);
//*console.log('additionalIncomeValue: ', additionalIncomeValue);
//*console.log('additionalExpensesValue: ', additionalExpensesValue);
//*console.log('accumulatedMonthValue: ', accumulatedMonthValue);
//*console.log('incomePeriodValue: ', incomePeriodValue);
//*console.log('targetMonthValue: ', targetMonthValue);
//*console.log('start: ', start);
//*console.log('cancel: ', cancel);

