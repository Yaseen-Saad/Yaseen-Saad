document.querySelector("span#age")?.innerText ? document.querySelector("span#age").innerText = parseInt(Math.abs(new Date("11, March, 2008").getTime() - Date.now()) / 1000 / 60 / 60 / 24 / 365.25) : "";
document.querySelectorAll('.sentence').forEach(quote => {
    quote.addEventListener("click", event => {
        const quote = event.target;
        const quoteText = quote.innerText;
        const quoteDescription = event.target.getAttribute("data-quote-description")

        // Get the bolded quote section
        const boldedQuote = document.querySelector('#bolded-quote');
        const boldedQuoteText = boldedQuote.querySelector('h2');
        const quoteDescriptionText = boldedQuote.querySelector('p');
        const overlay = document.querySelector('#overlay');
        quote.classList.add("active")
        boldedQuoteText.innerText = quoteText;
        quoteDescriptionText.innerHTML = quoteDescription;
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        boldedQuote.style.width = '80vw'; // Expand to normal size
        boldedQuote.style.padding = '20px';
    });
});
document.querySelector('#overlay').addEventListener('click', () => {
    const boldedQuote = document.querySelector('#bolded-quote');
    const overlay = document.querySelector('#overlay');
    document.querySelector('article.sentence.active').classList.remove("active")
    boldedQuote.style.width = '0'; // Collapse horizontally
    boldedQuote.style.padding = '0';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
});



class Toast {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    show(message, type = "default", duration) {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerText = message;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 10);
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 500);
        }, duration);
    }
}
const toast = new Toast("toast-container");
fetch("/lastbigthing").then(
    res => res.json()
).then(data => {
    toast.show(`Last big thing: ${data.thing}`, "default", 10000);
})