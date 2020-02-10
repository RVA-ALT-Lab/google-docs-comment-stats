document.addEventListener("DOMContentLoaded", function(){
	/******

	Click Event Listeners to communicate with the content script; 

	******/
	const generateAuthorStatsTable = (authors) => {
		const tableRows = []
		for (author in authors) {
			tableRows.push(`<tr><td>${author}</td><td>${authors[author]}</td></tr>`)
		}
		return tableRows.join('');
	}
	var btn = document.getElementById("gather-comment-authors"); 

	btn.addEventListener("click", function(){
		console.log('click event fired')

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript({file: "contentscript.js"})
			console.log(tabs); 
		  chrome.tabs.sendMessage(tabs[0].id, {directive: "getComments"}, function(response) {
		    console.log(response);
				const authors = response;
				const html = `
					<table>
						${generateAuthorStatsTable(authors)}
					</table>
				`;
				document.querySelector('#comment-stats').innerHTML = html;
		  
		  });
		});

	});



});

