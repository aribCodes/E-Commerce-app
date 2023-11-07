var bodyElement = document.getElementById("body");

var container1 = document.createElement("div");
var container2 = document.createElement("div");
container1.setAttribute("id", "container1");
container2.setAttribute("id", "container2");

container1.style.background = "lightgreen";
container2.style.background = "lightblue";

bodyElement.appendChild(container1);
bodyElement.appendChild(container2);

// creating a nav bar
var navDiv = document.createElement("div");
navDiv.setAttribute("id", "nav_bar");
navDiv.innerHTML = "<a>Mobiles</a> <a>Clothes</a>";
container1.appendChild(navDiv);

// created an array to store anchors in the nav bar
var navBarAnchors = [];
// created an index counter to manage index to "navBarAnchors";
var j = 0;
// loop is implemented to remove text and consider elements as they have nodeType = 1 while text has nodeType = 3
for (let i = 0; i < navDiv.childNodes.length; i++) {
  if(navDiv.childNodes[i].nodeType == 1){
    navBarAnchors[j] = navDiv.childNodes[i];
    j++;
  }
}

navBarAnchors[0].href = "#";
navBarAnchors[1].href = "clothes.html";

// console.log(navBarAnchors);

var products = [
  {
    img: "https://images.samsung.com/is/image/samsung/assets/uk/mobile-phone-buying-guide/introducing-samsung-galaxy-s23/S23-article1-M.png?$FB_TYPE_B_PNG$",
    name: "Samsung",
  },
  {
    img: "https://images.indianexpress.com/2023/04/Vivo-T2x-5G-smartphone-20230421.jpg?w=414",
    name: "Vivo",
  },
  {
    img: "https://www.androidstory.net/wp-content/uploads/2023/04/realme-11-pro-tmb.webp",
    name: "Realme",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTllBwa4dBkPqVC_Sgtqy6x9Cm7UEPLYs2y4Y0qMs8K2CWoTnWmOb2XZ0rdeuynELmhF9U&usqp=CAU",
    name: "iphone",
  },
  {
    img: "https://i.gadgets360cdn.com/large/nokia_7_1_1566640676719.jpg",
    name: "Nokia",
  },
  {
    img: "https://www.trustedreviews.com/wp-content/uploads/sites/54/2020/02/Xiaomi-Mi-10.jpg",
    name: "Xiaomi",
  },
];

// creating an array to store cart items
var cartItems = [];

// creating a variable "count" to count the already existed items in a cart
var count = 1;

for (let i = 0; i < products.length; i++) {
  // it is the node for product information
  var productNode = document.createElement("div");
  productNode.setAttribute("id", "product_node");

  // it is the image div which will contain a image in it
  var productImageNode = document.createElement("div");
  productImageNode.setAttribute("id", "product_img_div");
  productImageNode.style.backgroundImage = `url(${products[i].img})`;

  // it is the paragraph in which product name will be displayed
  var para = document.createElement("p");
  para.innerText = products[i].name;

  // creating add to cart button
  var button = document.createElement("button");
  button.setAttribute("id", "add_item_btn");
  button.setAttribute("value", i);
  button.setAttribute("onclick", `addItem(${i})`);
  button.innerText = "ADD TO CART";

  // appending product image and product name
  productNode.appendChild(productImageNode);
  productNode.appendChild(para);
  productNode.appendChild(button);
  container1.appendChild(productNode);
}

// creating container div for table
var tableContainer = document.createElement("div");
tableContainer.setAttribute("id", "table_container");

// creating heading of Cart items
var heading = document.createElement("h2");
heading.innerText = "CART ITEMS";

// creating table
var table = document.createElement("table");
table.setAttribute("id", "items_table");

// creating row and 3 headings of the table
var tableRow = document.createElement("tr");
var tableHeading1 = document.createElement("th");
tableHeading1.innerText = "ID";
var tableHeading2 = document.createElement("th");
tableHeading2.innerText = "IMAGE";
var tableHeading3 = document.createElement("th");
tableHeading3.innerText = "NAME";
var tableHeading4 = document.createElement("th");
tableHeading4.innerText = "QUANTITY";

// appending headings, table and container div of table in "container 2"
tableRow.appendChild(tableHeading1);
tableRow.appendChild(tableHeading2);
tableRow.appendChild(tableHeading3);
tableRow.appendChild(tableHeading4);
table.appendChild(tableRow);
tableContainer.appendChild(heading);
tableContainer.appendChild(table);
container2.appendChild(tableContainer);

displayCart();

function addItem(index) {
  location.reload()
  var getItems = JSON.parse(localStorage.getItem("products"));

  var productDetail = {
    id: index,
    name: products[index].name,
    image: products[index].img,
    quant: count
  };
  if (localStorage.getItem("products") == undefined) {
    cartItems.push(productDetail);
    localStorage.setItem("products", JSON.stringify(cartItems));

    displayCart();
  } else {
    var check;
    getItems.forEach((element) => {
      if (element.id == index) {      
        element.quant = element.quant + 1;
        localStorage.setItem("products", JSON.stringify(getItems));
        check = element;
      }
    });
    if (check == undefined) {
      getItems.push(productDetail);
      localStorage.setItem("products", JSON.stringify(getItems));
      displayCart();
    }
  }
}

function displayCart() {
  var getItems = JSON.parse(localStorage.getItem("products"));
  for (let index = 0; index < getItems.length; index++) {
    // creating row and 3 table data's of the table
    var tableRow = document.createElement("tr");
    var tableData1 = document.createElement("td");
    var tableData2 = document.createElement("td");
    var tableData3 = document.createElement("td");
    var tableData4 = document.createElement("td");

    // assigning values to all of the 3 table data's
    tableData1.innerText = getItems[index].id;
    tableData2.style.backgroundImage = `url(${getItems[index].image})`;
    tableData2.style.backgroundPosition = "center";
    tableData2.style.backgroundRepeat = "no-repeat";
    tableData2.style.backgroundSize = "contain";
    tableData3.innerText = getItems[index].name;
    tableData4.innerText = getItems[index].quant;
  
    tableRow.appendChild(tableData1);
    tableRow.appendChild(tableData2);
    tableRow.appendChild(tableData3);
    tableRow.appendChild(tableData4);
    table.appendChild(tableRow);
  }
}
