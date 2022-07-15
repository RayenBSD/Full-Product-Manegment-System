let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteAll = document.getElementById("deleteAll");
let table = document.getElementById("tbody");
let search = document.getElementById("search");

let mode = "create", searchMod = "title";

//console.log(title, price, taxes, ads, discount, total, count, category, submit);

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }
    else {
        total.innerHTML = "0";
        total.style.background = "#a00d02"
    }
}

let dataPro = [], id = 0, update = 0;
dataPro = JSON.parse(localStorage.product); 
if (dataPro.length > 0 && localStorage.id != null) {
    id = parseInt(localStorage.id);
    showData(dataPro);
}


submit.onclick = () => {
    if (mode === "create" && title.value !== '' && price.value !== '' && count.value !== '' && category.value !== '') {
        if (count.value >= 1) {
            let newPro = {};
            for (let i = 1; i <= count.value; i++) {
                newPro = {
                    id: ++id,
                    title: title.value,
                    price: price.value,
                    taxes: taxes.value,
                    ads: ads.value,
                    discount: discount.value,
                    total: total.innerHTML,
                    category: category.value
                }        
                dataPro.push(newPro);
                localStorage.setItem("product", JSON.stringify(dataPro));
                localStorage.setItem("id", String(id));
                showData(dataPro);
            }
            clearData();
            getTotal();
        }    
    }
    else {
        if (title.value !== '' && price.value !== '' && category.value !== '') {
            dataPro[update].title = title.value;
            dataPro[update].price = price.value;
            dataPro[update].taxes = taxes.value;
            dataPro[update].ads = ads.value;
            dataPro[update].discount = discount.value;
            dataPro[update].category = category.value;
            showData(dataPro);
            mode = "create";
            submit.innerHTML = "create";
            count.style.visibility = "visible";
            clearData();
            getTotal();
        }
    }
}

function clearData () {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
 
function showData(datap) {

    let data = datap.map (dt => {
        return (`<tr>
        <td>${dt.id}</td>
        <td>${dt.title}</td>
        <td>${dt.price}</td>
        <td>${dt.taxes}</td>
        <td>${dt.ads}</td>
        <td>${dt.discount}</td>
        <td>${dt.total}</td>
        <td>${dt.category}</td>
        <td><button onclick="updateData(${dt.id})" id="update">update</button></td>
        <td><button onclick="deleteData(${dt.id})" id="delete">delete</button></td>
        </tr>`)
    });

    table.innerHTML = "";
    data = data.join("");
    table.innerHTML += data;
    deleteAll.innerHTML = `<button onclick='deleteAllData()'>Delete All (${dataPro.length})</button>`;
}

function deleteData (id) {
    dataPro = dataPro.filter(dataPro => dataPro.id !== id);
    localStorage.setItem("product", JSON.stringify(dataPro));
    localStorage.setItem("id", String(id));
    showData(dataPro);
}

function deleteAllData() {
    table.innerHTML = "";
    dataPro = [];
    id = 0;
    localStorage.setItem("product", JSON.stringify(dataPro));
    localStorage.setItem("id", String(id));
    deleteAll.innerHTML = "";
}

function updateData (id) {
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].id === id) {
            mode = "update";
            title.value = dataPro[i].title;
            price.value = dataPro[i].price;
            taxes.value = dataPro[i].taxes;
            ads.value = dataPro[i].ads;
            discount.value = dataPro[i].discount;
            category.value = dataPro[i].category;
            getTotal();
            count.style.visibility = "hidden";
            submit.innerHTML = "update";
            update = i;
            break;
        }
    }
    scroll ({
        top: 0,
        behavior: "smooth"
    });
}

function getSearchMood(id) {
    if (id === "searchTitle") {
        searchMod = "title";
    }
    else {
        searchMod = "category";
    }
    search.focus();
    search.placeholder = `Search by ${searchMod}`;
    search.value = '';
}

function searchData (value) {
    let searchDataPro = [];
    if (searchMod == "title") {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
               searchDataPro.push(dataPro[i]);
            }
        }
        showData(searchDataPro);
    }
    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                searchDataPro.push(dataPro[i]);
            }
        }
        showData(searchDataPro);
    }
}