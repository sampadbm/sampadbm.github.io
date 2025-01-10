 document.addEventListener('DOMContentLoaded', function () {
            initpage();
            })
 
function initpage(){
	
	fetch("index.md").then(result=>result.text()).then( data => {
        document.getElementById('content').innerHTML =
        marked.parse(data);
        })
 }

