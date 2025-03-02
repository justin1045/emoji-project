import { emojiList } from "./emojiList.js";

let emojiContainer = document.querySelector(".emojiContainer");

const array = document.querySelectorAll("li");

const searchInput = document.querySelector("input");

const form = document.querySelector("form");

const mode = document.getElementById("mode");

const hider = document.getElementById("hider");

const body = document.querySelector("body");

// console.log(emojiContainer);
// this fuction giving all the emojis as it is coz we need all the emojis when we open the page.
displayEmojis(emojiList);

function displayEmojis(arr) {
  emojiContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  arr.forEach((obj) => {
    const emoji = document.createElement("span");
    emoji.style.fontSize = "3rem";
    
    emoji.innerText = obj.emoji;
    fragment.append(emoji);
  });

  emojiContainer.append(fragment);
}

form.addEventListener("submit" , (e) => {
    e.preventDefault();
    const filterName = searchInput.value.toLowerCase();
    const filteredEmojis = search(emojiList, filterName);
    searchInput.value = "";   
    displayEmojis(filteredEmojis);  

})

// this will give us an filtered emoji array and we will pass this array in our above display function so will get the only filtered emoji for all the li and also this function will work for our search eventlistner also

array.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    const filterName = e.target.innerText.toLowerCase();

    const filteredEmojis = search(emojiList, filterName);

    displayEmojis(filteredEmojis); 
    // giving the filter emojis on display function
  });
});

// this will work for our filters search function to give the array and part of just above filter function

function search(emojiList, filterName) {
  if (filterName === "all") {
    return emojiList;
  }

  let arr = emojiList.filter((obj) => {
    if (obj.description.includes(filterName)) {
      return true;
    } else if (obj.aliases.join("").includes(filterName)) {
      return true;
    } else if (obj.tags.join("").includes(filterName)) {
      return true;
    } else if (obj.category.includes(filterName)) {
      return true;
    }
  });

  return arr;

//   giving the filtered emoji array based on our search

}

// this for our search in website

searchInput.addEventListener("keyup", (e) => {
  const filterName = e.target.value.toLowerCase();
  const filteredEmojis = search(emojiList, filterName);   
  displayEmojis(filteredEmojis);
});


mode.addEventListener("click", (e)=>{
  hider.classList.toggle("right-move");
  body.classList.toggle("dark-mode");
  searchInput.style.color = "black"
});