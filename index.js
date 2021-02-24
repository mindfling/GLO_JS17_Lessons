'use strict';
/**
 * * Lesson15
 */

// ? функция проверки ввода числа нужна ли?
// const isNumber = number => !isNaN(parseInt(number)) && isFinite(number);


 //! buttons
const startBtn = document.getElementById('start');   //? startBtn кнопка Рассчитать start()
const cancelBtn = document.getElementById('cancel'); //? cancelBtn кнопка Сбросить cancel reset()
const btnPlus = document.getElementsByTagName('button'); //NodeList buttons 0, 1, ..

//! data весь блок с input слева
const salaryAmount = document.querySelector('.salary-amount'); //Месячный доход salary
let incomeItems = document.querySelectorAll('.income-items'); // Блок Дополнительный доход //? ОБНОВЛЯЕТСЯ
const incomePlus = btnPlus[0]; //? incomePlus КНОПКА + добавить поле ввода поля дополнительных доходов
const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); //? Возможный доход через запятую ,
const expensesTitle = document.querySelector('input.expenses-title'); // Обязательные расходы наименование
const expensesAmount = document.querySelector('input.expenses-amount'); // Обязательные расходы размер
let expensesItems = document.querySelectorAll('.expenses-items'); // Блок Обязательные расходы //? ОБНОВЛЯЕТСЯ
const expensesPlus = btnPlus[1]; //? expensesPlus КНОПКА + добавить поле ввода поля дополнительных расходов
const additionalExpenses = document.querySelector('additional_expenses');
const additionalExpensesItem = document.querySelector('input.additional_expenses-item');//Возможные расходы через , ,
const depositCheck = document.querySelector('#deposit-check'); //? check галочка наличие депозита
const selectDepositBank = document.querySelector('.deposit-bank'); // выбор банка скрыто
const depositAmount = document.querySelector('.input.deposit-amount'); //сумма депозита .deposit-calc скрыто
const depositPercent = document.querySelector('.input.deposit-percent'); //процент депозита .deposit-calc скрыто
const targetAmount = document.querySelector('.target-amount'); // цель сумма
const periodSelect = document.querySelector('input.period-select'); //Выбор Периода расчета //? LET
const periodAmount = document.querySelector('.period-amount'); //Период расчета отображение

//! result весь блок с результатами справа //
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0]; //? Доход за месяц
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0]; //? Дневной бюджет
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0]; //? Расход за месяц
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0]; // Возможные доходы
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]; // Возможные расходы
const accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value'); //? accumulatedMonthValue
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0]; //? Накопления за период 
const targetMonthValue = document.getElementsByClassName('target_month-value')[0]; // Срок достижения цели в месяцах



// ! ДЗ 15 КЛАСС AppData перепишем в новом формате ES6
//* fields Поля свойства внутри конструктора (можно инициировать как простые переменные)

class AppData {
    constructor() {
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
    }

// * методы класса в ES6

    handleCyrChars(event) {
        // * регулярка заменяет все символы кириллицы не зависимо от регистра
        // ТОЖЕ САМОЕ .replace(/[^\?\!,\.а-яА-ЯёЁ\s]/g, '')
        event.target.value = event.target.value.replace(/[^\?\!,\.а-яё\s]/ig, ''); 
    }
    handleNubmers(event) {
        // * срабатывает на замену всех символов которые не подходят под шаблон отличных от цифр
        event.target.value = event.target.value.replace(/[^\d.]/g, ''); // тоже что и .replace(/[^0-9.]/g, '')
    }
    start() {
        // * при нажатии на кнопку Рассчитать
        this.budget = +salaryAmount.value;
        this.getExpenses(); // *
        this.getIncome(); // *
        this.getExpensesMonth(); // *расчет обязательных расходов
        this.getAddExpenses(); // * расчет дополнительных расходов
        this.getAddIncome(); // * расчет дополнительных доходов

        this.getBudget(); // * по смыслу считаем бюджет на месяц и на день

        // * деактивируем все инпуты input[type=text] 
        let inputText = document.querySelectorAll('.data input[type="text"]');

        // inputText.forEach(function (inputItem) {
        //     inputItem.disabled = true;
        // }, this); // здесь передаем , this как контекст вызова :)

        inputText.forEach( (inputItem) => {
            inputItem.disabled = true;
        });
        // * здесь когда используем стрелочные функции передавать this контекст вызова НЕ НУЖНО

        this.showResult(); // заполняем все поля с результатами справа


        startBtn.style.display = 'none'; // * скрываем кнопку РАССЧИТАТЬ
        cancelBtn.style.display = 'block'; // * отображаем кнопка СБРОСИТЬ

        // * деактивируем кнопки +
        expensesPlus.disabled = true;
        incomePlus.disabled = true;

        // * деактивируем чекбокс
        depositCheck.disabled = true;

        // отключение ползунока input range // * НЕ ОТКЛЮЧАЕМ
        // periodSelect.disabled = true;
    }
    showResult() {
        // console.log('showResult this: ', this);
        // * showResult выводит результаты вычисления в правый блок data
        budgetMonthValue.value = Math.floor(this.budgetMonth); // * Округлить
        budgetDayValue.value = Math.floor(this.budgetDay); // * Округлить вывод дневного бюджета
        expensesMonthValue.value = this.expensesMonth;

        additionalExpensesValue.value = this.addExpenses.join(', '); // * собираем назад весь масиив в строку
        additionalIncomeValue.value = this.addIncome.join(', '); // * собираем назад весь массив в строку для вывода

        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcIncomePeriodValue();

        //? periodSelect = document.querySelector('input.period-select'); //? без этого РАБОТАЕТ

        // * добавить addEventListener() и убрать removeEventListener()
        periodSelect.removeEventListener('input', this.changePeriodAmount.bind(this));
        periodSelect.addEventListener('input', this.changePeriodAmount.bind(this));
    }
    addExpensesBlock() {
        // console.log('addExpensesBlock this: ',  this);
        // * добавить новый блок Обязательные расходы
        let cloneExpensesItems = expensesItems[0].cloneNode(true); // * клонируем блок делаем глубокую копию true
        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus); //вставляем копию блока до кнопки

