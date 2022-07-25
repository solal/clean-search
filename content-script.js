let cleanBtnEl   = document.createElement("input");
cleanBtnEl.type  = "button";
cleanBtnEl.value = "🟢 Clean Results";

cleanBtnEl.style.cursor       = "pointer";
cleanBtnEl.style.marginBottom = "15px";

cleanBtnEl.resultsClean  = false;
cleanBtnEl.resContainers = [];

cleanBtnEl.create = (selector) => {
    cleanBtnEl.resContainers = document.querySelectorAll(selector)
    let cleanBtnAnchorEl  = cleanBtnEl.resContainers[0].parentElement.parentElement;
    cleanBtnAnchorEl.prepend(cleanBtnEl);
}


cleanBtnEl.onclick = () => {
    if (!cleanBtnEl.resultsClean) {
        cleanBtnEl.resultsClean = true;
        if ( window.location.hostname === "www.google.com" ) {
            cleanBtnEl.cleanResults('a');
        } else if ( window.location.hostname === "duckduckgo.com" ) {
            cleanBtnEl.cleanResults('[data-testid="result-extras-url-link"]')
        }

        return;
    }
    location.reload();
}


cleanBtnEl.cleanResults = (selector) => {
    let removedCounter = 0;
    cleanBtnEl.resContainers.forEach((container) => {
        let hostname = container.querySelector(selector).hostname;
        if ( !(hostname in whitelist) ) {
            container.parentElement.remove();
            removedCounter++;
        }
    });

    cleanBtnEl.reset(removedCounter);
}


cleanBtnEl.reset = (removedCounter) => {
    cleanBtnEl.value = "❌ cleaned off " + removedCounter + " results";
    setTimeout(() => {
        cleanBtnEl.value = "🔄 Reload Results";
    }, 1000);
}


window.addEventListener("load", () => {
    if ( window.location.hostname === "www.google.com" ) {
        cleanBtnEl.create("div[data-sokoban-container]");
    } else if ( window.location.hostname === "duckduckgo.com" ) {
        cleanBtnEl.create('article[data-nrn="result"]');
        cleanBtnEl.style.marginLeft = "10px";
    }
});
