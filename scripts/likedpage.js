// get myLikes (all likes) and matches from localStorage -------------------------------------------------------------------
let matches = JSON.parse(localStorage.data).filter(person => {
    return person.liked == true && person.likedMe == true;
});

// html page elements ------------------------------------------------------------------------------------------------------
const main = document.getElementsByTagName("main")[0];
const footerText = document.getElementsByTagName("footer")[0].getElementsByTagName("p")[0];
const removeButtons = document.getElementsByTagName("button");
const chatList = document.getElementsByTagName("ul")[0];
const chatListItems = document.getElementsByTagName("li");

// disable html-only content if js is enabled -------------------------------------------------------------------------------
chatList.innerHTML = "";

// on pageload  -------------------------------------------------------------------------------------------------------------
// if liked page is empty, hide the main (background)
if (matches.length == 0) {
    main.classList.add("invisible");
    footerText.classList.remove("invisible");
    footerText.textContent = "No people in your liked list yet.";
}

// display all my matches on the matches page
for (let i = 0; i < matches.length; i++) {
    
    // make a list item and put it in the "clItems" array
    chatList.innerHTML += "<li><figure data-id='" + matches[i].firstName + "'><form action='' method='post'><button><img src='' alt='profilepicture'></button><button>x</button></form><div class='notification'></div><figcaption><h4>Username</h4><p>Message</p></figcaption></figure></li>"
    
    // give every chat the right details
    const photo = chatList.getElementsByTagName("img")[i];
    const name = chatList.getElementsByTagName("h4")[i];
    const msg = chatList.getElementsByTagName("p")[i];
    const notification = chatList.querySelectorAll(".notification")[i];
    
    photo.src = "images/" + matches[i].photo;
    name.textContent = matches[i].firstName + " " + matches[i].lastName;
    msg.textContent = matches[i].msg;
    
    // show only notifications of unseen matches
    if (matches[i].newMatch == false) {
        notification.style.display = "none"
    }
}

// functions -----------------------------------------------------------------------------------------------------------------
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

// function that gets executed when user clicks on chat (to remove 'new' notification)
function removeNotification(e) {
    // update the currentData
    const currentData = JSON.parse(localStorage.data);
    const clickedUser = currentData.find(person => {
        return person.firstName == e.target.closest("figure").dataset.id;
    });

    clickedUser.newMatch = false;

    // put the updated currentData in localStorage
    localStorage.setItem("data", JSON.stringify(currentData));
    location.reload()
}

// eventlisteners -------------------------------------------------------------------------------------------------------------
// ... for removebuttons
for (i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", dislike)
}

// ... for clicking on chat
for (i = 0; i < chatListItems.length; i++) {
    chatListItems[i].addEventListener("click", removeNotification)
}

// after 2 seconds, the latest user i've liked also liked me! (match effect) --------------------------------------------------
setTimeout(newMatch, 2000);
function newMatch(){
    // update the currentData
    const currentData = JSON.parse(localStorage.data);
    const newMatch = currentData.find(person => {
        return person.liked === true && person.likedMe === null;
    });
    
    if (newMatch) {
        newMatch.likedMe = true;

        // put the updated currentData in localStorage
        localStorage.setItem("data", JSON.stringify(currentData));
        location.reload();    
    }
}

