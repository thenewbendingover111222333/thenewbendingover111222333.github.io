var buttonEnabled = new URLSearchParams(window.location.search).get("blanker") === "true";

function openPopupCloaked(url, cloakedUrl) {
    const sep = cloakedUrl.includes("?") ? "&" : "?";
    const popup = window.open(cloakedUrl + sep + "blanker=" + buttonEnabled, "_blank");
    if (!popup) return;

    popup.buttonEnabled = buttonEnabled;

    const userAgent = navigator.userAgent;
    let browserImg = `${location.origin}/images/newtab.png`;
    if (userAgent.match(/edg/i)) {
        browserImg = `${location.origin}/images/newtab-edge.png`;
    }

    const doc = popup.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><title>New Tab</title></head><body style="margin:0"></body></html>`);
    doc.close();

    const favicon = doc.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/x-icon";
    favicon.href = browserImg;
    doc.head.appendChild(favicon);

    const iframe = doc.createElement("iframe");
    iframe.src = url;
    iframe.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;";
    doc.body.appendChild(iframe);
}

document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("blankerBtn");

    const falseColor = "#780000";
    const trueColor = "#117800";

    if (buttonEnabled) {
        button.style.color = trueColor;
        button.textContent = "Blanker On";
    } else {
        button.style.color = falseColor;
        button.textContent = "Blanker Off";
    }

    button.addEventListener("click", function() {
        if (buttonEnabled) {
            buttonEnabled = false;
            button.style.color = falseColor;
            button.textContent = "Blanker Off";
            openPopupCloaked("https://bendover111222333444.onrender.com", "https://bendover111222333444.onrender.com");
        } else {
            buttonEnabled = true;
            button.style.color = trueColor;
            button.textContent = "Blanker On";
            openPopupCloaked("https://bendover111222333444.onrender.com", "about:blank");
        }
    });

    document.querySelectorAll(".game-grid a").forEach(function(link) {
        link.addEventListener("click", function(e) {
            if (buttonEnabled) {
                e.preventDefault();
                openPopupCloaked(this.href, "about:blank");
            }
        });
    });
});