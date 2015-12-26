$( "#runAudit" ).click(function() {
    localStorage.clear();
    sendObjectToInspectedPage({action: "script", content: "axs_testing.js"});
    sendObjectToInspectedPage({action: "runAudit", content: "content_for_audit"});
});

$( "#insertscript" ).click(function() {
    sendObjectToInspectedPage({action: "script", content: "axs_testing.js"});
});
