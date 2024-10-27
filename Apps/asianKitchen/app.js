const menu = [
  {
    id: 1,
    title: "Tteokbokki",
    category: "Korea",
    price: 10.99,
    img:
      "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
    desc: `Spicy rice cakes, serving with fish cake.`,
  },
  {
    id: 2,
    title: "Chicken Ramen",
    category: "Japan",
    price: 7.99,
    img:
      "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
    desc: `Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg. `,
  },
  {
    id: 3,
    title: "Bibimbap",
    category: "Korea",
    price: 8.99,
    img:
      "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
    desc: `Boiling vegetables, serving with special hot sauce`,
  },
  {
    id: 4,
    title: "Dan Dan Mian",
    category: "China",
    price: 5.99,
    img:
      "https://img.freepik.com/premium-photo/dan-dan-noodles-fiery-sichuan-noodle-sensation_818261-25557.jpg",
    desc: `Dan dan noodle, serving with green onion `,
  },
  {
    id: 5,
    title: "Yangzhou Fried Rice",
    category: "China",
    price: 12.99,
    img:
      "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
    desc: `Yangzhou style fried rice, serving with bean and pickles `,
  },
  {
    id: 6,
    title: "Onigiri",
    category: "Japan",
    price: 9.99,
    img:
      "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
    desc: `Rice Sandwich, serving with soy sauce`,
  },
  {
    id: 7,
    title: "Jajangmyeon",
    category: "Korea",
    price: 15.99,
    img:
      "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
    desc: `Black bean sauce noodle, serving with green onion `,
  },
  {
    id: 8,
    title: "Ma Yi Shang Shu",
    category: "China",
    price: 12.99,
    img:
      "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
    desc: `Hot pepper sauce noodle, serving with soy bean and onion`,
  },
  {
    id: 9,
    title: "Doroyaki",
    category: "Japan",
    price: 3.99,
    img:
      "https://www.justonecookbook.com/wp-content/uploads/2011/10/Dorayaki-New-500x400.jpg",
    desc: `Red bean paste dessert, serving with honey.`,
  },
];



// Dynamic Elements

const buttonElement = (buttonName) => `<button type="button" class="btn btn-outline-info">${buttonName}</button>`

// Dynamic Elements

// Creating Frontend
  let btnContainer = document.querySelector('.btn-container');

  let buttonAll = buttonElement('All');
  let buttonKorea = buttonElement('Korea');
  let buttonJapan = buttonElement('Japan'); 
  let buttonChina = buttonElement("China");

// We perform the append operation separately for each button.

btnContainer.innerHTML += buttonAll;
btnContainer.innerHTML += buttonKorea;
btnContainer.innerHTML += buttonJapan;
btnContainer.innerHTML += buttonChina;

// Adding margin to Div element 
btnContainer.classList.add('mx-3');

// Adding margin to all button elements 
const buttons = btnContainer.querySelectorAll('button');
buttons.forEach(button => {
    button.classList.add('mx-4');
    button.addEventListener('click', goMenuPage);
});


// Creating Frontend



// Menu Container

let items = [];

let menuContainerDOM = document.querySelector(".section-center");
let leftMenuContainerDOM = document.createElement("div");
let rightMenuContainerDOM = document.createElement("div");
leftMenuContainerDOM.id = "leftMenuContainer";
rightMenuContainerDOM.id = "rightMenuContainer";
menuContainerDOM.display="flex";
leftMenuContainerDOM.style.width = '50%';
rightMenuContainerDOM.style.width = '50%';


// Width and styles
leftMenuContainerDOM.style.width = '50%';
rightMenuContainerDOM.style.width = '50%';
menuContainerDOM.style.display = "flex"; // Yan yana görünüm için flex

// Adding style to ensure items do not overlap and have space between them

leftMenuContainerDOM.style.display = 'flex';
rightMenuContainerDOM.style.display = 'flex';
leftMenuContainerDOM.style.flexDirection = 'column';
rightMenuContainerDOM.style.flexDirection = 'column';

// Add margin-bottom to add space to menu containers

leftMenuContainerDOM.style.gap = '10px';
rightMenuContainerDOM.style.gap = '10px';





const verticalDivider = document.createElement("div");
verticalDivider.classList.add("vr", "mx-3",); 
verticalDivider.style.backgroundColor = "lightblue"; 
verticalDivider.style.width = "4px"; 
verticalDivider.style.height = menuContainerDOM.height // Height is set to the size of the menu


// Adding everything to the main container

menuContainerDOM.append(leftMenuContainerDOM, verticalDivider, rightMenuContainerDOM);

menuContainerDOM.style.alignItems = "stretch"; // Elemanları esnetme

function listItems() {

  // Clear existing items first

  leftMenuContainerDOM.innerHTML = '';
  rightMenuContainerDOM.innerHTML = '';
  /*

  leftMenuContainerDOM.style.display = 'flex';
  rightMenuContainerDOM.style.display = 'flex';
  rightMenuContainerDOM.style.flexDirection = 'column';
  leftMenuContainerDOM.style.flexDirection = 'column';
  */
  items.forEach( (item,index) => {



    // Creating new container and content

    const itemContainer = document.createElement("div");
    const itemPicture = document.createElement("div");

    itemPicture.classList.add("me-5")
    itemPicture.style.width = "200px"; // Image container size

    itemPicture.style.height = "200px";
    itemPicture.style.overflow = "hidden"; // To prevent overflow
    itemPicture.style.flexShrink = "0"; // To ensure that the container does not stretch

    itemPicture.style.outline = '2px solid lightblue'; 
    itemPicture.style.outlineOffset = '1px'; 
    itemPicture.style.borderRadius = '10px'; 


    const itemInfoContainer = document.createElement("div");

    const itemTitle = document.createElement("p");
    const itemPrice = document.createElement("p");
    const itemDescription = document.createElement("p");

    itemInfoContainer.style.display = 'flex';
    itemInfoContainer.style.flexDirection = 'column';

    // Creating image
    const imgElement = document.createElement('img');
    imgElement.src = item.img;
    imgElement.src = item.img;
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";
    // To center the image in the container
    imgElement.style.objectFit = "contain";
    imgElement.style.objectPosition = "center"; 
    
    // Description part
    itemTitle.innerText = item.title;
    itemPrice.innerText = item.price.toFixed(2); // Display price with two decimal places

    itemDescription.innerText = item.desc;

    // Create a div to contain the first two <p> elements

    const topDiv = document.createElement('div');
    topDiv.style.display = 'flex';
    topDiv.style.justifyContent = 'space-between';

    // We set margin to add space to the last <p> element

    itemDescription.style.marginTop = '10px'; // Align the bottom element with some space


    topDiv.append(itemTitle, itemPrice); // Adding two paragraphs
    itemInfoContainer.append(topDiv, itemDescription); // Updating information container


    itemContainer.classList.add("d-flex");
    itemPicture.appendChild(imgElement); // Adding picture
    itemContainer.append(itemPicture, itemInfoContainer); // Adding to main container

    if(index %2 ==0) {
      leftMenuContainerDOM.append(itemContainer); // Adding to menu container
    }else {
      rightMenuContainerDOM.append(itemContainer);
    }
    
   
  });
}


//The process of updating the menu list according to the content of the clicked button
function goMenuPage(event) {
  const clickedButton = event.target;
  let buttonText = clickedButton.textContent
  console.log('Buton metni:', clickedButton.textContent);
  items.length = 0;
  if (buttonText === "All") {
    items = [...menu];
  } else {
    items = menu.filter(item => item.category === buttonText);
  }
  console.log(items);
  listItems();
}