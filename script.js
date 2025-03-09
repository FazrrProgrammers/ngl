async function sendSpam() {
    let username = document.getElementById("nglUsername").value.trim();
    let message = document.getElementById("message").value.trim();
    let count = parseInt(document.getElementById("count").value);
    let statusDiv = document.getElementById("status");

    if (!username || !message || count < 1) {
        statusDiv.innerHTML = "Harap isi semua kolom!";
        return;
    }

    statusDiv.innerHTML = "Mengirim pesan...";
    
    for (let i = 0; i < count; i++) {
        fetch("https://ngl.link/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `username=${username}&question=${encodeURIComponent(message)}`
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Pesan ${i + 1} dikirim:`, data);
            statusDiv.innerHTML = `Berhasil mengirim ${i + 1} pesan!`;
        })
        .catch(error => {
            console.error("Error:", error);
            statusDiv.innerHTML = "Terjadi kesalahan saat mengirim pesan.";
        });

        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 detik agar tidak terlalu cepat
    }
}
