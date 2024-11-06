async function fetchApiCryptoData(){
    try {
        const fetchApiData = await fetch('/api/api-results').then((result) => result.json())
        const apiData = fetchApiData.data

        const cryptoTableBody = document.getElementById("crypto-table-body")
        cryptoTableBody.innerHTML = ''
    
        apiData.forEach((data) => {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.last}</td>
                <td>${data.buy}</td>
                <td>${data.sell}</td>
                <td>${data.volume}</td>
                <td>${data.base_unit}</td>
            `

            cryptoTableBody.appendChild(row)
        })

    } catch (error) {
        console.log("Error in fetching API Crypto Data: ", error)
    }
}


setInterval(fetchApiCryptoData, 60000);

fetchApiCryptoData()

function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('hidden');
  }

  window.onclick = function(event) {
    if (!event.target.matches('.inline-flex')) {
      const dropdown = document.getElementById('dropdownMenu');
      if (!dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
      }
    }
  }