function exportData() {
    alert("#1 YOU NEED TO EXPORT ON A GAME AND ON MAIN SITE FOR IT TO COPY PROPERLY \n#2 ONCE YOU EXPORT FOR ONE GAME IT WILL EXPORT FOR ALL GAMES \n#3 MEANING ONE EXPORT FOR MAIN SETTINGS ON MAIN PAGE AND ONE EXPORT FOR GAMES ON AN GAME \n#4 AND DO NOT MIX THE FILES GAMES HAVE -GAMES PREFIX FOR THAT");
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});

    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localStorageData[key] = localStorage.getItem(key);
    }

    const data = {
        cookies: cookies,
        localStorage: localStorageData
    };
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });

    const link = document.createElement('a');
    const currentDate = new Date().toISOString().slice(0, 10);
    link.href = URL.createObjectURL(blob);
    link.download = `bendover-main${currentDate}.save`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importData() {
    alert("#1 YOU NEED TO IMPORT ON A GAME AND ON MAIN SITE FOR IT TO COPY PROPERLY \n#2 ONCE YOU IMPORT FOR ONE GAME IT WILL IMPORT FOR ALL GAMES \n#3 MEANING ONE IMPORT FOR MAIN SETTINGS ON MAIN PAGE AND ONE IMPORT FOR GAMES ON AN GAME \n#4 AND DO NOT MIX THE FILES GAMES HAVE -GAMES PREFIX FOR THAT");
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.save';

    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const data = JSON.parse(e.target.result);

                Object.keys(data.cookies).forEach(name => {
                    document.cookie = `${name}=${data.cookies[name]}; path=/`;
                });
                Object.keys(data.localStorage).forEach(key => {
                    localStorage.setItem(key, data.localStorage[key]);
                });
                
                window.location.reload();
            };
            reader.readAsText(file);
        } else {
        }
    };

    input.click();
}

function clearData() {
    const promptDiv = document.createElement('div');
    promptDiv.id = 'clear-data-prompt';
    promptDiv.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background-color: var(--background-color); border: 3px solid var(--border-color2); border-radius: 16px; color: var(--text-color); z-index: 1000; text-align: center; width: 60%; max-width: 550px; animation: none; margin-bottom: 40px;">
            <h2 style="margin-top: 20.08px;">confirmation</h2>
            <p>are you sure you would like to clear all your data? continuing will wipe saved settings, pinned games and downloaded content.</p> 
            <p>this cannot be undone unless you have exported your data previously.</p>
            <button id="confirm-clear">yes</button>
            <button id="cancel-clear">no</button>
            <br>
            <br>
        </div>
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0, 0, 0, 0.7); z-index: 999;" id="overlay"></div>
    `;
    document.body.appendChild(promptDiv);

    document.getElementById('confirm-clear').addEventListener('click', async () => {
        localStorage.clear();

        document.cookie.split(";").forEach(cookie => {
            const [name] = cookie.split("=");
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        });

        const cacheNames = await caches.keys();
        cacheNames.forEach(async (cacheName) => {
            await caches.delete(cacheName);
        });

        document.body.removeChild(promptDiv);
        window.location.reload();
    });

    document.getElementById('cancel-clear').addEventListener('click', () => {
        document.body.removeChild(promptDiv);
    });
}

function infoData() {
    alert("PLEASE READ, If you want to copy from other sites that are now down keep in mind three things \n #1 If it doesnt have the copy and import data functions you will have to run the function i give next \n #2 The site is split in two for a while now meaning if you dont have a tab open of any game you cannot copy your game data. This applies to main page settings to but instead with main page. \n 3# To open console press F12 or right click and inspect then at the top navigate to console tab (Ignore the warning for pasting code if there is one) and paste and it should give a file you can import into the new sites \n With that use this function if you need to");
    window.open("https://main.bendover111222333444.great-site.net/html/script.html", "_blank");
}
