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

function updateNow() {

    const now = new Date();
    const currentHour = (now.getUTCHours() + 3) % 24


    const currentBar = document.querySelector(`span#bar:nth-child(${currentHour})`)
    const prev = currentBar.previousElementSibling;
    currentBar.classList.add("active")
    const next = currentBar.nextElementSibling;
    if (currentHour <= 9) {
        currentBar.classList.add("night")
    }

    currentBar.querySelector('span').style.height = "100%"
    if (prev) {
        prev.querySelector('span').style.height = "70%"
    }
    if (next) {
        next.querySelector('span').style.height = "70%";
    }

}