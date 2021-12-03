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

const readingStartInput = document.querySelector('#readingStart')
const readingEndInput = document.querySelector('#readingEnd')
// const monthsInput = document.querySelector('#numMonths')
const dateStartInput = document.querySelector('#dateStartInput')
const dateEndInput = document.querySelector('#dateEndInput')

const kwhUsedInfo = document.querySelector('#kwhUsedInfo')
const kwhCostInfo = document.querySelector('#kwhCostInfo')
const kwhAveCostInfo = document.querySelector('#kwhAveCostInfo')

const kwhCostInput = document.querySelector('#kwhCost')
const standingChargeInput = document.querySelector('#standingCharge')

let kwhUsed
let kwhCost
let standingCharge

let months
let days

const formatMoney = num => {
  const numFormatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(num)

  return numFormatted
}

const updateDates = _ => {
  let dateStart = new Date(dateStartInput.value)
  let dateEnd = new Date(dateEndInput.value)

  const dateDiff = dateEnd.getTime() - dateStart.getTime()
  months = Math.ceil(dateDiff / (1000 * 3600 * 12))
  days = Math.ceil(dateDiff / (1000 * 3600 * 24))
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

  if (days < 1) return
  standardChargeCost = (standingChargeInput.value * days) / 100

  kwhCostInfo.textContent = formatMoney(kwhCost + standardChargeCost)
}

// *Update numbers
// TODO: Select these by relevant group instead of document
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', _ => {
    updateKwhUsed()
    updateKwhCost()
    updateDates()
  })
})
