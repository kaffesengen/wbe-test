document.addEventListener("DOMContentLoaded", () => {
    const isMobile = () => window.innerWidth <= 768;

    // Initialiserer Clock PMS WBE
    window.clockPmsWbeInit({
        wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
        entrypoint: "rooms",
        defaultMode: isMobile() ? "mobile" : "fullscreen", 
        roundedCorners: true,
        language: "nb"
    });

    // Elegant datovelger (Flatpickr)
    const fp = flatpickr("#date-range", {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        locale: "no",
        onClose: function(selectedDates) {
            if (selectedDates.length === 2) {
                document.getElementById("arrival").value = fp.formatDate(selectedDates[0], "Y-m-d");
                document.getElementById("departure").value = fp.formatDate(selectedDates[1], "Y-m-d");
            }
        }
    });

    // Innsending av skjema
    const bookingForm = document.getElementById("wbe-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            const bookingParams = {
                arrival: formData.get("arrival"),
                departure: formData.get("departure"),
                mode: isMobile() ? "mobile" : "fullscreen",
                submit: true 
            };

            const bonus = formData.get("bonusCode");
            if (bonus && bonus.trim() !== "") {
                bookingParams.bonusCode = bonus.trim();
            }

            window.clockPmsWbeShow(bookingParams);
        });
    }
});
