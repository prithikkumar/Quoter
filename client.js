const form = document.querySelector("form");
const loading_element = document.querySelector(".loading-gif");
const API_URL = "https://quoter-app.herokuapp.com/quoter";
const del_btn = document.getElementById("del-btn");
const quote_feed = document.querySelector(".quote-feed");
const errorElement = document.querySelector(".required");

errorElement.style.display = 'none';
listAllQuotes();

function listAllQuotes(reset = true) {
    if (reset) {
        quote_feed.innerHTML = '';
    }
    fetch(API_URL)
        .then((res) => res.json())
        .then((quotes) => {
            if (quotes.length <= 0) {
                document.getElementById("paq").style.display = "";
            } else {
                document.getElementById("paq").style.display = "none";
                quotes.reverse().forEach((Quote) => {
                    const Name = document.createElement("h1");
                    Name.className = "name";
                    Name.textContent = Quote.name;

                    const contents = document.createElement("h1");
                    contents.className = "quote";
                    contents.style.color = Quote.color;
                    contents.textContent = Quote.quote;

                    const div_namecontainer = document.createElement("div");
                    div_namecontainer.className = "name-container";
                    div_namecontainer.appendChild(Name);

                    const div_quotecontainer = document.createElement("div");
                    div_quotecontainer.className = "quote-container";
                    div_quotecontainer.appendChild(contents);

                    const div_profilecontainer = document.createElement("div");
                    div_profilecontainer.className = "profile-container";
                    div_profilecontainer.appendChild(div_namecontainer);

                    const div_actioncontainer = document.createElement("div");
                    const date = document.createElement('p');
                    date.className = "date";
                    date.style = "font-weight: 400; font-size: 16px";
                    date.textContent = Quote.sculpted;

                    const time = document.createElement('p');
                    time.className = "date";
                    time.style = "font-weight: 400; font-size: 16px";
                    time.textContent = Quote.time;

                    const div_datedisplay = document.createElement('div');
                    div_datedisplay.className = "date-display";
                    div_datedisplay.appendChild(date);
                    div_datedisplay.appendChild(time);

                    const div_intcont = document.createElement('div');
                    div_intcont.className = "interaction-container";
                    div_actioncontainer.className = "action-container";
                    div_actioncontainer.appendChild(div_datedisplay);

                    div_intcont.appendChild(div_actioncontainer);

                    const div_innerquotecontainer = document.createElement("div");
                    div_innerquotecontainer.className = "inner-quote-container";
                    div_innerquotecontainer.appendChild(div_profilecontainer);
                    div_innerquotecontainer.appendChild(div_quotecontainer);

                    div_innerquotecontainer.appendChild(div_intcont);

                    const div_mainquotecontainer = document.createElement("div");
                    div_mainquotecontainer.className = "main-quote-container";
                    div_mainquotecontainer.appendChild(div_innerquotecontainer);

                    const div_contentcontainer = document.createElement("div");
                    div_contentcontainer.className = "content-container";
                    div_contentcontainer.appendChild(div_mainquotecontainer);
                    quote_feed.appendChild(div_contentcontainer);
                });
            }
        });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const quote = formData.get("quote-input");
    const color = formData.get("color-input");
    const profile = formData.get("profile-input");

    const quoter = {
        name,
        quote,
        color
    };

    form.style.display = "none";
    loading_element.style.display = "";

    fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(quoter),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((createdquote) => {
            form.reset();
            form.style.display = "";
            loading_element.style.display = "none";
            console.log(createdquote);
            listAllQuotes();
        })
        .catch((err) => {
            form.style.display = "";
            loading_element.style.display = "none";
            errorElement.textContent = err;
            errorElement.style.display = "block";
        });
});


var loadFile = function (event) {
    var image = document.getElementById("profile-pic-input");
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "cover";
    image.src = URL.createObjectURL(event.target.files[0]);
};