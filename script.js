'use strict';
/**
 * Lesson07
 */


//функция проверки ввода числа на цисле
/**
 * @param {строка} number 
 * возвращает true если строку number можно полностью перевести в число
 */
const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};
//!isNaN(parseInt()) // проверяет парсинг строки в число
//isFinite() // отсеивает вообще символьные строки



//вот так вводим наш доход за месяц
//создадим функцию старт
let money = 0;
const start = function () {
    do {
            money = prompt('Введите ваш месячный доход в цифрах');
        }
        while (!isNumber(money));
    };
start();


//основные данные приложения в объекте
let appData = {
    budget: money, //свойство budget которое будет принимать значение money
    income: {},    // основноей доход
    addIncome: [], // доп доход
    expenses: {},    // обязательные расходы
    addExpenses: [], // доп расходы
    deposit: false, //есть ли депозит
    mission: 50000, //цель накопить сумму
    period: 12,  //за какой период мы планируем накопить
    
    asking: function() {
        //спрашиваем доп расходы
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода, газ');
        appData.addExpenses = addExpenses.toLowerCase().split(', '); //вывод массив с доп расходами
        appData.deposit = confirm('Есть ли у вас депозит в банке?', true); //есть ли депозит

        //7 Перенести цикл из метода  getExpensesMonth  в метод asking, 
        //и переписать цикл таким образом чтобы результат записывался в объект  appData.expenses
        for (let i = 0; i < 2; i++) {
            let expenseKey = prompt('Введите обязательную статью расходов');
            let answer = 0;
            /**
             * проверка на ввод числа
             */
            do {
                answer = prompt('Во сколько это обойдется, введите число', 1000);
            } while (!isNumber(answer)); //спрашивает пока не ввели число
            /**
             * TODO возможно проверить на наличие такого же ключа
             */
            // записываем обязательные расходы по ключам в обкт expenses
            appData.expenses[expenseKey] = answer;
        }//for
    },

    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,


    //9) getAccumulatedMonth переименовать в getBudget. 
    //Этот метод будет высчитывать значения свойств budgetMonth и budgetDay, 
    //чтобы вычислить значения используем только свойства объекта (никаких внешних переменных)
    getBudget: function() {
        let sum = 0;
        // let expenses = [];
        //8) Переписать метод getExpensesMonth: 
        //с помощью цикла считаем сумму всех обязательных расходов и 
        //для того, чтобы посчитать сумму используйте цикл for in
        // суммируем по expenses
        for (let key in appData.expenses) {
            //проверка на собственное свойство
            if (appData.expenses.hasOwnProperty(key)) {
                console.log('appData.expenses[key]:', key, appData.expenses[key]);
                sum += +appData.expenses[key];
            }
        }
        appData.expensesMonth = sum; //сохраняем результат в свойство expensesMonth нашего объекта

        //Этот метод будет высчитывать значения свойств budgetMonth и budgetDay
        //чтобы вычислить значения используем только свойства объекта (никаких внешних переменных)
        // appData.budgetMonth = appData.getAccumulatedMonth(money, appData.expensesMonth);
        appData.budgetMonth = appData.getAccumulatedMonth(appData.budget, appData.expensesMonth);
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getAccumulatedMonth: function(moneyMonth_, expensesMonth_) {
        //сколько накопили за месяц
        return moneyMonth_ - expensesMonth_;
    },

    //10) В методах getTargetMonth и getStatusIncome исправить переменные, 
    // все значения получаем от нашего объекта appData
    getTargetMonth: function() {
        //за сколько месяцев будет достигнута цель
        //перенесли сюда
        // let periodMission = appData.getTargetMonth(appData.mission, appData.budgetMonth);
        let periodMission = Math.ceil(appData.mission / appData.budgetMonth);
        
        //проверяем сможем накопить или нет и возвращаем результат
        if (periodMission > 0) {
            return 'Цель будет достигнута в течении ' + periodMission + ' месяцев(-в)';
        } else {
            return 'Цель не будет достигнута';
        }
        // return periodMission;
    },
        
    //10) В методах getTargetMonth и getStatusIncome исправить переменные, 
    // все значения получаем от нашего объекта appData
    getStatusIncome: function() {
        //условия уровня дохода
        //возвращает результат вычислений уровня средних доходов на день
        // moneyOnDay -> appData.budgetDay
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что-то пошло не так';
        }
    }
}; //appData

//6) Сразу после объекта выполните вызов appData.asking()
appData.asking();


//исправить вызов
// appData.expensesMonth = appData.getBudget();
appData.getBudget();

console.log('Расходы за месяц', appData.expensesMonth); //вывод расходов за месяц

console.log(appData.addExpenses); //вывод массив с доп расходами


//вычисляем бюджет на месяц = доходы -минус- расходы
// let accumulatedMonth = appData.getAccumulatedMonth(money, appData.expensesMonth);
// перемещаем в appData.getBudget()
// let accumulatedMonth = appData.getAccumulatedMonth(money, appData.expensesMonth);



//за сколько целых месяцев мы сможем накопить
//на нашу цель из остатка за месяц
//10) В методах getTargetMonth и getStatusIncome исправить переменные, 
//это действия внутри метода все значения получаем от нашего объекта appData
// let periodMission = appData.getTargetMonth(appData.mission, appData.budgetMonth);
console.log(appData.getTargetMonth());

// //проверяем сможем накопить или нет
// if (periodMission > 0) {
//     console.log('Цель будет достигнута в течении ' + periodMission + ' месяцев(-в)');
// } else {
//     console.log('Цель не будет достигнута');
// }


//вычисляем дневной бюджет
//из средств накопленных за день
//// перемещаем в appData.getBudget()
//appData.budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день', appData.budgetDay);


//сделаем функцию вычесления уровня доходов исходя из budgetDay
// console.log(appData.getStatusIncome(appData.budgetDay));
console.log(appData.getStatusIncome());
