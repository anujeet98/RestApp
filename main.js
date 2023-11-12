let form = document.getElementById("form");


let price = document.getElementById("price");
let item = document.getElementById("item");
let table = document.getElementById("table");

let btn = document.getElementById("submit");


let table1List = document.getElementById("table 1");
let table2List = document.getElementById("table 2");
let table3List = document.getElementById("table 3");


document.addEventListener('DOMContentLoaded',refreshOrders);

btn.addEventListener('click', updateOrders);


function updateOrders(e){
    e.preventDefault();

    let orderObj = {
        Iprice : price.value,
        Iitem : item.value,
        Itable : table.value
    };

    axios.post('https://crudcrud.com/api/53a197980b8f4a5393c727a7c38becfb/RestaurantApp',orderObj)
    .then(res => showUpdate(res))
    .catch(e => console.error(e));
}




function refreshOrders(){
    axios.get('https://crudcrud.com/api/53a197980b8f4a5393c727a7c38becfb/RestaurantApp')
    .then(res => showAllUpdate(res))
    .catch(err => console.error(err));
}


function showUpdate(res){

        let item = document.createElement('li');
        item.className = "listItem";
        console.log(res);
        item.innerHTML = `${res.data.Iprice} - ${res.data.Itable} - ${res.data.Iitem} <button type='button' onclick='deleteItem(event,"${res.data._id}")'>delete order</button>`;

        console.log(res.data.Itable);
        document.getElementById(`${res.data.Itable}`).appendChild(item);
}

function showAllUpdate(res){

    for(let i=0;i<res.data.length;i++){

        let item = document.createElement('li');
        item.className = "listItem";
        item.innerHTML = `${res.data[i].Iprice} - ${res.data[i].Itable} - ${res.data[i].Iitem} <button type='button' onclick='deleteItem(event,"${res.data[i]._id}")'>delete order</button>`;

        console.log(res.data[i].Itable);
        document.getElementById(`${res.data[i].Itable}`).appendChild(item);
    }
}



function deleteItem(event,id){
    event.preventDefault();
    let listItem = event.target.parentElement;
    let ulItem = listItem.parentElement;
    axios.delete(`https://crudcrud.com/api/53a197980b8f4a5393c727a7c38becfb/RestaurantApp/${id}`)
    .then(() => ulItem.removeChild(listItem))
    .catch(err => console.error(err));
}