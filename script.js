document.addEventListener("DOMContentLoaded", () => {
    const isMobile = () => window.innerWidth <= 900;

    // Dato-logikk for dagens dato
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    const formatDate = (date) => date.toISOString().split('T')[0];
    const arrivalStr = formatDate(now);
    const departureStr = formatDate(tomorrow);

    // 1. Initialiser Clock PMS
    window.clockPmsWbeInit({
        wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
        entrypoint: "rooms",
        defaultMode: isMobile() ? "mobile" : "fullscreen", 
        roundedCorners: false,
        language: "nb"
    });

    // 2. Funksjon for å åpne spesifikke pakker med rateIds
    const openPackage = (rateId) => {
        window.clockPmsWbeShowRooms({
            "submit": true,
            "arrival": arrivalStr,
            "departure": departureStr,
            "rateIds": [rateId],
            "mode": isMobile() ? "mobile" : "fullscreen"
        });
    };

    // Koble knapper til pakker
    document.getElementById("btn-romantikk")?.addEventListener("click", () => openPackage(734476));
    document.getElementById("btn-girls")?.addEventListener("click", () => openPackage(734474));
    document.getElementById("btn-sauna")?.addEventListener("click", () => openPackage(734475));

    // 3. Flatpickr for søkebaren
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

    // 4. Håndter vanlig søkeskjema
    document.getElementById("wbe-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        window.clockPmsWbeShow({
            arrival: formData.get("arrival"),
            departure: formData.get("departure"),
            bonusCode: formData.get("bonusCode"),
            submit: true,
            mode: isMobile() ? "mobile" : "fullscreen"
        });
    });
});
