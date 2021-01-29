'use strict';
/**
 * Lesson02
 */

let money,          //доход за месяц
    income,         //строка с доп доходом
    addExpenses = '',//строка через ,,, доп расходы
    deposit,        //есть ли депозит
    mission,        //цель накопить сумму
    period;         //за какой период


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + 'месяцев');
console.log('Цель заработать ' + mission + 'рублей/долларов/гривен/юани');

console.log(addExpenses.toLowerCase());


let budgetDay = money / 30; //дневной бюджет


console.log(budgetDay);
