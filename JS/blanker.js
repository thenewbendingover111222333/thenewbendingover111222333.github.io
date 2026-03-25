var buttonEnabled = getCookie("buttonEnabled")

function openPopupCloaked(url) {

    const popup = window.open("about:blank", "_blank");
    if (popup) {
        const iframe = popup.document.createElement("iframe");
        iframe.src = url;
        iframe.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;";
        popup.document.title = "New Tab";
        popup.document.body.style.margin = "0";
        popup.document.body.appendChild(iframe);
        
        const userAgent = navigator.userAgent;
        let browserImg = "/images/newtab.png";
        
        if (userAgent.match(/edg/i)) {
            browserName = "/images/newtab-edge.png";
        }

        const favicon = popup.document.getElementById("favicon")
        favicon.href = browserImg

        setTimeout(() => window.close(), 500);
    }

}

document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("blankerBtn");

    const falseColor = "#780000";
    const trueColor = "#117800";

    if (buttonEnabled) {
        button.style.color = trueColor;
        button.textContent = "Blanker On";
        openPopupCloaked(window.location.href, true);
    } else {
        button.style.color = falseColor;
        button.textContent = "Blanker Off";
    }

    button.addEventListener("click", function() {
        if (buttonEnabled) {
            buttonEnabled = false;
            button.style.color = falseColor;
            button.textContent = "Blanker Off";
            setCookie("buttonEnabled", false)
            window.open("bendover111222333444.onrender.com", _blank);
        } else {
            buttonEnabled = true;
            button.style.color = trueColor;
            button.textContent = "Blanker On";
            setCookie("buttonEnabled", true)
            openPopupCloaked(window.location.href);
        }
    });

    document.querySelectorAll(".game-grid a").forEach(function(link) {
        link.addEventListener("click", function(e) {
            if (buttonEnabled) {
                e.preventDefault();
                openPopupCloaked(this.href, false);
            }
        });
    });
});

const url = c;
const popup = window.open("about:blank", "_blank");
if (popup) {
    const iframe = popup.document.createElement("iframe");
    iframe.src = url;
    iframe.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;";
    popup.document.title = "Tuffness Overload";
    popup.document.body.style.margin = "0";
    popup.document.body.appendChild(iframe);
    setTimeout(() => window.close(), 500);
}
