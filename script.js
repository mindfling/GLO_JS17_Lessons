'use strict';
/**
 * Lesson02
 */

let money = 67000,      //доход за месяц
    income = 'фриланс', //строка с доп доходом
    addExpenses = 'такси, комуналка',   //строка через ,запятую, доп расходы
    deposit = true,     //есть ли депозит
    mission = 100000,   //цель накопить сумму
    period = 12;        //за какой период


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');


console.log(addExpenses.toLowerCase().split(', '));


let budgetDay = money / 30; //дневной бюджет

console.log(budgetDay);
