document.addEventListener("DOMContentLoaded", async () => {
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
        boldedQuote.style.width = '0';
        boldedQuote.style.padding = '0';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    });

    try {
        const [stateResponse, lastBigThingResponse] = await Promise.all([
            fetch("/state").then(res => res.json()),
            fetch("/lastbigthing").then(res => res.json())
        ]);
        document.querySelector('span#state').innerText = "Currently: " + stateResponse.thing;
        console.log(lastBigThingResponse);
        setTimeout(() => {
            document.querySelector('section.loader').classList.add("active")
            setTimeout(() => {
                for (const thing of lastBigThingResponse) {
                    toast.show(`Last big thing: ${thing.thing}`, "default", 10000);
                }
            }, 700);
            updateNow()
        }, 1000);
    } catch (error) {
        console.error("An error occurred:", error);
    }
});
