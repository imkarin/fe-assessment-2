// get matches from localStorage
let matches = JSON.parse(localStorage.data).filter(person => {
    return person.liked == true && person.likedMe == true;
});

// html page elements
const main = document.getElementsByTagName("main")[0];
const footerText = document.getElementsByTagName("footer")[0].getElementsByTagName("p")[0];
const removeButtons = document.getElementsByTagName("button");
const chatList = document.getElementsByTagName("ul")[0];

// disable html-only content if js is enabled
chatList.innerHTML = "";

// if liked page is empty, hide the main (background)
if (matches.length == 0) {
    main.classList.add("invisible");
    footerText.classList.remove("invisible");
    footerText.textContent = "No people in your liked list yet.";
}

// display all my matches on the matches page
for (let i = 0; i < matches.length; i++) {

    // make a list item and put it in the "clItems" array
    chatList.innerHTML += "<li><figure data-id='" + matches[i].firstName + "'><form action='' method='post'><button><img src='' alt='profilepicture'></button><button>x</button></form><figcaption><h4>Username</h4><p>Message</p></figcaption></figure></li>"

    // give every chat the right details
    const photo = chatList.getElementsByTagName("img")[i];
    const name = chatList.getElementsByTagName("h4")[i];
    const msg = chatList.getElementsByTagName("p")[i];
    
    photo.src = "images/" + matches[i].photo;
    name.textContent = matches[i].firstName + " " + matches[i].lastName;
    msg.textContent = matches[i].msg;
}

// function that gets executed to delete someone from my matches
function dislike(e) {
    e.preventDefault();
    // update the currentData
    const currentData = JSON.parse(localStorage.data);
    const clickedUser = currentData.find(person => {
        return person.firstName == e.target.closest("figure").dataset.id;
    });
    
    clickedUser.liked = false;

    // put the updated currentData in localStorage
    localStorage.setItem("data", JSON.stringify(currentData));
    location.reload();
}

// removebuttons eventlistener
for (i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", dislike)
}