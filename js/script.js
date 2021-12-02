/*
    TODO: get readingStart and readingEnd
    TODO: define kwh used between readingStart and readingEnd
          * get the difference between them
    TODO: get price per kwh
    TODO: format that price into currency: pounds
    TODO: multiply the price per kwh by the kwhUsed

    TODO: get the number of days between two dates
    TODO: get standing charge (daily)
    TODO: calculate standing charge cost multiplied by number of days

    TODO: update the total cost adding (daily charge * number of days)
 */

document.querySelector('#year').textContent = new Date().getFullYear()

const readingStartInput = document.querySelector('#readingStart')
const readingEndInput = document.querySelector('#readingEnd')
const monthsInput = document.querySelector('#numMonths')

const kwhUsedInfo = document.querySelector('#kwhUsedInfo')
const kwhCostInfo = document.querySelector('#kwhCostInfo')
const kwhAveCostInfo = document.querySelector('#kwhAveCostInfo')

const kwhCostInput = document.querySelector('#kwhCost')

let kwhUsed
let kwhCost
let months

const formatMoney = num => {
  const numFormatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(num)

  return numFormatted
}

const updateKwhUsed = _ => {
  let readingStart = readingStartInput.value
  let readingEnd = readingEndInput.value

  kwhUsed = readingEnd - readingStart

  if (kwhUsed < 0) return

  kwhUsedInfo.textContent = kwhUsed
}

const updateKwhCost = _ => {
  kwhCost = (kwhUsed * kwhCostInput.value) / 100
  if (kwhCost <= 0) return (kwhCostInfo.textContent = '£0.00')

  kwhCostInfo.textContent = formatMoney(kwhCost)

  let months = monthsInput.value

  if (months <= 0 || kwhCost == null)
    return (kwhAveCostInfo.textContent = '£0.00')
  kwhAveCostInfo.textContent = formatMoney(kwhCost / months)
}

// *Update numbers
// TODO: Select these by relevant group instead of document
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('input', _ => {
    updateKwhUsed()
    updateKwhCost()
  })
})
