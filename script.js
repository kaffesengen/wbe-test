document.addEventListener("DOMContentLoaded", () => {
    // 1. DATO LOGIKK
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    const fmt = (d) => d.toISOString().split('T')[0];

    // 2. INITIALISER FLAT PICKR (Hvis feltet finnes på siden)
    const dateInput = document.getElementById("date-range-input");
    if (dateInput) {
        flatpickr("#date-range-input", {
            mode: "range",
            minDate: "today",
            locale: "no",
            dateFormat: "Y-m-d",
            onClose: function(selectedDates) {
                if (selectedDates.length === 2) {
                    document.getElementById("arrival-field").value = fmt(selectedDates[0]);
                    document.getElementById("departure-field").value = fmt(selectedDates[1]);
                }
            }
        });
    }

    // 3. INITIALISER CLOCK PMS WBE
    // Merk: Vi bruker standard init uten videresending her
    if (window.clockPmsWbeInit) {
        window.clockPmsWbeInit({
            wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
            defaultMode: window.innerWidth < 900 ? "mobile" : "fullscreen",
            language: "nb"
        });
    }

    // 4. SØKEKNAPP (SØK LEDIGE ROM)
    const searchForm = document.getElementById("wbe-form-main");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const arrival = document.getElementById("arrival-field").value;
            const departure = document.getElementById("departure-field").value;
            const bonus = document.getElementById("bonus-input").value;

            if (!arrival || !departure) {
                alert("Vennligst velg datoer i kalenderen først.");
                return;
            }

            const params = { arrival, departure, submit: true };
            if (bonus && bonus.trim() !== "") params.bonusCode = bonus.trim();

            window.clockPmsWbeShow(params);
        });
    }

    // 5. PAKKE-KNAPPER (Knyttet til rateIds)
    const pkgAction = (id) => {
        window.clockPmsWbeShowRooms({
            arrival: fmt(today),
            departure: fmt(tomorrow),
            rateIds: [id],
            submit: true
        });
    };

    document.getElementById("pkg-romantikk")?.addEventListener("click", () => pkgAction(734476));
    document.getElementById("pkg-girls")?.addEventListener("click", () => pkgAction(734474));
    document.getElementById("pkg-sauna")?.addEventListener("click", () => pkgAction(734475));

    // 6. AKTIVITET-KNAPPER (Aktiviteter side)
    const actAction = (id) => {
        window.clockPmsWbeShowActivities({
            activityIds: [id]
        });
    };

    document.getElementById("act-sykkel")?.addEventListener("click", () => actAction(159));
    document.getElementById("act-kajakk")?.addEventListener("click", () => actAction(160));
    document.getElementById("act-sup")?.addEventListener("click", () => actAction(161));
});