        expensesItems = document.querySelectorAll('.expenses-items'); // * expenses block узнаем текущее состояние блока
        if (expensesItems.length >= 3) {
            expensesPlus.style.display = 'none'; // * прячим кнопку после 3го раза
        }
        // * в конце еще раз вешаем слушатели на наши поля
        //? повторный поиск и навешивание событий этих полей

        document.querySelectorAll('input[placeholder="Наименование"]').forEach( (item) => {
            item.addEventListener('input', this.handleCyrChars);
        }); // * 
        
        document.querySelectorAll('input[placeholder="Сумма"]').forEach( (item) => {
            item.addEventListener('input', this.handleNubmers);
        }); // * 
        
    }
    addIncomeBlock() {
        // * добавить новый блок доходов
        let cloneIncomeBlock = incomeItems[0].cloneNode(true); //? глубоко кловнируем блок
        cloneIncomeBlock.querySelector('.income-title').value = ''; //? очищаем наименование
        cloneIncomeBlock.querySelector('.income-amount').value = ''; //? очищаем доход
        incomeItems[0].parentElement.insertBefore(cloneIncomeBlock, incomePlus); //? добавляем перед кнопкой

        incomeItems = document.querySelectorAll('.income-items'); // * опять получаем обновленную коллекцию
        if (incomeItems.length >= 3) {
            incomePlus.style.display = 'none'; //прячим кнопку после 3го раза
        }
        // * в конце еще раз вешаем слушатели на новые поля
        
        //? НЕБОЛЬШОЙ КОСТЫЛЬ повторный поиск и навешивание событий этих полей
        document.querySelectorAll('input[placeholder="Наименование"]').forEach( (item) => {
            item.addEventListener('input', this.handleCyrChars);
        });  // *

        document.querySelectorAll('input[placeholder="Сумма"]').forEach( (item) => {
            item.addEventListener('input', this.handleNubmers);
        });  // *

    }
    getExpenses() {
        // *
        // проходимся по ключ-значению полей подсчет расходов
        expensesItems.forEach( (item) => {
            let itemExpenses = item.querySelector('.expenses-title').value.trim();
            let cashExpenses = item.querySelector('.expenses-amount').value.trim();
            // проверка на пустые поля
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = parseFloat(cashExpenses);
            } else {
                return; //? Заполнены не все поля расходов
            }
        });
    }
    getIncome() {
        // *
        //подсчет дополнительных доходов
        incomeItems.forEach( (item) => {
            let itemIncome = item.querySelector('.income-title').value.trim();
            let cashIncome = item.querySelector('.income-amount').value.trim();
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +parseFloat(cashIncome);
            } else {
                return; //? Заполнены не все поля дополнительных доходов
            }
        });

        //* обнуляем доходы в самом начале и суммируем доп доходы за месяц заново
        this.incomeMonth = 0;
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(', '); //разбираем строку на массив
        this.addExpenses = []; //обнуляем переменную для суммирования
        addExpenses.forEach( item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }); // *
    }
    getAddIncome() {
        this.addIncome = [];
        additionalIncomeItem.forEach( item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }); // *
    }
    getExpensesMonth() {
        let sum = 0;
        // расчет обязательныз расходов суммируем по полям expenses
        for (let key in this.expenses) {
            //проверка на собственное свойство
            if (this.expenses.hasOwnProperty(key)) {
                sum += +this.expenses[key];
            }
        }
        this.expensesMonth = sum;
    }
    getBudget() {
        //расчет бюджетов
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30; //? округляем
    }
    getTargetMonth() {
        //за сколько месяцев будет достигнута цель
        return targetAmount.value / this.budgetMonth;
    }

    // AppData.prototype.getStatusIncome = ...

    // AppData.prototype.getInfoDeposit = ...

    calcIncomePeriodValue() {
        // * возвращает накопления за период расчета
        return this.budgetMonth * periodSelect.value;
    }
    changePeriodAmount() {
        // * изменяет значение поля periodAmount под ползунком range periodSelect
        let value = periodSelect.value;
        
        value += ''; // убедимся что это строка
        if (value === '1') {
            value += ' Месяц';
        } else if (/^[234]$/.test(value)) {
            value += ' Месяца';
        } else if (value.match(/^[56789]|1[012]$/)) {
            value += ' Месяцев';
        }
        periodAmount.textContent = value;

        // * изменяет значение поля накопления за период при движении ползунка
        incomePeriodValue.value = this.calcIncomePeriodValue();
    }
    reset() {
        // * сбрасываем значения переменных свойств объекта ЗАНОВО ИНИЦИАЛИЗИРУЕМ возвращаем к начальному состоянию
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
            expensesItems = document.querySelectorAll('.expenses-items'); // снова обновляем так безопасней
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

        // * ПРОСТО активируем кнопки
        expensesPlus.disabled = false;
        incomePlus.disabled = false;

        // * очищаем и активируем поля слева
        let inputText = document.querySelectorAll('.data input[type="text"]');
        inputText.forEach( (inputItem) => {
            inputItem.disabled = false; // * активируем поля
            inputItem.value = ''; // * очищаем поля
        });
        // * очищаем поля справа
        let resultInputs = document.querySelectorAll('.result input');
        resultInputs.forEach( (inputItem) => {
            inputItem.value = ''; // * очищаем поля
        });

        // * ресет ползунок в начальное положение
        periodSelect.disabled = false;
        periodSelect.value = 1;
        periodAmount.innerHTML = '&nbsp;'; // * обновляем в пустое поле внутреннее html содержимое*

        cancelBtn.style.display = 'none'; // * прячем кнопку Сбросить
        startBtn.style.display = 'block'; // * показываем кнопку Расчитать
        startBtn.disabled = true; // * деактивируем кнопку Расчитать

        // * чекбокс возвращаем в начальное состояние
        depositCheck.disabled = false;
        depositCheck.checked = false;
    }
    setListeners() {
        // * навешивает все слушатели
        // console.log('setListeners :', this);
        // * вешаем клик на кнопку start Расчитать
        // * Привязать контекст вызова функции start к appData 
        startBtn.addEventListener('click', this.start.bind(this));
        // * деактивируем или активируем кнопку Рассчитать
        startBtn.disabled = (salaryAmount.value.trim() === '');

        // * start button зависит от состояния поля salaryAmount
        salaryAmount.addEventListener('change', () => {
            startBtn.disabled = (salaryAmount.value.trim() === '');
        });

        // * ...появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset()
        cancelBtn.addEventListener('click', this.reset.bind(this));

        // * клик на кнопку плюс expensesPlus и incomePlus
        // ! ПОЧЕМУ ВОТ ЗДЕСЬ СЛУШАТЕЛЬ НЕ УДАЛЯЕТСЯ !!!
        // expensesPlus.removeEventListener('click', this.addExpensesBlock.bind(this));
        // incomePlus.removeEventListener('click', this.addIncomeBlock.bind(this));

        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));

        // * Число под полоской (input type range) должно меняться в зависимости от позиции range, 
        periodSelect.addEventListener('input', this.changePeriodAmount.bind(this)); //с привязкой контекста

        // * находим поля для заполнения по значению placeholder
        const inputString = document.querySelectorAll('input[placeholder="Наименование"]');
        const inputNumber = document.querySelectorAll('input[placeholder="Сумма"]');

        // * цепляем соответствующие слушатели на соответствующие элементы input
        inputString.forEach( (item) => {
            item.addEventListener('input', this.handleCyrChars);
        });
        inputNumber.forEach( (item) => {
            item.addEventListener('input', this.handleNubmers);
        });
    }
}


// * НАШ ОБЪЕКТ ПРИЛОЖЕНИЯ
const appData = new AppData();
appData.setEventListeners();

