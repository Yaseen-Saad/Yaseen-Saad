document.addEventListener("DOMContentLoaded", async () => {

  try {
    const [bookResponse, lastBigThingResponse] = await Promise.all([
      fetch("/currentbook").then(res => res.json()),
      fetch("/lastbigthing").then(res => res.json())
    ]);
    const bookurl = document.createElement("a")
    bookurl.href = bookResponse.url
    bookurl.innerText = bookResponse.thing;
    document.querySelector('span#currentbook').append(bookurl);
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

})