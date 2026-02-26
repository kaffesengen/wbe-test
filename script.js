document.addEventListener("DOMContentLoaded", () => {
    const isMobile = () => window.innerWidth <= 768;

    window.clockPmsWbeInit({
        wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
        entrypoint: "rooms",
        defaultMode: isMobile() ? "mobile" : "fullscreen", 
        roundedCorners: true,
        language: "nb"
    });

    const bookingForm = document.getElementById("wbe-form");
    
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            // Lag objektet for forespørselen
            const bookingParams = {
                arrival: formData.get("arrival"),
                departure: formData.get("departure"),
                mode: isMobile() ? "mobile" : "fullscreen",
                submit: true 
            };

            // Hent verdien fra bonusfeltet
            const bonus = formData.get("bonusCode");

            // Kun legg til bonusCode hvis feltet ikke er tomt
            if (bonus && bonus.trim() !== "") {
                bookingParams.bonusCode = bonus.trim();
            }

            // Åpne booking-motoren med de filtrerte parameterne
            window.clockPmsWbeShow(bookingParams);
        });
    }
});
