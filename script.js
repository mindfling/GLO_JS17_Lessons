'use strict';
/**
 * Lesson04
 */

let money = +prompt('Ваш месячный доход', 67000),//доход за месяц
    income = 'фриланс', //строка с доп доходом
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода, газ'),//доп расходы
    deposit = confirm('Есть ли у вас депозит в банке?', true),//есть ли депозит
    mission = 100000,   //цель накопить сумму
    period = 12,        //за какой период

    expenses1 = prompt('Введите обязательную статью расходов', 'Детский садик'),
    amount1 = +prompt('Во сколько это обойдется?', 5500),
    expenses2 = prompt('Введите обязательную статью расходов', 'Курсы повышения'),
    amount2 = +prompt('Во сколько это обойдется?', 3000);


//1 Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = function() {
    return amount1 + amount2;
};



const showTypeOf = function(data) {
    console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// console.log(typeof money);  //number
// console.log(typeof income); //string
// console.log(typeof deposit);//boolean

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');

console.log(addExpenses);
console.log(addExpenses.toLowerCase().split(', '));


//вычисляем бюджет на месяц = доходы -минус- расходы
let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц',  budgetMonth);


//вычисляем период достижения цели
//за сколько целых месяцев мы сможем накопить
//на нашу цель из остатка за месяц
let periodMission = Math.ceil(mission / budgetMonth);
console.log('Период достижения цели', periodMission, 'месяцев(-а)');


//вычисляем дневной бюджет
let budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день', budgetDay);


//сделаем чистую функцию
const getStatusIncome = function() {
    //условия уровня дохода
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay > 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что-то пошло не так';
    }
    
};

console.log(getStatusIncome());
