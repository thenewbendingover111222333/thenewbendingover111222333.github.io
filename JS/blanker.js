var params = new URLSearchParams(window.location.search);
var buttonEnabled = params.get("blanker") === "true";
var isMainTab = params.get("main") === "true";

if (window !== window.top && !isMainTab) {
    document.getElementById("blanker").style.display = "none";
}

function openPopupCloaked(url, cloakedUrl) {
    
    const test = window.open("", "", "width=1,height=1")
    if (!test || test.closed || typeof test.closed === "undefined") {
        window.alert("TURN ON POPUPS: Chrome Settings → Privacy and security → Site settings → Pop-ups and redirects → Add site \n Firefox Settings → Privacy & Security → Permissions → Block pop-up windows → Exceptions → Add site \n Edge Settings → Cookies and site permissions → Pop-ups and redirects → Add site \n Safari Settings → Websites → Pop-up Windows → Allow for your site \n Brave Settings → Privacy and security → Site settings → Pop-ups and redirects → Add site (same as Chrome)");
    } else {
        test.close()
    }

    const popup = window.open(cloakedUrl, "_blank");
    if (!popup) return;

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
            window.open(window.location.href.split("?")[0], "_blank");
        } else {
            buttonEnabled = true;
            button.style.color = trueColor;
            button.textContent = "Blanker On";
            openPopupCloaked(window.location.href.split("?")[0] + "?blanker=true&main=true", "about:blank");
        }
    });

    document.querySelectorAll(".game-grid a").forEach(function(link) {
        link.addEventListener("click", function(e) {
            if (buttonEnabled) {
                e.preventDefault();
                openPopupCloaked(this.href + (this.href.includes("?") ? "&" : "?") + "blanker=true&main=true", "about:blank");
            }
        });
    });
});