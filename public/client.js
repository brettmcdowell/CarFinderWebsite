// Open sidebar
function openNav () {
  document.getElementById('mySidebar').style.width = '250px'
  document.getElementById('main').style.marginLeft = '250px'
}

// Close sidebar
function closeNav () {
  document.getElementById('mySidebar').style.width = '0'
  document.getElementById('main').style.marginLeft = '0'
}

// Handle form submission for the first form
const formA = document.getElementById('submitForm')
formA.addEventListener('submit', async (event) => {
  event.preventDefault()
  swal(
    'Success',
    'Scroll down to find what we think is perfect for you!',
    'success'
  )
  const maxPriceValueInput = document.getElementById('userRange')
  const doorsRequiredValueInput = document.getElementById('doorsValue')
  const minTopSpeedValueInput = document.getElementById('topspeedValue')
  const minMPGValueInput = document.getElementById('MPGValue')
  const outputDivSection = document.getElementById('OutputDiv')
  const maxPriceValue = parseInt(maxPriceValueInput.value)
  const doorsRequiredValue = parseInt(doorsRequiredValueInput.value)
  const minTopSpeedValue = parseInt(minTopSpeedValueInput.value)
  const minMPGValue = parseInt(minMPGValueInput.value)
  fetch('data.json')
    .then(response => {
      console.log('Response status:', response.status)
      console.log('Response message:', response.statusText)
      return response.json()
    })
    .then(data => {
      const filteredData = data.filter(perfectCar => perfectCar.Price <= maxPriceValue && perfectCar.Doors === doorsRequiredValue && perfectCar.TopSpeed >= minTopSpeedValue && perfectCar.MPG >= minMPGValue)
      if (filteredData.length === 0) {
        outputDivSection.innerHTML = outputDivSection.innerHTML = `
        <h2 class="mainSections">Results:</h2><br><br>
        <div class="CarBox">
          <h1 class="carTextHeader">No Perfect Car/s Found</h1>
          <img class="carImages" src="/Images/noCarFound.png" alt="NoCar" />
          <h1 class="carText">The criteria you used results in no perfect car/s for you, apologies</h1>
        </div><br>
      `
      } else {
        outputDivSection.innerHTML = `
          <h2 class="mainSections">Results:</h2><br><br>
          ${filteredData.map((perfectCar, index) => `
          <div class="CarBox">
            <h1 class="carTextHeader">${perfectCar.CarName}</h1>
            <img class="carImages" src="/Images/${perfectCar.CarName}.png" alt="${perfectCar.CarName}" />
            <h1 class="carText">Price: £${perfectCar.Price}</h1>
            <h1 class="carText">Doors: ${perfectCar.Doors}</h1>
            <h1 class="carText">Top Speed: ${perfectCar.TopSpeed}</h1>
            <h1 class="carText">MPG: ${perfectCar.MPG}</h1>
          </div><br>`).join('')}
        `
      }
      maxPriceValueInput.value = 30000
      output.innerHTML = 30000
      doorsRequiredValueInput.value = 3
      minTopSpeedValueInput.value = 100
      minMPGValueInput.value = 5
    })

    .catch(error => {
      console.error(error)
      alert('Server has disconnected please retry later')
    })
})

const slider = document.getElementById('userRange')
const output = document.getElementById('demo')
output.innerHTML = slider.value
slider.oninput = function () {
  output.innerHTML = this.value
}

const slider2 = document.getElementById('userRange2')
const output2 = document.getElementById('demo2')
output2.innerHTML = slider2.value // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function () {
  output2.innerHTML = this.value
}

const carUploadResult = document.getElementById('carUploadResult')
const form = document.getElementById('submitForm2')
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  swal(
    'Success',
    'Scroll down to find what we think is perfect for you!',
    'success'
  )

  const formData = new FormData(form)

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      message.textContent = data.message
      form.reset()
    })
    .catch(error => {
      console.error(error)
      console.log('Server has disconnected please retry later')
    })

  const inputField = document.getElementById('carName')
  const data = {
    data: inputField.value
  }

  const inputField2 = document.getElementById('doorsValue2')
  const data2 = {
    data2: inputField2.value
  }

  const inputField3 = document.getElementById('userRange2')
  const data3 = {
    data3: inputField3.value
  }

  const inputField4 = document.getElementById('topSpeed2')
  const data4 = {
    data4: inputField4.value
  }

  const inputField5 = document.getElementById('averageMPG2')
  const data5 = {
    data5: inputField5.value
  }

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, ...data2, ...data3, ...data4, ...data5 })
    })
    const result = await response.json()
    console.log(result)

    inputField.value = ''
    inputField2.value = ''
    inputField3.value = 10000
    output2.innerHTML = 10000
    inputField4.value = ''
    inputField5.value = ''
  } catch (error) {
    console.error(error)
    alert('Server has disconnected please retry')
  }
})
