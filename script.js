let isToggled;

const toggleBtn = (btnNum) => {
  const btnElement = document.querySelector(btnNum)
  if(!btnElement.classList.contains('isToggled')) {
    if(document.querySelector('.isToggled')) {
      document.querySelector('.isToggled').classList.remove('isToggled')
    }
    btnElement.classList.add('isToggled')
    return isToggled = true
  } else {
    btnElement.classList.remove('isToggled')
    return isToggled = false
  }
}

const inputBill = document.querySelector('.input__amount-bar') 
const inputTip = document.querySelector('.input__tip-custom')
const inputPeople = document.querySelector('.input__people-bar')
const outputTip = document.querySelector('.output__tip-result')
const outputTotal = document.querySelector('.output__total-result')



const verifyNumber = (bill, tip, people) => {
  let result = true;

  if(bill*1 != bill || bill <= 0) {
    document.querySelector('.amount-errorMessage').innerHTML = "please enter a valid number"
    result = false
  } else {
    document.querySelector('.amount-errorMessage').innerHTML = ""
  }


  if(tip*1 != tip|| tip <= 0) {
    document.querySelector('.tip-errorMessage').innerHTML = "please enter a valid number"
    result = false
  } else {
    document.querySelector('.tip-errorMessage').innerHTML = ""
  }

  if(people*1 != people || people <= 0 || Math.round(people) != people) {
    document.querySelector('.people-errorMessage').innerHTML = "please enter a valid number"
    result = false
  } else {
    document.querySelector('.people-errorMessage').innerHTML = ""
  }

  return result
}



const selectTip = (customTip) => {
  let tip = 0;

  for(let i = 0; i < 5; i++) {
    if(document.querySelector(`.btn${i}`).classList.contains('isToggled')) {
      tip = document.querySelector(`.btn${i}`).innerText.slice(0, -1)
      inputTip.value = ''
    }
  }

  if(tip === 0) {
    tip = customTip
  }

  return tip
}



const calculate = () => {
  const bill = Number(inputBill.value)
  const customTip = Number(inputTip.value)
  const people = Number(inputPeople.value)


  if(!verifyNumber(bill, customTip, people)) {
    return
  }

  const tip = selectTip(customTip)

  outputTip.innerHTML = `$${(Math.round(((bill * (tip / 100)) / people) * 100)) / 100}`
  outputTotal.innerHTML = `$${(Math.round((bill * (1 + (tip / 100)) / people) * 100)) / 100}`

  if(!(Math.round(((bill * (tip / 100)) / people) * 100)) / 100) {
    outputTip.innerHTML = '$0.00'
    outputTotal.innerHTML = '$0.00'
  }
}


document.querySelector('body').addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    calculate()
  }
})


const reset = () => {
  inputBill.value = ''
  inputTip.value = ''
  inputPeople.value = ''
  document.querySelector('.isToggled').classList.remove('isToggled')
  outputTip.innerHTML = '$0.00'
  outputTotal.innerHTML = '$0.00'
}


document.querySelector('.output__reset-btn').addEventListener('click', () => {
  reset()
})