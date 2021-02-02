'use strict';
/**
 * Lesson03
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
    // budgetMonth,        //бюджет на месяц
    // budgetDay;          //бюджет на день


console.log(typeof money);  //number
console.log(typeof income); //string
console.log(typeof deposit);//boolean


console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');

console.log(addExpenses);
console.log(addExpenses.toLowerCase().split(', '));


let budgetMonth = money - (amount1 + amount2);  //вычисляем бюджет на месяц = доходы -минус- расходы
console.log('Бюджет на месяц',  budgetMonth);

period = Math.ceil(mission / budgetMonth);  //вычисляем период достижения цели
console.log('Период достижения цели', period, 'месяцев(-а)');

let budgetDay = Math.floor(budgetMonth / 30); //вычисляем дневной бюджет
console.log('Бюджет на день', budgetDay);


//условия уровня дохода
//идем от меньшего к большему
/*
if (budgetDay <= 0) {
    //отрицательные числа
    console.log('Что-то пошло не так');
} else if (budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else {
    console.log('У вас высокий уровень дохода');
}
*/


//идем от большего в меньшему
if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что-то пошло не так');
}
