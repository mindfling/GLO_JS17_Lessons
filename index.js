'use strict';
/**
 * * Lesson16
 */

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


const depositCheck = document.querySelector('#deposit-check'); //! check галочка наличие депозита
const selectDepositBank = document.querySelector('select.deposit-bank'); // выбор банка скрыто
const depositAmount = document.querySelector('input.deposit-amount'); //сумма депозита .deposit-calc скрыто
const depositPercent = document.querySelector('input.deposit-percent'); //процент депозита .deposit-calc скрыто


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



// ! ДЗ 16 КЛАСС AppData  
//* fields Поля свойства внутри конструктора (можно инициировать как простые переменные)
class AppData {
    constructor() {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false; // * наличие депозита
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
    }

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

        this.getInfoDeposit(); // * расчет депозита

        this.getBudget(); // * по смыслу считаем бюджет на месяц и на день

        // * деактивируем все инпуты input[type=text] слева
        let inputText = document.querySelectorAll('.data input[type="text"]');
        inputText.forEach( (inputItem) => {
            inputItem.disabled = true;
        });

        this.showResult(); // заполняем все поля с результатами справа

        startBtn.style.display = 'none'; // * скрываем кнопку РАССЧИТАТЬ
        cancelBtn.style.display = 'block'; // * отображаем кнопка СБРОСИТЬ

        // * деактивируем кнопки +
        expensesPlus.disabled = true;
        incomePlus.disabled = true;

        // * деактивируем чекбокс
        depositCheck.disabled = true;

        selectDepositBank.disabled = true;

        // ? ползунок отключать не нужно ? input range
        // periodSelect.disabled = true;
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

        // * возвращаем ползунок в начальное положение
        periodSelect.disabled = false;
        periodSelect.value = 1;
        periodAmount.innerHTML = '&nbsp;'; // * обновляем в пустое поле внутреннее html содержимое*

        startBtn.style.display = 'block'; // * показываем кнопку Расчитать
        startBtn.disabled = true; // * и сразу деактивируем кнопку Расчитать
        cancelBtn.style.display = 'none'; // * прячем кнопку Сбросить

        // * возвращаем чекбокс в начальное состояние
        depositCheck.disabled = false;
        depositCheck.checked = false;
        this.deposit = false;

        selectDepositBank.style.display = 'none';
        selectDepositBank.value = '';
        selectDepositBank.disabled = false;

        depositAmount.style.display = 'none';
        depositAmount.value = '';

