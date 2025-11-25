import productsTemplate from "../src/template.hbs"

const bookmarkList = document.getElementById("bookmarkList");
const bookmarkInput = document.getElementById("bookmarkInput");
const addBookmarkBtn = document.getElementById("addBookmarkBtn");

const createDiv = (id, url) => {
    const newBookmarkElementDiv = document.createElement("div");
    newBookmarkElementDiv.id = id;
    newBookmarkElementDiv.style.display = "flex";
    newBookmarkElementDiv.style.flexDirection = "row";
    newBookmarkElementDiv.style.alignItems = "center";
    newBookmarkElementDiv.style.width = "100%";
    const newBookmarkElementLink = document.createElement("a");
    newBookmarkElementLink.textContent = url;
    newBookmarkElementLink.href = url;
    newBookmarkElementLink.style.flex = "1";
    const newBookmarkDeleteButton = document.createElement("button");
    newBookmarkDeleteButton.classList.add("delete");
    newBookmarkDeleteButton.textContent = "X"

    newBookmarkDeleteButton.addEventListener("click", e => {
        e.preventDefault();
        localStorage.removeItem(id);
        newBookmarkElementDiv.remove();
    });

    newBookmarkElementDiv.append(newBookmarkElementLink, newBookmarkDeleteButton);
    return newBookmarkElementDiv;
}

addBookmarkBtn.addEventListener("click", e => {
    e.preventDefault();
    const url = bookmarkInput.value;
    let index = 1;
    while (localStorage.getItem("url" + index)) {
        index++;
    };
    const key = "url" + index;
    localStorage.setItem(key, JSON.stringify({ url }));
    bookmarkList.append(createDiv(key, url));
    bookmarkInput.value = "";
});

function recoverOldBookmarks() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith("url"));
    keys.forEach(key => {
        const data = JSON.parse(localStorage.getItem(key));
        bookmarkList.append(createDiv(key, data.url));
    });
}

recoverOldBookmarks();



console.log(Object.keys(localStorage));

const username = document.getElementById("username");
const password = document.getElementById("password");
const saveBtn = document.getElementById("saveBtn");

if (localStorage.getItem("user") !== null) { 
    const userData = JSON.parse(localStorage.getItem("user"));
    username.value = userData.user;
    password.value = userData.password;
 };
saveBtn.addEventListener("click", e => {
    e.preventDefault();
    if (username.value.length > 4 && password.value.length > 8) {
        const userDataFill = function(user, password) {
            this.user = user;
            this.password = password;
            this.data = {
                user,
                password
            };
            this.setData = function() {
                localStorage.setItem("user", JSON.stringify(this.data));
            };
        };
        const userData = new userDataFill(username.value, password.value);
        userData.setData();
    } else {
        alert("Error. Low data");
    }
});


const products = [
  {
    name: "Яблуко",
    description: "Соковите червоне яблуко, багате на вітаміни.",
    price: 15.50,
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.fcRjJWL78N40rjJXmSqJcQHaFj%3Fpid%3DApi&f=1&ipt=49c507918d3f3738e93ed9bf2245fdbda1ca47c4c88b355010bf3d4fa736fc40&ipo=images"
  },
  {
    name: "Хліб",
    description: "Свіжий домашній хліб з пшеничного борошна.",
    price: 25.00,
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.DHq6cTDhhHslRfEXeYexFgHaEO%3Fpid%3DApi&f=1&ipt=6d9bb996b46bb6dced2a9402653676947676d49975642e17be9aa65cff9bb4c5&ipo=images"
  },
  {
    name: "Молоко",
    description: "Органічне молоко 3.2% жирності, 1 літр.",
    price: 30.00,
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.xzmgPO3pElF35nhfScuAuwHaHa%3Fpid%3DApi&f=1&ipt=14902794140b7b0ba85330cf82ccdc0af7282498f91fe9fa57b349128d089d0f&ipo=images"
  },
  {
    name: "Сир твердий",
    description: "Сир класичний твердий, багатий на кальцій.",
    price: 120.00,
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.245blSnpF9lTMkwpKr2UOAHaHa%3Fpid%3DApi&f=1&ipt=c2bdf90f8d64c8c86f49c272a958822b1227564cce20c1344449549c334d1e94&ipo=images"
  },
  {
    name: "Помідор",
    description: "Соковиті свіжі помідори для салатів і соусів.",
    price: 40.00,
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.IOaUZ8Z52-RdwMW_HBQ8vAHaFj%3Fpid%3DApi&f=1&ipt=a3eacee4f3a9c27100dc870fe8f24a6f03cdd04de58384df7f25de63fd375642&ipo=images"
  },
  {
    name: "Банан",
    description: "Солодкі банани, багаті на калій.",
    price: 20.00,
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.T8wx-f8tYFIo2lUJXrmf4QHaFr%3Fpid%3DApi&f=1&ipt=b2adef2753077cc4faf48f4fb2f17dbaea1c33ec59cfa2c1ba70468065b36a9e&ipo=images"
  }
];

const productsList = productsTemplate({products});

document.getElementById("productContainer").innerHTML = productsList;