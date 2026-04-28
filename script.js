// frontend/script.js
window.onload = function() {
  fetchPairingStatus();

  async function fetchPairingStatus() {
    try {
      const response = await fetch('https://your-heroku-url.herokuapp.com/status');
      const data = await response.json();

      document.getElementById('status').innerText = `Status: ${data.status}`;

      if (data.status === 'Pairing required') {
        const pairCodeResponse = await fetch('https://your-heroku-url.herokuapp.com/paircode');
        const pairCodeData = await pairCodeResponse.json();
        displayPairCode(pairCodeData.pairCode);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function displayPairCode(pairCode) {
    document.getElementById('pair-code').innerText = pairCode;
    document.getElementById('pair-code-container').style.display = 'block';
  }
};