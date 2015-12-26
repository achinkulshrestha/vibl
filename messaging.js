// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.
//
// In this example, messages are JSON objects
// {
//   action: ['code'|'script'|'message'], // What action to perform on the inspected page
//   content: [String|Path to script|Object], // data to be passed through
//   tabId: [Automatically added]
// }

(function createChannel() {
    //Create a port with background page for continous message communication
    var port = chrome.runtime.connect({
        name: "Sample Communication" //Given a Name
    });

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {
        // var table =  document.querySelector("myTable");
        // var row = table.insertRow(0);
        // var cell1 = row.insertCell(0);
        // var cell2 = row.insertCell(1);
        // cell1.innerHTML = "NEW CELL1";
        // cell2.innerHTML = "NEW CELL2";
      // for(i=0; i<message.results.length; i++){
      //       response +=  "<tr><td>"+message.results+"</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
      //   },
      var response_fail = "</br><h2>Bummer! Fix these please.</h2><table class=\"table-striped table-hover table-responsive table-bordered\"><tr><th>Code</th><th>Name</th><th>Heading</th><th>Severity</th></tr>";
      //var response = "<table><tr><th><td>Code</td><td>Name</td><td><th></tr>"
      fail_count = 0;
      for(i=0; i<message.results.length; i++) {
        if (message.results[i].result == "FAIL") {
          fail_count += 1;
          //    response += "<tr><td>abas</td><td>asd</td><td>qwqwe</td><td>kkk</td></tr>";
          response_fail += "<tr class=\"danger\"><td><a href=\""+message.results[i].rule.url+"\ target=\"_blank\">"+message.results[i].rule.code+"</a></td><td>"+message.results[i].rule.name+"</td><td>"+message.results[i].rule.heading+"</td><td>"+message.results[i].rule.severity+"</td></tr>";
        }
      }
      response_fail += "</table>";
      if (fail_count != 0) {
          document.querySelector('#myTableFail').innerHTML = response_fail;
      }

      pass_count = 0;
      var response_pass = "</br><h2>Mate! You got dese right.</h2><table class=\"table-striped table-hover table-responsive table-bordered\"><tr><th>Code</th><th>Name</th><th>Heading</th><th>Severity</th></tr>";
      //var response = "<table><tr><th><td>Code</td><td>Name</td><td><th></tr>"
      for(i=0; i<message.results.length; i++) {
        if (message.results[i].result == "PASS") {
           pass_count += 1;
            response_pass += "<tr class=\"success\"><td><a href=\""+message.results[i].rule.url+"\ target=\"_blank\">"+message.results[i].rule.code+"</a></td><td>"+message.results[i].rule.name+"</td><td>"+message.results[i].rule.heading+"</td><td>"+message.results[i].rule.severity+"</td></tr>";
            //response +=  "<tr class="+success+"><td><a href=\""+message.results[i].rule.url+"\">"+message.results[i].rule.code+"</a></td><td>"+message.results[i].rule.name+"</td><td>"+message.results[i].rule.heading+"</td><td>"+message.results[i].rule.severity+"</td></tr>";
        }
      }
      response_pass += "</table>";
      if (pass_count != 0) {
        document.querySelector('#myTablePass').innerHTML = response_pass;
      }

    });

}());



// This sends an object to the background page
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.runtime.sendMessage(message);
}
