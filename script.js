document.addEventListener("DOMContentLoaded", () => {
    // Sjekk enhet for Clock-modus
    const isMobile = () => window.innerWidth <= 900;

    // Hent dagens og morgendagens dato
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    const formatDate = (date) => date.toISOString().split('T')[0];
    const todayStr = formatDate(now);
    const tomorrowStr = formatDate(tomorrow);

    // Initialiser Clock PMS
    window.clockPmsWbeInit({
        wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
        entrypoint: "rooms",
        defaultMode: isMobile() ? "mobile" : "fullscreen", 
        roundedCorners: false, // Renere look
        language: "nb"
    });

    // Elegant dato-velger (Flatpickr)
    const fp = flatpickr("#date-range", {
        mode: "range",
        minDate: "today",
        locale: "no",
        dateFormat: "Y-m-d",
        onClose: function(selectedDates) {
            if (selectedDates.length === 2) {
                document.getElementById("arrival").value = fp.formatDate(selectedDates[0], "Y-m-d");
                document.getElementById("departure").value = fp.formatDate(selectedDates[1], "Y-m-d");
            }
        }
    });

    // Pakke-knappen med DYNAMISK dato (Smart logikk)
    const romBtn = document.getElementById("btn-romantikk");
    if (romBtn) {
        romBtn.addEventListener("click", () => {
            window.clockPmsWbeShowRooms({
                "submit": true,
                "arrival": todayStr,
                "departure": tomorrowStr,
                "rateIds": [734476],
                "mode": isMobile() ? "mobile" : "fullscreen"
            });
        });
    }

    // Søkeskjema-logikk
    const bookingForm = document.getElementById("wbe-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const arrival = formData.get("arrival");
            const departure = formData.get("departure");

            if (!arrival || !departure) {
                fp.open();
                return;
            }

            const params = {
                arrival: arrival,
                departure: departure,
                submit: true,
                mode: isMobile() ? "mobile" : "fullscreen"
            };

            const bonus = formData.get("bonusCode");
            if (bonus && bonus.trim()) params.bonusCode = bonus.trim();

            window.clockPmsWbeShow(params);
        });
    }
});
