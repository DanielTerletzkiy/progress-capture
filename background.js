chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.tabs.captureVisibleTab(
            null,
            {},
            function (screenshotUrl) {
                sendResponse({imgSrc: screenshotUrl});

                const parser = document.createElement('a');
                parser.href = sender.url;

                const filename = `${parser.hostname}_${parser.pathname.replaceAll('/', '')}_${(new Date().getDay())}-${(new Date().getMonth() + 1)}---${(new Date().getFullYear())}-${(new Date().getHours())}-${(new Date().getMinutes())}-${(new Date().getSeconds())}.png`
                console.log(filename)
                chrome.downloads.download({url: screenshotUrl, filename}, function (downloadId) {
                    console.log("download begin, the downId is:" + downloadId);
                });
            }
        ); //remember that captureVisibleTab() is a statement
        return true;
    }
);

/*chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: ".js"});
});*/