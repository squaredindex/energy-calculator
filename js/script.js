/*
    TODO: get readingStart and readingEnd
    TODO: define kwh used between readingStart and readingEnd
          * get the difference between them
    TODO: get price per kwh
    TODO: format that price into currency: pounds
    TODO: multiply the price per kwh by the kwhUsed

    TODO: get the number of days between two dates
    TODO: get standing charge (daily)
    TODO: calculate standing charge cost for number of days

 */

const readingStartInput = document.querySelector('#readingStart')
const readingEndInput = document.querySelector('#readingEnd')
const kwhUsedInfo = document.querySelector('#kwhUsed')

const kwhPriceInput = document.querySelector('#kwhPrice')

const updateKwhUsed = _ => {
  let readingStart = readingStartInput.value
  let readingEnd = readingEndInput.value

  let kwhUsed = readingEnd - readingStart

  if (kwhUsed < 0) return

  kwhUsedInfo.textContent = kwhUsed
}

const updateKwhCost = _ => {}

// *Update numbers
// TODO: Select these by relevant group instead of document
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('input', updateKwhUsed)
})