        depositPercent.style.display = 'none';
        depositPercent.value = '';
    }
    showResult() {
        // * showResult выводит результаты вычисления в правый блок data
        budgetMonthValue.value = Math.floor(this.budgetMonth); // * Округлить
        budgetDayValue.value = Math.floor(this.budgetDay); // * Округлить вывод дневного бюджета
        expensesMonthValue.value = this.expensesMonth;

        additionalExpensesValue.value = this.addExpenses.join(', '); // * собираем назад весь масиив в строку
        additionalIncomeValue.value = this.addIncome.join(', '); // * собираем назад весь массив в строку для вывода

        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcIncomePeriodValue();

        // ??? добавить addEventListener() и убрать removeEventListener()
        periodSelect.removeEventListener('input', this.changePeriodAmount.bind(this));
        periodSelect.addEventListener('input', this.changePeriodAmount.bind(this));
    }
    addExpensesBlock() {
        // * добавить новый блок Обязательные расходы
        let cloneExpensesItems = expensesItems[0].cloneNode(true); // * клонируем блок делаем глубокую копию true
        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus); //вставляем копию блока до кнопки

        expensesItems = document.querySelectorAll('.expenses-items'); // * expenses block узнаем текущее состояние блока
        if (expensesItems.length >= 3) {
            expensesPlus.style.display = 'none'; // * прячим кнопку после 3го раза
        }
        // * в конце еще раз вешаем слушатели на наши новые поля
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
        let sum = 0; // ? где мы должны сбрасывать сумму здесь или в reset()
        // расчет обязательныз расходов суммируем по полям expenses
        for (let key in this.expenses) {
            if (this.expenses.hasOwnProperty(key)) { //проверка на собственное свойство
                sum += +this.expenses[key];
            }
        }
        this.expensesMonth = sum;
    }
    getBudget() {
        //! расчет депозита вычисляется годовой процент
        const monthDeposit = this.moneyDeposit * this.percentDeposit / 100; //! зачем Максим здесь поставил (скобки)??
        console.log('monthDeposit: ', monthDeposit);
        //расчет бюджетов
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = this.budgetMonth / 30; //? округляем
    }
    getTargetMonth() {
        //за сколько месяцев будет достигнута цель
        return targetAmount.value / this.budgetMonth;
    }

    // ? getStatusIncome() { ... }

    calcIncomePeriodValue() {
        // * возвращает накопления за период расчета
        return Math.round(this.budgetMonth * periodSelect.value);
    }
    changePeriodAmount() {
        // * изменяет значение поля periodAmount под ползунком range periodSelect допишем слово после цифр
        let value = '' + periodSelect.value;
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
    
    // ? AppData.prototype.getInfoDeposit = ...

    getInfoDeposit() {
        if (this.deposit) {
            //скрытые блоки все равно хранятся в памяти В этих полях можно хранить значения
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    myPercentNumberHandler(event) {
        let value = event.target.value;
        console.log(value);
        //проверка на ввод цифр и точки
        event.target.value = event.target.value.replace(/[^\d.]/g, '');
        //проверка на процент в пределах 0..100
        if (event.target.value < 0 || event.target.value > 100) {
            alert('Введите процент в пределах от 0% до 100%');
            event.target.value = '';
        }
    }
    changePercent() { //! selectBankPercentage()
        //? here this = selectDepositBank срабатывает при выборе селект банка
        const valueSelect = this.value;
        depositAmount.style.display = 'inline-block';
       
        if (valueSelect === 'other') {
            console.log('мы выбрали проценты other');
            //! ДЗ 16
            depositPercent.style.display = 'inline-block'; //! отобразить блок процентов other 
            //? depositPercent.addEventListener('input', this.myPercentNumberHandler); // ПЕРЕНЕСЛИ ОБРАБОТЧИКИ В setEventListeners()
            depositPercent.value = '';
            console.log('depositPercent.value: ', depositPercent.value);

        } else {
            depositPercent.style.display = 'none'; //убираем поле процент
            console.log('вы выбрали депозит под ' + valueSelect + ' % процентов');
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() { // ! depositCheckBoxHandler
        //  была поставлена галочка на чекбокс
        // this.deposit = depositCheck.checked;
        console.log('depositCheck.checked: ', depositCheck.checked);

        if (depositCheck.checked) {
            // * событие выбора другого % депозита 
            // * true отобразить блоки
            selectDepositBank.style.display = 'inline-block';
            //? depositAmount.style.display = 'inline-block';
            this.deposit = true; //? изменить состояние объкта

            selectDepositBank.addEventListener('change', this.changePercent); // этот обработчик срабатывает только здесь

        } else {
            // * событие убрать % депозита
            selectDepositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            selectDepositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            //? selectDepositBank.removeEventListener('change', this.changePercent); 
        }
    }

    setEventListeners() {
        // * вешаем клик на кнопку start Расчитать
        startBtn.addEventListener('click', this.start.bind(this));
        // * деактивируем или активируем кнопку Рассчитать
        startBtn.disabled = (salaryAmount.value.trim() === '');

        // * start button зависит от состояния поля salaryAmount
        salaryAmount.addEventListener('change', () => {
            startBtn.disabled = (salaryAmount.value.trim() === '');
        });

        // * появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset()
        cancelBtn.addEventListener('click', this.reset.bind(this));

        // * клик на кнопку плюс expensesPlus и incomePlus
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));

        // * Число под полоской (input type range) должно меняться в зависимости от позиции range, 
        periodSelect.addEventListener('input', this.changePeriodAmount.bind(this)); //с привязкой контекста

        // * по значению placeholder находим поля для заполнения 
        const inputString = document.querySelectorAll('input[placeholder="Наименование"]');
        const inputNumber = document.querySelectorAll('input[placeholder="Сумма"]');

        // * цепляем соответствующие слушатели на соответствующие элементы input
        inputString.forEach( (item) => {
            item.addEventListener('input', this.handleCyrChars);
        });
        inputNumber.forEach( (item) => {
            item.addEventListener('input', this.handleNubmers);
        });
        
        //! привязываем обработчик депозита когда изменилось значение чекбокса
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        //? selectDepositBank.addEventListener('change', this.changePercent.bind(this));
        depositPercent.addEventListener('input', this.myPercentNumberHandler);
    }
}


// * НАШ ОБЪЕКТ ПРИЛОЖЕНИЯ
const appData = new AppData();
appData.setEventListeners();

