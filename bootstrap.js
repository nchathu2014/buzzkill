// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({be_a_buzzkill: true});
});

// Listen for any changes to the URL of any tab.
// see: http://developer.chrome.com/extensions/tabs.html#event-onUpdated
chrome.tabs.onUpdated.addListener(function(id, info, tab){

    // don't allow user to get to their page
    if (tab.url.toLowerCase().indexOf("facebook.com/buzzfeed") !== -1){
        chrome.tabs.update(tab.id, {url: "http://www.facebook.com/?no-buzzfeed-for-you!"});
    }

    // decide if we're ready to show page action
    if (tab.status !== "complete" || tab.url.toLowerCase().indexOf("facebook.com") === -1){
        console.log("not here");
        return;
    }
    chrome.pageAction.show(tab.id);
});


// update the icon when the user's settings change
// chrome.storage.onChanged.addListener(function(changes, areaName){
//     alert("changed settings");
//     console.log("changed settings");
//     if (localStorage["be_a_buzzkill"] == "true"){
//         path = "active-icon.jpeg";
//     } else {
//         path = "inactive-icon.jpeg";
//     }
//     chrome.tabs.getCurrent( function(tab){
//         chrome.pageAction.setIcon({
//             "tabId": tab.id,
//             "path": path
//         });
//     });
// }); 

