// Dynamic Elements
let toastElement = () => `
        <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
            <div class="toast" style="position: absolute; top: 0; right: 0;">
                <div class="toast-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
  <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
                    
                    <small>Just now</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        </div>
    `;

let tickElement = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M173.9 439.4c-11.6 0-22.7-4.6-31-12.9l-130-130c-17.2-17.2-17.2-45.1 0-62.3s45.1-17.2 62.3 0L173.9 333l273.9-273.9c17.2-17.2 45.1-17.2 62.3 0s17.2 45.1 0 62.3l-305 305c-8.3 8.3-19.4 12.9-31 12.9z"/></svg>`;

// Dynamic Elements

// Local Storage
let todos = [];

localStorage.getItem("todos")
  ? (todos = JSON.parse(localStorage.getItem("todos")))
  : localStorage.setItem("todos", JSON.stringify([]));

// Local Storage

function createLiElement(input, isCompleted) {
  // Yeni bir li elemanı oluştur
  let liDOM = document.createElement("li");
  liDOM.className = "list-group-item d-flex justify-content-between align-items-center mt-2";
  liDOM.style.backgroundColor = isCompleted ? "lightblue" : "orange"; // Tamamlanmışsa mavi, değilse turuncu

  // İçerik kısmını oluştur
  let divDOM = document.createElement("div");
  divDOM.className = "d-flex align-items-center";
  
  let tickDiv = document.createElement("div");
  tickDiv.className = "tickElement";

  let spanDOM = document.createElement("span");
  spanDOM.className = "ms-2";
  spanDOM.textContent = input;

  divDOM.appendChild(tickDiv);
  divDOM.appendChild(spanDOM);

  // Silme butonu
  let deleteDiv = document.createElement("div");
  deleteDiv.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 448 512">
      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
  `;
  
  liDOM.appendChild(divDOM);
  liDOM.appendChild(deleteDiv);
  
  // Silme ve renk değiştirme fonksiyonları
  deleteDiv.addEventListener("click", deleteMessage);
  liDOM.addEventListener("click", changeColor);
  
  return liDOM;
}

// Frontend oluşturma
todos.forEach((element) => {
  let liDOMLoading = createLiElement(element.info, element.isCompleted); // innerHTML yerine createLiElement kullanılıyor

  if (element.isCompleted === true) {
    let divDOM = liDOMLoading.querySelector(".tickElement");
    divDOM.innerHTML = tickElement(); // Tick ikonunu ekle
  }

  let ulDomLoading = document.querySelector("#list");
  ulDomLoading.appendChild(liDOMLoading); // liDOM'u doğrudan ekle
});

let ekleDOM = document.querySelector("#liveToastBtn");
ekleDOM.classList.add("btn", "btn-success");

let ulDom = document.querySelector("#list");
ulDom.classList.add("list-group");
ulDom.style.listStyleType = "none"; // Başta gözüken nokta stilini kapatma
let headerDOM = document.querySelector(".header");

headerDOM.classList.add(
  "d-flex",
  "flex-column",
  "justify-content-center",
  "align-items-center",
  "text-center",
  "p-3"
);

//Creating Frontend

let message = "";
let toDomessage = "";

function newElement() {
  let inputDom = document.querySelector("#task");
  let input = inputDom.value;
  if (input == "" || input.trim() == "") {
    message = "Lütfen Bir İçerik Giriniz!";
    showToast();
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    const infoObject = { info: input, isCompleted: false };
    todos.unshift(infoObject);
    localStorage.setItem("todos", JSON.stringify(todos));
    let liDOM = createLiElement(input, false);
    let ulDom = document.querySelector("#list");
    ulDom.prepend(liDOM);
    message = "Başarı Bir Şekilde Eklendi!";
    showToast();
  }
}

function deleteMessage(event) {
  event.stopPropagation(); // Olayın baloncuklama sürecini durdur

  const clickedElement = event.target.closest("div"); // Tıklanan div elementi
  if (clickedElement) {
    const listItem = clickedElement.closest("li"); // İlgili li elementini bul

    if (listItem) {
      todos = JSON.parse(localStorage.getItem("todos"));
      let elementContext = listItem.innerText;
      let elementIndex = todos.findIndex((item) => item.info === elementContext);
      todos.splice(elementIndex, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      listItem.remove(); // li elementini sil
    }
  }
}

function changeColor(event) {
  const clickedElement = event.currentTarget; // Tıklanan li elementi
  let liContext = clickedElement.innerText;
  event.stopPropagation();
  let object = todos.find((item) => item.info == liContext);
  let index = todos.findIndex((item) => item.info === liContext);

  if (object.isCompleted) {
    removeAnimation(event);
    clickedElement.style.backgroundColor = "orange";
  } else {
    makeAnimation(event);
    clickedElement.style.backgroundColor = "lightblue";
  }
  todos[index].isCompleted = !object.isCompleted;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function makeAnimation(event) {
  let liElement = event.currentTarget;
  let divDOM = liElement.querySelector(".tickElement");
  divDOM.innerHTML = tickElement(); // Tick ikonunu ekle
}

function removeAnimation(event) {
  let liElement = event.currentTarget;
  let svgDOM = liElement.querySelector(".tickElement>svg");
  svgDOM.remove();
}

// Toast gösterme fonksiyonu
function showToast() {
  let toastContainer = document.querySelector("#toastContainer");
  toastContainer.innerHTML = toastElement(message); // Mesajı toasta ekle

  let toastEl = document.querySelector(".toast");
  let toast = new bootstrap.Toast(toastEl); // Bootstrap Toast nesnesi
  toast.show(); // Toast'u göster
}
