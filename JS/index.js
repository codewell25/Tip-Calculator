//selecting some nessary elements
const billAmountEl = document.querySelector('#bill-amount');
const numOfPeopleEl = document.querySelector('#num-people');

const warningMsgEl = document.querySelector('#warning');

const customTipEl = document.querySelector('#custom-tip');

const tipAmountEl = document.querySelector('#tip-amount');
const amountPerPerson = document.querySelector('#total-person');

const resetEl = document.querySelector('#reset-btn');

//selecting all the input fields
const inputFieldsEl = document.querySelectorAll('input');

//selecting the tip btns
const tipBtnEl = document.querySelectorAll('.tip-btn')


window.onload = () => {
    eventLoader();
}

//to load the even
function eventLoader() {
    numOfPeopleEl.addEventListener('keyup', checkingNumOfPeople)


    inputFieldsEl.forEach((input) => {
        input.addEventListener('keyup', calculation)
    })

    tipBtnEl.forEach((btn) => {
        btn.addEventListener('click', calculation)

    })

    resetEl.addEventListener('click', resetFields)

}




numOfPeopleEl.value = 2;
//showing warning msg if no of people is zero
function checkingNumOfPeople() {

    if (Number(numOfPeopleEl.value) <= 0) {
        warningMsgEl.textContent = "Can't be Zero";
        numOfPeopleEl.style.border = '1px solid red';
        numOfPeopleEl.style.outline = 'none';
    }
    else {
        warningMsgEl.textContent = ''
        numOfPeopleEl.style.border = '1px solid #26C0AA';
    }
}


//taking tip % from btns
let tipBuilt;

function tipPercent(tip) {
    tipBuilt = tip;
}


//declaring some neccesary varible
let numOfPeople;
let billAmount;
let customTip;

//calculating neccesary values
function calculation() {
    numOfPeople = Number(numOfPeopleEl.value);
    billAmount = Number(billAmountEl.value);
    customTip = Number(customTipEl.value)

    if (customTip == '' && tipBuilt == '') {
        calculationWithOutTip();

    }
    else {
        calculationWithTip();
    }

    checkingFiniteValue();
}


let totalPerPerson;

//this function will be called if tip amount is not selected or enter by user
function calculationWithOutTip() {
    totalPerPerson = billAmount / numOfPeople;
    amountPerPerson.textContent = "$" + totalPerPerson.toFixed(2);
}

//this function will be called if tip amount is  selected or enter by user
let tipAmount;
function calculationWithTip() {

    if (tipBuilt) {
        tipAmount = billAmount * (tipBuilt / 100);

        customTipEl.addEventListener('keyup', () => {
            tipBuilt = false;
            calculationWithTip();
        })

    }
    else {
        tipAmount = billAmount * (customTip / 100);
    }

    let tipAmountPerPerson = tipAmount / numOfPeople

    totalPerPerson = (billAmount + tipAmount) / numOfPeople;
    tipAmountEl.textContent = "$" + tipAmountPerPerson.toFixed(2)
    amountPerPerson.textContent = "$" + totalPerPerson.toFixed(2);
}

//this function is called if total amoount per person is not finite
function checkingFiniteValue() {
    if (!isFinite(totalPerPerson) || !isFinite(tipAmount)) {
        amountPerPerson.textContent = "$__.__";
        tipAmountEl.textContent = "$__.__";

    }
}


function resetFields() {
    tipAmountEl.textContent = '$0.00';
    amountPerPerson.textContent = '$0.00';
    customTipEl.value = 0;
    billAmountEl.value = 0;
    numOfPeopleEl.value = 2;
}



