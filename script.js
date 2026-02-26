document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialiser Clock PMS Web Booking Engine
    window.clockPmsWbeInit({
        wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
        entrypoint: "rooms",
        defaultMode: "fullscreen", // Gir den beste "Panorama"-følelsen
        roundedCorners: true,
        language: "nb" // Norsk språk
    });

    // 2. Lytt etter innsending av bookingskjemaet
    const bookingForm = document.getElementById("wbe-form");
    
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Hent verdier fra input-feltene
            const formData = new FormData(e.target);
            
            // Send dataene til Clock PMS-motoren
            window.clockPmsWbeShow({
                arrival: formData.get("arrival"),
                departure: formData.get("departure"),
                bonusCode: formData.get("bonusCode"),
                submit: true // Går rett til søkeresultat
            });
        });
    }
});
