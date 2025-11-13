let geolocation = async () => {
    if (!navigator.geolocation) {
        console.log("Geolocation not supported by your browser.");
        return { error: "not_supported" };
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log(lat, lon);
                resolve({ lat, lon });
            },
            (error) => {
                console.log("Location error:", error);
                resolve({ error: "denied" });
            }
        );
    });
}

export default geolocation; 