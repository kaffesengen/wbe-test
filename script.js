document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INITIALISER CLOCK PMS WBE (Viktigst for at alle knapper skal virke)
    if (window.clockPmsWbeInit) {
        window.clockPmsWbeInit({
            wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
            language: "nb",
            // Velger automatisk mobil eller desktop-modus basert på skjermbredde
            defaultMode: window.innerWidth < 900 ? "mobile" : "fullscreen"
        });
    }

    // 2. DATO-LOGIKK FOR PAKKE-BOOKING (Sørger for at datoene alltid er aktuelle)
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    const fmt = (d) => d.toISOString().split('T')[0];
    const arrivalStr = fmt(today);
    const departureStr = fmt(tomorrow);

    // 3. FLAT PICKR INITIALISERING (For søkefeltet på forsiden)
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

    // 4. LOGIKK FOR SØKEKJEMA (SØK LEDIGE ROM)
    const searchForm = document.getElementById("wbe-form-main");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const arrival = document.getElementById("arrival-field").value;
            const departure = document.getElementById("departure-field").value;
            const bonus = document.getElementById("bonus-input").value;

            if (!arrival || !departure) {
                alert("Vennligst velg datoer i kalenderen.");
                return;
            }

            const params = { arrival, departure, submit: true };
            
            // Sender kun bonuskode hvis feltet faktisk er fylt ut
            if (bonus && bonus.trim() !== "") {
                params.bonusCode = bonus.trim();
            }

            window.clockPmsWbeShow(params);
        });
    }

    // 5. PAKKE-KNAPPER (Knyttet til de spesifikke pakkene på forsiden)
    const openPackage = (rateId) => {
        window.clockPmsWbeShowRooms({
            arrival: arrivalStr,
            departure: departureStr,
            rateIds: [rateId],
            submit: true
        });
    };

    document.getElementById("pkg-romantikk")?.addEventListener("click", () => openPackage(734476));
    document.getElementById("pkg-girls")?.addEventListener("click", () => openPackage(734474));
    document.getElementById("pkg-sauna")?.addEventListener("click", () => openPackage(734475));

});
