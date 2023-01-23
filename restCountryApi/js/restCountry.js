const loadCountries = () =>{
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => displayShowCountry(data))
}

const displayShowCountry = (countries) => {
    const countryContainer = document.getElementById('country-container');
    countries.forEach(country => {
       const countryDiv = document.createElement('div');
       countryDiv.classList.add('country');
       countryDiv.innerHTML = `
        <h3>Name: ${country.name.common}</h3>
        <p>Capital ${country.capital? country.capital[0] : 'No Capital'}</p>
        <button onclick="loadCountryDetails('${country.cca2}')">Display Details: </button>
       `;
       countryContainer.appendChild(countryDiv);
    })
}

const loadCountryDetails = (code) =>{
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCountryDetail(data[0]))
}

const displayCountryDetail = country =>{
    console.log(country);
    const countryDetailContainer = document.getElementById('country-detail');
    countryDetailContainer.innerHTML = `
        <h2>Details: ${country.name.common}</h2>
        <img src=${country.flags.png} alt="" />`;
}

loadCountries();