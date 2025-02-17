document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const timeslots = document.getElementById("timeslots");
    const confirmBooking = document.getElementById("confirmBooking");
    const clientForm = document.getElementById("clientForm");
    const prevWeek = document.getElementById("prevWeek");
    const nextWeek = document.getElementById("nextWeek");
    const selectedDateHeader = document.getElementById("selectedDateHeader");
    const currentWeek = document.getElementById("currentWeek");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    let selectedDate = null;
    let selectedTime = null;
    let startDate = new Date();

    function updateWeek() {
        generateCalendar();
    }

    // Function to generate the calendar
    function generateCalendar() {
        calendar.innerHTML = "";
        for (let i = 0; i < 7; i++) {
            let tempDate = new Date(startDate);
            tempDate.setDate(startDate.getDate() + i);
            let button = document.createElement("div");
            button.textContent = tempDate.getDate();
            button.classList.add("calendar-day");

            if (tempDate.getDay() === 0 || tempDate.getDay() === 6) {
                button.style.opacity = "0.5";
                button.style.pointerEvents = "none";
            } else {
                button.onclick = () => selectDate(tempDate, button);
            }
            calendar.appendChild(button);
        }
    }

    // Function to format the date
    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Function to generate and display time slots 
    function generateTimeSlots() {
        timeslots.innerHTML = ""; 
        const hours = [9, 10, 11, 12, 13, 14, 15, 16]; 

        hours.forEach(hour => {
            let timeSlot = document.createElement("div");
            let timeLabel = hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
            timeSlot.textContent = timeLabel;
            timeSlot.classList.add("timeslot");

            timeSlot.onclick = () => selectTime(timeSlot, timeLabel);
            timeslots.appendChild(timeSlot);
        });
    }

    // Function to select a date
    function selectDate(date, button) {
        document.querySelectorAll(".calendar-day").forEach(day => day.classList.remove("selected"));
        button.classList.add("selected");
        selectedDate = date.toDateString();
        currentWeek.textContent = formatDate(date);
        validateForm();  
    }

    // Function to select a time
    function selectTime(timeSlot, timeLabel) {
        document.querySelectorAll(".timeslot").forEach(slot => slot.classList.remove("selected"));
        timeSlot.classList.add("selected");
        selectedTime = timeLabel;
        validateForm();  
    }

    // Function to validate the form and enable the Confirm Booking button
    function validateForm() {
        const nameValid = nameInput.value.trim() !== "";
        const emailValid = emailInput.value.trim() !== "";
        const phoneValid = phoneInput.value.trim() !== "";

        const formValid = selectedDate && selectedTime && nameValid && emailValid && phoneValid;
        confirmBooking.disabled = !formValid; 
    }

    // Attach input event listeners for validation 
    clientForm.addEventListener("input", validateForm);  


    confirmBooking.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "verification.html"; 
    });

    // Event listeners for navigating weeks
    prevWeek.onclick = () => {
        startDate.setDate(startDate.getDate() - 7);
        updateWeek();
    };

    nextWeek.onclick = () => {
        startDate.setDate(startDate.getDate() + 7);
        updateWeek();
    };

    // Initialize the view
    updateWeek();
    generateTimeSlots();  
});
