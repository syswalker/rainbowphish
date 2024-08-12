function connect(){
	window.socket = new WebSocket("wss://" + window.location.hostname + "/websocket:8080");
	window.socket.onopen = function(event){
    	console.log("socket open");
    };
    window.socket.onclose = function(event){
    	console.log("socket closed, " + event.code + ", " + event.reason);
    };
    document.querySelector("button").addEventListener("click", generate);

    window.socket.onmessage = function(e){
	    console.log(e);
	    document.querySelector(".input-element").value = e.data;
	    document.querySelector("button").disabled = false;
	  }
};

function generate(){
	document.querySelector("button").disabled = true;
	var recipient = document.querySelector("#name").value;
	var mailtype = document.querySelector("#campaignType").value;
	var sender = document.querySelector("#sender").value;
	var organization = document.querySelector("#organization").value;
	var website = document.querySelector("#website").value;
	var additionalinfo = document.querySelector("#addinfo").value;
	if(recipient == undefined || recipient == null || recipient == ""){
		recipient = "John Smith";
	}
	var ciphername = recipient.match(/[a-z]/gi).map(char => char.charCodeAt(0).toString(16)).join('');

	if (recipient == "" || mailtype == ""){
		document.querySelector(".input-element").value = "Invalid inputs provided."
		document.querySelector("button").disabled = false;
		return;
	}

	window.socket.send(JSON.stringify({reci: recipient, type: mailtype, sender: sender, org: organization, link: website, info: additionalinfo, ciph: ciphername}));
}

document.addEventListener("DOMContentLoaded", connect);