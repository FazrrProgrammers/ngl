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
        let formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("question", message);

        try {
            let response = await fetch("https://ngl.link/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36"
                },
                body: formData.toString()
            });

            let result = await response.json();
            console.log(`Pesan ${i + 1} dikirim:`, result);

            if (response.ok) {
                statusDiv.innerHTML = `Berhasil mengirim ${i + 1} pesan!`;
            } else {
                statusDiv.innerHTML = `Gagal mengirim pesan ke-${i + 1}: ${result.message || "Unknown error"}`;
            }

        } catch (error) {
            console.error("Error:", error);
            statusDiv.innerHTML = "Terjadi kesalahan saat mengirim pesan.";
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 detik
    }
}
