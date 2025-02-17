document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitButton");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

   
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const message = document.getElementById("message").value.trim();


        if (!name || !email || !phone || !address || !message) {
            alert("Please fill out all fields before submitting.");
            return;
        }


        submitButton.innerText = "Processing...";
        submitButton.style.backgroundColor = "#ccc";
        submitButton.style.cursor = "wait";

        setTimeout(() => {
            submitButton.innerText = "✔ Submitted";
            submitButton.style.backgroundColor = "#28a745";
            submitButton.style.color = "white";
            submitButton.style.cursor = "default";

            setTimeout(() => {
                submitButton.innerText = "Submit";
                submitButton.style.backgroundColor = "white";
                submitButton.style.color = "black";
                submitButton.style.cursor = "pointer";
                form.reset();
            }, 2000);
        }, 2000);
    });

    document.getElementById("mobile-menu").addEventListener("click", function() {
        document.querySelector(".nav-links").classList.toggle("active");
    });
});
