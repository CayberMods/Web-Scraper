async function scrape() {
    const url = document.getElementById("urlInput").value;
    if (!url) {
        alert("Masukkan URL terlebih dahulu!");
        return;
    }
    
    document.getElementById("output").textContent = "🔄 Proses...";

    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");

        let output = "Media & Script:\n";
        doc.querySelectorAll("img, script, video, audio").forEach(el => {
            output += `${el.tagName} - ${el.src || "No Src"}\n`;
        });

        output += "\nImports:\n";
        doc.querySelectorAll("link[href]").forEach(el => {
            output += `${el.tagName} - ${el.href}\n`;
        });

        output += "\nLinks:\n";
        doc.querySelectorAll("a[href]").forEach(el => {
            output += `${el.tagName} - ${el.href}\n`;
        });

        document.getElementById("output").textContent = output;
    } catch (error) {
        document.getElementById("output").textContent = "Error: " + error.message;
    }
}