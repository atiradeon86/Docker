const url = "http://localhost:3000";


//--------- multiple select ---------
let expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
//-------------------------

let selectedDrinks = [];

// ---------- popup ablak -----------

function showComingPopupWindow(name) {
    let popup = document.querySelector('.popup-window');
    popup.innerHTML = name + ' elmentve!';
    popup.style.visibility = 'visible';
    setTimeout(closePopup, 5000);
}

function showNotComingPopupWindow(name) {
    let popup = document.querySelector('.popup-window');
    popup.innerHTML = name + ', nem tudod mit hagysz ki!';
    popup.style.visibility = 'visible';
    setTimeout(closePopup, 5000);
}


function closePopup() {
    let popup = document.querySelector('.popup-window');
    popup.style.visibility = "hidden";
}



//------------ regisztráció -----------
function registerUser() {
    let nameInput = document.querySelector('#name');
    let checkboxForCome = document.querySelector('#checkForComing');
    selectedDrinks = [];
    let userIsComing = false;

    let drinksArray = document.querySelectorAll('.drinks');

    for (let drink of drinksArray) {
        if (drink.checked) {
            selectedDrinks.push(drink.value)
        }
    }


    const user = {
        name: nameInput.value,
        willCome: userIsComing,
        drinkList: selectedDrinks
    }

    if (checkboxForCome.checked) {
        user.willCome = true;
        showComingPopupWindow(user.name)
        nameInput.value = "";
        checkboxForCome.checked = false;
        checkboxes.style.display = "none";
        for (let drink of drinksArray) {
            drink.checked = false;
        }
    } else {
        showNotComingPopupWindow(user.name)
        nameInput.value = "";
        checkboxForCome.checked = false;
        checkboxes.style.display = "none";
        for (let drink of drinksArray) {
            drink.checked = false;
        }
    }



    let jsonUser = JSON.stringify(user);

    const param = {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: jsonUser,
        method: 'POST'
    }

    const result = fetch(url, param);
    result
        .then(data => data.json())
        .then(resp => {
            console.log(resp);
        })
        .catch(err => console.log(err))

}


// ------------ get users ---------------

let listOfUsers = []


function getUsers() {
    // listOfUsers = [];
    const getUsers = fetch(url);

    getUsers
        .then(data => data.json())
        .then(resp => {
            listOfUsers = resp;
            setTimeout(generateTableOfUsers(listOfUsers), 0);
        })
        .catch(err => console.log(err))

}


function generateTableOfUsers(list) {
    let table = document.querySelector('.table-of-users');
    table.innerHTML = `
    <thead>
    <tr>
        <th>Neve</th>
        <th>Jön</th>
        <th>Amit hoz</th>
    </tr>
    </thead>`;
    for (let user of list) {
        if (user.willCome === true) {
            user.willCome = "igen";
        } else {
            user.willCome = "nem";
        }


        table.innerHTML += `
        <tr>
            <td class="gen-td">${user.name}</td>
            <td class="gen-td">${user.willCome}</td>
            <td class="gen-td">${user.drinkList}</td>
        </tr>
        
        `
    }
    table.style.visibility = "visible"

}