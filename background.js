chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.tabs.captureVisibleTab(
            null,
            {},
            function (screenshotUrl) {
                sendResponse({imgSrc: screenshotUrl});

                chrome.downloads.setShelfEnabled(false)

                const parser = document.createElement('a');
                parser.href = sender.url;
                console.log(parser.pathname)
                const filename = `progress-capture/${parser.hostname}/${parser.pathname !== '/' ? parser.pathname.replaceAll('/', '') : 'root'}/${(new Date().getDate())}-${(new Date().getMonth() + 1)}-${(new Date().getFullYear())}---${(new Date().getHours())}-${(new Date().getMinutes())}-${(new Date().getSeconds())}.png`
                console.log(filename)

                chrome.downloads.onChanged.addListener(onChanged);

                chrome.downloads.download({url: screenshotUrl, filename}, function (downloadId) {
                    console.log("download begin, the downId is:" + downloadId);
                });
            }
        ); //remember that captureVisibleTab() is a statement
        return true;
    }
);

function onChanged({state}) {
    if (state && state.current !== 'in_progress') {
        chrome.downloads.onChanged.removeListener(onChanged);
        chrome.downloads.setShelfEnabled(true)
    }
}

/*chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: ".js"});
});*/