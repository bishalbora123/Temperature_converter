// Attach event listener to the convert button
document.getElementById('convertBtn').addEventListener('click', calculateConversions);

function calculateConversions() {
  const tempInputRaw = document.getElementById('tempInput').value;
  const unitInput = document.getElementById('unitInput').value;
  const errorMsg = document.getElementById('errorMsg');
  const resultArea = document.getElementById('resultArea');

  // Reset UI
  errorMsg.textContent = '';
  resultArea.innerHTML = '';

  // Feature: Numeric input validation
  if (tempInputRaw.trim() === '' || isNaN(tempInputRaw)) {
    errorMsg.textContent = 'Please enter a valid numeric temperature.';
    return;
  }

  const temp = parseFloat(tempInputRaw);
  let celsius, fahrenheit, kelvin;

  // Feature: Edge case handling & Conversions
  switch (unitInput) {
    case 'C':
      if (temp < -273.15) return showAbsoluteZeroError();
      celsius = temp;
      fahrenheit = (temp * 9/5) + 32;
      kelvin = temp + 273.15;
      break;

    case 'F':
      if (temp < -459.67) return showAbsoluteZeroError();
      celsius = (temp - 32) * 5/9;
      fahrenheit = temp;
      kelvin = celsius + 273.15;
      break;

    case 'K':
      if (temp < 0) return showAbsoluteZeroError();
      celsius = temp - 273.15;
      fahrenheit = (celsius * 9/5) + 32;
      kelvin = temp;
      break;
  }

  // Helper function to trigger absolute zero error
  function showAbsoluteZeroError() {
    errorMsg.textContent = 'Error: Temperature cannot fall below Absolute Zero!';
  }

  // Feature: Auto-conversion displaying all other output units
  const resultsHTML = [];
  
  if (unitInput !== 'C') {
    resultsHTML.push(`<div class="result-card"><strong>Celsius:</strong> ${celsius.toFixed(2)} °C</div>`);
  }
  if (unitInput !== 'F') {
    resultsHTML.push(`<div class="result-card"><strong>Fahrenheit:</strong> ${fahrenheit.toFixed(2)} °F</div>`);
  }
  if (unitInput !== 'K') {
    resultsHTML.push(`<div class="result-card"><strong>Kelvin:</strong> ${kelvin.toFixed(2)} K</div>`);
  }

  // Render results
  resultArea.innerHTML = resultsHTML.join('');
}