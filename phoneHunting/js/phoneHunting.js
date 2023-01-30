const loadPhones = async (searchText,dataLimit) =>{
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data,dataLimit);
}
// show display Phones
const displayPhone = (phones,dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;
    // Button Data limit showing
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }

    // No Phone found Message
    const noPhone = document.getElementById('no-found');
    if(phones.length == 0){
        noPhone.classList.remove('d-none');
    }else{
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                  <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                  </div>
    `;
    phonesContainer.appendChild(phoneDiv);
    })
    toggleSpinner(false);
}
// search Phone
const searchPhone = (dataLimit) =>{
    toggleSpinner(true)
    const phoneSearch = document.getElementById('search-field');
    const phoneText = phoneSearch.value;
    loadPhones(phoneText,dataLimit);
}
// Search Btn
document.getElementById('search-btn').addEventListener('click',function(){
    searchPhone(10);
})
// Input Search enter key
document.getElementById("search-field")
    .addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        searchPhone(10);
    }
});
// toggle spinner
const toggleSpinner = (isLoader) =>{
    const loaderSection = document.getElementById('loader');
    if(isLoader){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none');
    }
}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
    searchPhone();
})

// Phone details show 
const loadPhoneDetails =async (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res =await fetch(url);
    const data =await res.json();
    phoneDisplayDetails(data.data)
}

const phoneDisplayDetails = (phone) =>{
    console.log(phone)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>${phone.slug}</p>
        <p>${phone.mainFeatures.displaySize}</p>
        <p>${phone.others? phone.others.Radio : 'No Radio'}</p>
        <p>${phone.others? phone.others.Bluetooth : 'No Bluetooth'}</p>
    `
   
}

loadPhones('iphone');