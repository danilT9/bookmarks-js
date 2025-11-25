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
