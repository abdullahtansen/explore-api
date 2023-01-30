// load all phones
const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
// showing display phone
const displayPhones = (phones,dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = ``;
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
       showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }

    // display no phone found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length  === 0){
        noPhone.classList.remove('d-none');
    }else{
        noPhone.classList.add('d-none')
    }

    // display All phones
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#phoneDetailsModal">Show Details</button>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSpinner(false);

}
// search input 
const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const phoneSearch = document.getElementById('search-field');
    const phoneText = phoneSearch.value;
    loadPhones(phoneText, dataLimit);
}

// handle search button click
document.getElementById('searchBtn').addEventListener('click',function(){
    // start loader 
   processSearch(10);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

// toogle Spinner 
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}
// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})

// load single phone details
const loadPhoneDetails =async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)

}
// Modal Single Phone Details
const displayPhoneDetails = phone =>{
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage information found'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth information'}</p>
    `
}

loadPhones('apple');