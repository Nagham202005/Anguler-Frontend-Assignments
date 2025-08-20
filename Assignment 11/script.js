var proName = document.getElementById("proName");
var proPrice = document.getElementById("proPrice");
var proCategory = document.getElementById("proCategory");
var proDesc = document.getElementById("proDesc");
var btn = document.getElementById("btn");
var proSearch = document.getElementById("proSearch");
var tbody = document.getElementById("tbody");

let updateIndex;
let mode = "create";

var proContainer = [];
if (localStorage.getItem("products") != null) {
  proContainer = JSON.parse(localStorage.getItem("products"));
  disPro();
}

btn.onclick = function () {
  var pro = {
    name: proName.value,
    price: proPrice.value,
    category: proCategory.value,
    desc: proDesc.value,
  };

  if (mode === "create") {
    proContainer.push(pro);
  } else {
    proContainer[updateIndex] = pro;
    mode = "create";
    btn.innerHTML = "Add Product";
  }

  localStorage.setItem("products", JSON.stringify(proContainer));
  disPro();
  clearForm();
};

function disPro() {
  var allPro = ``;
  for (let i = 0; i < proContainer.length; i++) {
    allPro += `
            <tr>
                <td>${i + 1}</td>
                <td>${proContainer[i].name}</td>
                <td>${proContainer[i].price}</td>
                <td>${proContainer[i].category}</td>
                <td>${proContainer[i].desc}</td>
                <td>
                    <button onclick="delPro(${i})" class="btn delete">Delete</button> 
                    <button onclick="updatePro(${i})" class="btn update">Update</button>
                </td>
            </tr>
        `;
  }
  tbody.innerHTML = allPro;
}

function delPro(index) {
  proContainer.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(proContainer));
  disPro();
}

function clearForm() {
  proName.value = "";
  proPrice.value = "";
  proCategory.value = "";
  proDesc.value = "";
}

function updatePro(index) {
  proName.value = proContainer[index].name;
  proPrice.value = proContainer[index].price;
  proCategory.value = proContainer[index].category;
  proDesc.value = proContainer[index].desc;

  btn.innerHTML = "Update Product";
  mode = "update";
  updateIndex = index;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

proSearch.onkeyup = function () {
  var searchTerm = proSearch.value.toLowerCase();
  var allPro = ``;
  for (let i = 0; i < proContainer.length; i++) {
    if (
      proContainer[i].name.toLowerCase().includes(searchTerm) ||
      proContainer[i].category.toLowerCase().includes(searchTerm)
    ) {
      allPro += `
            <tr>
                <td>${i + 1}</td>
                <td>${proContainer[i].name}</td>
                <td>${proContainer[i].price}</td>
                <td>${proContainer[i].category}</td>
                <td>${proContainer[i].desc}</td>
                <td>
                    <button onclick="delPro(${i})" class="btn delete">Delete</button> 
                    <button onclick="updatePro(${i})" class="btn update">Update</button>
                </td>
            </tr>
        `;
    }
  }
  tbody.innerHTML = allPro;
};