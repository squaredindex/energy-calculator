const readingStartInput = document.querySelector('#readingStart')
const readingEndInput = document.querySelector('#readingEnd')

const dateStartInput = document.querySelector('#dateStartInput')
const dateEndInput = document.querySelector('#dateEndInput')

const kwhUsedInfo = document.querySelector('#kwhUsedInfo')
const kwhCostInfo = document.querySelector('#kwhCostInfo')
const kwhAveCostInfo = document.querySelector('#kwhAveCostInfo')

const kwhCostInput = document.querySelector('#kwhCost')
const standingChargeInput = document.querySelector('#standingCharge')

let kwhUsed
let kwhCost
let standingChargeCost

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
  days = Math.ceil(dateDiff / (1000 * 3600 * 24))
  months = Math.ceil(days / 31)
  updateKwhCost()
}

const updateKwhUsed = _ => {
  let readingStart = readingStartInput.value
  let readingEnd = readingEndInput.value

  kwhUsed = readingEnd - readingStart

  if (kwhUsed < 0) return

  kwhUsedInfo.textContent = kwhUsed
}

const updateKwhCost = _ => {
  if (isNaN(days) && standingChargeInput.value > 0)
    return (kwhCostInfo.textContent = 'Please add reading dates')

  kwhCost = (kwhUsed * kwhCostInput.value) / 100
  if (kwhCost <= 0) return (kwhCostInfo.textContent = '£0.00')

  standingChargeCost = (standingChargeInput.value * days) / 100

  if (isNaN(standingChargeCost) || isNaN(days))
    return (kwhCostInfo.textContent = `${formatMoney(
      kwhCost
    )} (not inc standing charge)`)

  kwhCostInfo.textContent = `${formatMoney(
    kwhCost + standingChargeCost
  )} in ${days} days`
}

// Update numbers
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', _ => {
    updateKwhUsed()
    updateKwhCost()
    updateDates()
  })
})
