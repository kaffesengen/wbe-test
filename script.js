document.addEventListener("DOMContentLoaded", () => {
    
    // Funksjon for å sjekke om brukeren er på mobil
    const isMobile = () => window.innerWidth <= 768;

    // 1. Initialiser Clock PMS Web Booking Engine
    window.clockPmsWbeInit({
        wbeBaseUrl: "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/11528",
        entrypoint: "rooms",
        // Velger 'mobile' for små skjermer og 'fullscreen' for desktop
        defaultMode: isMobile() ? "mobile" : "fullscreen", 
        roundedCorners: true,
        language: "nb"
    });

    // 2. Håndter bookingskjemaet (Søkebar)
    const bookingForm = document.getElementById("wbe-form");
    
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            window.clockPmsWbeShow({
    arrival: formData.get("arrival"),
    departure: formData.get("departure"),
    // bonusCode: formData.get("bonusCode"), // Kommenter ut denne linjen midlertidig
    submit: true 
});
        });
    }

    // 3. Oppdater modus ved endring av skjermstørrelse (valgfritt, men sikrere)
    window.addEventListener('resize', () => {
        const currentMode = isMobile() ? "mobile" : "fullscreen";
        // Vi re-initialiserer ikke hele scriptet, men Clock sin integrasjon 
        // håndterer stort sett dette bra så lenge window.clockPmsWbeShow kalles med riktig mode.
    });
});
