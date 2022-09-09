const Loadphones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}
const displayPhones = (phones, dataLimit) => {

    const Displayphone = document.getElementById('phone-container')
    Displayphone.textContent = '';
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');

    }
    else {
        showAll.classList.add('d-none');
    }


    const Nophone = document.getElementById('no-phn');
    if (phones.length === 0) {
        Nophone.classList.remove('d-none')
    }
    else {
        Nophone.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phonediv = document.createElement('div');
        phonediv.classList.add('col');
        phonediv.innerHTML = `
        <div class="card p-4" >
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#phoneModal">Shoe details</button>

                
        </div>
    </div>
        `
        Displayphone.appendChild(phonediv);


    });
    toggleSpinner(false);
}
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    Loadphones(searchText, dataLimit);
}
document.getElementById('btn-srch').addEventListener('click', function () {
    processSearch(10);
})

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSpinner = isLoading => {
    const loadSection = document.getElementById('loader');
    if (isLoading) {
        loadSection.classList.remove('d-none');

    }
    else {
        loadSection.classList.add('d-none')
    }
}
document.getElementById('btn-showall').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data.data);
}
const displayPhonesDetails = phone => {
    console.log(phone);
    const ModalTitle = document.getElementById('phoneModalLabel');
    ModalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phn-dtls');
    phoneDetails.innerHTML = `
    <p> Realease Date : ${phone.releaseDate ? phone.releaseDate : `No realease date found`} </p>`

}

// Loadphones('apple');