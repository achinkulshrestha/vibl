// (function popupAction() {
//   var audit_results =  JSON.parse(localStorage.getItem('audit_results'));
//   var payload = {"PASS":[], "FAIL":[], "NA": []};
//   for (var key in audit_results) {
//     var obj = audit_results[key]
//     payload[obj.result].push(obj.rule.code);
//   }
//   var url = "http://vibl.netai.net/read.php";
//   console.log(JSON.stringify(payload));
//   var posting = $.post( url, { "jsonObject": JSON.stringify(payload) } );
//
//   // Put the results in a div
//   posting.done(function( data ) {
//     console.log(data);
//     $( "#result" ).empty().append( data );
//   });
// }());
$(document).ready(function() {
  var ctx = $("#myChartPass").get(0).getContext("2d");
  var ctx1 = $("#myChartFail").get(0).getContext("2d");

  // This will get the first returned node in the jQuery collection.
    var data = {
      labels: ["AX_ARIA_04", "AX_FOCUS_01", "AX_HTML_01", "AX_COLOR_01", "AX_ARIA_05", "AX_IMAGE_01", "AX_ARIA_02"],
      datasets: [
          {
              label: "How many people got right what you got wrong!",
              fillColor: '#F21D2B',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
      ]
  };
  var data2 = {
    labels: ["AX_ARIA_12", "AX_ARIA_06", "AX_ARIA_09", "AX_ARIA_11", "AX_ARIA_01", "AX_TEXT_01", "AX_HTML_02"],
    datasets: [
        {
            label: "How many people are as awesome as you are!",
            fillColor: '#1E8F3A',
            data: [20, 15, 78, 12, 40, 32, 77]
        },
    ]
};
  var chart_pass = new Chart(ctx).Bar(data2);
  var chart_fail = new Chart(ctx1).Bar(data);
});
