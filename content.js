(function() {
	try {
		var e = document.createElement('script');
		e.src = chrome.extension.getURL('script.js');
		(document.head || document.documentElement).appendChild(e);
		e.onload = function() {
			e.parentNode.removeChild(e);
		};
	} catch (e) {}
})();



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.qq == "hello"){
			var bas = ''
			chrome.storage.local.get(['aa','result'],function(result){
				bas = result['aa']
				sendResponse({farewell: bas,pro: result.result})
			})
        }
        return true           
    });


function send_message(parm,bas){
	chrome.tabs.query({
		active: true,
		currentWindow: true
	  }, (tabs) => {
		let message = {
			farewell: bas,
			pro : parm
		}
		chrome.tabs.sendMessage(tabs[0].id, message, res => {
		//   console.log('successful')
		})
	  })
	}