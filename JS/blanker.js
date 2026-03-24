var buttonEnabled = new URLSearchParams(window.location.search).get("cloaked") === "true";
var isMainTab = new URLSearchParams(window.location.search).get("main") === "true";

if (window !== window.top || (buttonEnabled && !isMainTab)) {
    document.getElementById("blanker").style.display = "none";
}

function checkPopups() {
    const popup = window.open("", "", "width=100,height=100");

    const blocked = !popup || popup.closed || typeof popup.closed === "undefined";

    if (blocked) {
        const warningEl = document.getElementById("popupWarning");
        if (warningEl) {
            warningEl.style.display = "block";
            setTimeout(() => {
                warningEl.style.display = "none";
            }, 3000);
        }
        return false;
    } else {
        popup.close();
        return true;
    }
}


function getCloakUrl() {
    var input = document.getElementById("blankerSearch");
    var val = input && input.value.trim();
    return val && val !== input.placeholder ? val : "onedrive.live.com";
}

function openPopupCloaked(url, isMain) {
    var cloakUrl = getCloakUrl();
    var sep = url.includes("?") ? "&" : "?";
    var cloakedUrl = isMain ? url + sep + "cloaked=true&main=true" : url;
    var popup = window.open("about:blank", "_blank");
    if (!popup) return;
    setTimeout(function() { setupPopup(popup, cloakedUrl, cloakUrl, isMain); }, 100);
}

function setupPopup(popup, cloakedUrl, cloakUrl, isMain) {
    popup.document.body.style.margin = "0";

    var rootStyle = popup.document.createElement("style");
    rootStyle.textContent = ":root{--primary-color:#674bc3;--secondary-color:#ffffff;--background-color:#222222;--text-color:#8f0fd4;--link-color:#66b3ff;--game-link-bg:#2a2a2a;--game-link-hover:#4a4a4a;--about-blank-active:#117800;--about-blank-deactive:#780000;}";
    popup.document.head.appendChild(rootStyle);

    var styleLink = popup.document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = window.location.origin + "/css/style.css";
    popup.document.head.appendChild(styleLink);

    var fontLink = popup.document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap";
    popup.document.head.appendChild(fontLink);

    var favLink = popup.document.createElement("link");
    favLink.rel = "icon";
    favLink.href = "https://www.google.com/s2/favicons?domain=" + cloakUrl + "&sz=64";
    popup.document.head.appendChild(favLink);

    if (isMain) {
        fetch("https://api.allorigins.win/get?url=https://" + cloakUrl)
            .then(r => r.json())
            .then(data => {
                var match = data.contents.match(/<title>(.*?)<\/title>/i);
                if (match) {
                    var raw = match[1].split("-")[0].split("|")[0].trim();
                    raw = raw.replace(/^(www\.|http:\/\/|https:\/\/)/gi, "");
                    popup.document.title = raw.charAt(0).toUpperCase() + raw.slice(1);
                } else {
                    var raw = cloakUrl.replace(/^(www\.|http:\/\/|https:\/\/)/gi, "").split(".")[0];
                    popup.document.title = raw.charAt(0).toUpperCase() + raw.slice(1);
                }
            })
            .catch(function() {
                var raw = cloakUrl.replace(/^(www\.|http:\/\/|https:\/\/)/gi, "").split(".")[0];
                popup.document.title = raw.charAt(0).toUpperCase() + raw.slice(1);
            });
    } else {
        var raw = cloakUrl.replace(/^(www\.|http:\/\/|https:\/\/)/gi, "").split(".")[0];
        popup.document.title = raw.charAt(0).toUpperCase() + raw.slice(1);
    }

    var iframe = popup.document.createElement("iframe");
    iframe.src = cloakedUrl;
    iframe.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;";
    popup.document.body.appendChild(iframe);

    if (isMain) {
        var blankerDiv = popup.document.createElement("div");
        blankerDiv.id = "blanker";
        blankerDiv.style.cssText = "position:fixed;top:60px;left:20px;z-index:99999;";

        var blankerBtn = popup.document.createElement("button");
        blankerBtn.id = "blankerBtn";
        blankerBtn.textContent = "Blanker On";
        blankerBtn.style.position = "relative";
        blankerBtn.style.overflow = "hidden";

        var blankerLink = popup.document.createElement("a");
        blankerLink.href = "https://bendover111222333444.onrender.com";
        blankerLink.target = "_blank";
        blankerLink.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;display:block;z-index:9999;";
        blankerBtn.appendChild(blankerLink);

        blankerDiv.appendChild(blankerBtn);
        popup.document.body.appendChild(blankerDiv);

        setTimeout(function() { window.close(); }, 300);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("blankerBtn");

    const falseColor = "#780000";
    const trueColor = "#117800";

    if (buttonEnabled) {
        button.style.color = trueColor;
        button.textContent = "Blanker On";
        openPopupCloaked(window.location.href.split("?")[0], true);
    } else {
        button.style.color = falseColor;
        button.textContent = "Blanker Off";
    }

    button.addEventListener("click", function() {
        if (buttonEnabled) {
            buttonEnabled = false;
            button.style.color = falseColor;
            button.textContent = "Blanker Off";
        } else if (checkPopups()) {
            buttonEnabled = true;
            button.style.color = trueColor;
            button.textContent = "Blanker On";
            openPopupCloaked(window.location.href.split("?")[0], true);
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
