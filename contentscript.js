console.log('This is from the content script')
function getGoogleDocCommentAuthors () {
	const names = 
	Array.from(document.querySelectorAll('.docos-anchoredreplyview-author'))
	.map(commentNode => commentNode.innerText)
	const stats = {}
	for (name of names) {
		if (stats[name]) {
			stats[name]++
		} else {
			stats[name] = 1
		}
	}
	return stats;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		console.log('this is getting called');
  		if (request.directive === 'getComments'){
  			console.log(request); 
      		sendResponse(getGoogleDocCommentAuthors());
  		}
  });
