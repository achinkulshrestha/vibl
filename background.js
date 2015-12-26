// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
//
// Can use:
// chrome.tabs.*
// chrome.extension.*
var connections = {};
chrome.runtime.onConnect.addListener(function (port) {

    var extensionListener = function (message, sender, sendResponse) {

        if(message.tabId && message.content) {
                connections[message.tabId] = port;
                //Evaluate script in inspectedPage
                if(message.action === 'code') {
                    chrome.tabs.executeScript(message.tabId, {code: message.content});

                //Attach script to inspectedPage
                } else if(message.action === 'script') {
                    chrome.tabs.executeScript(message.tabId, {file: message.content});

                //Pass message to inspectedPage
                } else {
                    chrome.tabs.sendMessage(message.tabId, message, sendResponse);
                }

        // This accepts messages from the inspectedPage and
        // sends them to the panel
        }else {
            if (message.action == "audit_report") {
              if (localStorage) {
                // Save the name in localStorage.
                localStorage.setItem('audit_results', JSON.stringify(message.results));
              }
            }
            console.log(message);
            port.postMessage(message);
        }
        // sendResponse(message);
    }

    // Listens to messages sent from the panel
    chrome.runtime.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        chrome.runtime.onMessage.removeListener(extensionListener);
        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i<len;i++) {
          if (connections[tab[i]] == port) {
            delete connections[tab[i]];
            break;
          }
        }
    });

    // port.onMessage.addListener(function (message) {
    //     port.postMessage(message);
    // });

});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    return true;
});
