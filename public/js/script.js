const formAddBook = document.querySelector('#add--book-form');
const formAddRent = document.querySelector('#add--rents-form');
const formDeleteRent = document.querySelector('#delete--rents-form')

const showData = document.querySelector(".popUp");
const inputsBook = [...document.querySelectorAll('#add--book-form input')];
const inputsRent = [...document.querySelectorAll('#add--rents-form input')];
const inputsDelete = [...document.querySelectorAll('#delete--rents-form input')];
const find = document.querySelector('#search--rentsUser-form input');

const textArea = document.querySelector('textarea');

renderCellUser = (id, pesel, data) => {
    const cell = document.createElement("p");
    cell.textContent = `Id książki: ${id} | Pesel użytkownika: ${pesel} | Data wyporzyczenia: ${data}`;

    return cell;
}

renderCellRents = (id, pesel, data) => {
    const cell = document.createElement("p");
    cell.textContent = `Id książki: ${id} | Pesel użytkownika: ${pesel} | Data wyporzyczenia: ${data}`;

    return cell;
}

renderCellBooks = (_id, title, Author, Description) => {
    const cell = document.createElement("p");
    cell.textContent = `Id książki: ${_id} | Tytuł: ${title} | Autor: ${Author} | Opis: ${Description}`;

    return cell;
}

formAddBook.addEventListener('submit', (e) => {

    fetch('http://localhost:3000/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            Title: inputsBook[0].value,
            Author: inputsBook[1].value,
            Description: textArea.value,
            isRent: false
        })
    }).then(data => {
        console.log(data);
        return;
    })
});

formAddRent.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/rents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            User_Pesel: inputsRent[0].value,
            Book_ID: inputsRent[1].value,
            Rent_Date: new Date(),
        })
    }).then(data => {
        alert(`${data.status}    ${data.statusText}`)
        return;
    })
});

formDeleteRent.addEventListener('submit', (e) => {
    // e.preventDefault();
    fetch('http://localhost:3000/rents', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            Book_ID: inputsDelete[0].value,
        })
    }).then(data => {
        console.log(data);
        return;
    })
});

// id, title, pesel, data

document.querySelector(".rents").addEventListener('click', (e) => {
    e.preventDefault();

    const reset = [...document.querySelectorAll(".popUp p")]
    reset.forEach((element) => {
        element.remove();
    })

    fetch(`/rents`).then((response) => {
        response.json().then((data) => {
            data.forEach((cell) => {
                showData.appendChild(renderCellRents(cell.Book_ID, cell.User_Pesel, cell.Rent_Date));
            })
        })
    })
    showData.classList.toggle("hidden");

})

// Book_ID, title, Author, Description

document.querySelector(".books").addEventListener('click', (e) => {
    e.preventDefault();
    const reset = [...document.querySelectorAll(".popUp p")]
    reset.forEach((element) => {
        element.remove();
    })
    fetch(`/book/available`).then((response) => {
        response.json().then((data) => {
            data.forEach((cell) => {
                showData.appendChild(renderCellBooks(cell._id, cell.Title, cell.Author, cell.Description));
            })
        })
    })

    showData.classList.toggle("hidden");
})

document.querySelector(".hide").addEventListener('click', () => {

    showData.classList.toggle("hidden");

})


document.querySelector("#search--rentsUser-form").addEventListener('submit', (e) => {
    e.preventDefault(e);

    const reset = [...document.querySelectorAll(".popUp p")]
    reset.forEach((element) => {
        element.remove();
    })

    fetch(`/rents/pesel/${find.value}`).then((response) => {
        response.json().then((data) => {
            data.forEach((cell) => {
                showData.appendChild(renderCellUser(cell.Book_ID, cell.User_Pesel, cell.Rent_Date));
            })
        })
    })
    showData.classList.toggle("hidden");
})
