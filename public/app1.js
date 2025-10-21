document.getElementById('countryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const country = document.getElementById('countryInput').value.trim();
    const aboutDiv = document.getElementById('about');
    
    aboutDiv.innerHTML = "Loading...";
    aboutDiv.classList.remove('success-border'); // Clear border if any
    
    try {
        const response = await fetch(`/api/country-info?name=${encodeURIComponent(country)}`);
        const data = await response.json();
        
        if (response.ok) {
            aboutDiv.classList.add('success-border'); // ✅ Add border after success
            
            aboutDiv.innerHTML = `
                <h2 style="text-align:center; text-transform: uppercase; font-size: 35px; margin-bottom: 20px; font-weight: bold;">
                    ${data.name.common}
                </h2>
                <img src="${data.flags.svg}" alt="Flag" style="width:350px; height:250px; border: 1px solid black; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); display: block; margin: 0 auto;">
                
                <h2>Official Name: ${data.name.official}</h2>
                <h2>Capital: ${data.capital}</h2>
                <h2>Region: ${data.region}</h2>
                <h2>Subregion: ${data.subregion || "N/A"}</h2>
                <h2>Continent: ${data.continents[0]}</h2>
                <h2>Population: ${data.population}</h2>
                <h2>Languages: ${Object.values(data.languages).join(', ')}</h2>
                <h3>Currency: ${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})</h3>
                <h3>Timezones: ${data.timezones.join(', ')}</h3>
                <h3>Area: ${data.area} km²</h3>
                <h3>Independence: ${data.independent ? "Yes" : "No"}</h3>
                <h3>Driving Side: ${data.car.side}</h3>
                <h3>Calling Code: ${data.idd.root}${data.idd.suffixes.join(', ')}</h3>
                <h3>Population Density: ${(data.population / data.area).toFixed(2)} people/km²</h3>
                
                <p>Maps: <a href="${data.maps.googleMaps}" target="_blank">Google Maps</a> | 
                <a href="${data.maps.openStreetMaps}" target="_blank">OpenStreetMaps</a></p>
            `;
        } else {
            aboutDiv.classList.remove('success-border'); // ❌ No border on failure
            aboutDiv.innerHTML = `<span style="color:red;">${data.error || "Country not found."}</span>`;
        }
    } catch (err) {
        aboutDiv.classList.remove('success-border'); // ❌ No border on error
        aboutDiv.innerHTML = `<span style="color:red;">API error.</span>`;
        console.error("API error:", err);
    }
});

function requireCountryBeforeNavigate(targetUrl) {
    const countryInput = document.getElementById('countryInput');
    if (!countryInput.value.trim()) {
        alert("Please enter a country name first!");
        countryInput.focus();
        return false;
    }
    // Pass the country name as a query parameter
    window.location.href = `${targetUrl}?country=${encodeURIComponent(countryInput.value.trim())}`;
    return true;
}

// Attach to each card
document.getElementById('culture').onclick = function() {
    requireCountryBeforeNavigate('/culture');
};
document.getElementById('tourist').onclick = function() {
    requireCountryBeforeNavigate('/tourist');
};
document.getElementById('food').onclick = function() {
    requireCountryBeforeNavigate('/food');
};
document.getElementById('people').onclick = function() {
    requireCountryBeforeNavigate('/people');
};
