document.addEventListener("DOMContentLoaded", () => {
    const isMobile = () => window.innerWidth <= 768;

    // 1. Initialiser Clock PMS
    window.clockPmsWbeInit({
        wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
        entrypoint: "rooms",
        defaultMode: isMobile() ? "mobile" : "fullscreen", 
        roundedCorners: true,
        language: "nb"
    });

    // 2. Logikk for dagens og morgendagens dato
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const arrivalStr = formatDate(today);
    const departureStr = formatDate(tomorrow);

    // 3. Sett funksjon på "ROMANTISK PAKKE" knappen
    const romBtn = document.getElementById("btn-romantikk");
    if (romBtn) {
        romBtn.addEventListener("click", () => {
            window.clockPmsWbeShowRooms({
                "submit": true,
                "arrival": arrivalStr,
                "departure": departureStr,
                "rateIds": [734476],
                "mode": isMobile() ? "mobile" : "fullscreen"
            });
        });
    }

    // 4. Flatpickr
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

    // 5. Søkeskjema
    const bookingForm = document.getElementById("wbe-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const arrival = formData.get("arrival");
            const departure = formData.get("departure");

            if (!arrival || !departure) {
                alert("Vennligst velg datoer");
                return;
            }

            const params = {
                arrival: arrival,
                departure: departure,
                mode: isMobile() ? "mobile" : "fullscreen",
                submit: true
            };

            const bonus = formData.get("bonusCode");
            if (bonus && bonus.trim() !== "") params.bonusCode = bonus.trim();

            window.clockPmsWbeShow(params);
        });
    }
});
