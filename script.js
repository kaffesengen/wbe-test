document.addEventListener("DOMContentLoaded", () => {
    // Dato-oppsett
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    const formatDate = (d) => d.toISOString().split('T')[0];

    const fp = flatpickr("#date-range", {
        mode: "range",
        minDate: "today",
        locale: "no",
        dateFormat: "Y-m-d",
        onClose: (selectedDates) => {
            if (selectedDates.length === 2) {
                document.getElementById("arrival").value = formatDate(selectedDates[0]);
                document.getElementById("departure").value = formatDate(selectedDates[1]);
            }
        }
    });

    // Initialiser Clock
    window.clockPmsWbeInit({
        wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
        defaultMode: window.innerWidth < 900 ? "mobile" : "fullscreen",
        language: "nb"
    });

    // Fiks for bonuskode-feil
    document.getElementById("wbe-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const params = {
            arrival: formData.get("arrival"),
            departure: formData.get("departure"),
            submit: true
        };

        const bonus = formData.get("bonusCode");
        if (bonus && bonus.trim() !== "") {
            params.bonusCode = bonus.trim();
        }

        window.clockPmsWbeShow(params);
    });

    // Pakke-knapper
    const showPack = (id) => window.clockPmsWbeShowRooms({
        submit: true, arrival: formatDate(now), departure: formatDate(tomorrow), rateIds: [id]
    });

    document.getElementById("btn-romantikk")?.onclick = () => showPack(734476);
    document.getElementById("btn-girls")?.onclick = () => showPack(734474);
    document.getElementById("btn-sauna")?.onclick = () => showPack(734475);
});
