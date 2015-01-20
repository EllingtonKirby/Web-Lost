/**
 * Created by Ellioc on 1/9/2015.
 */
function getData() {
    var url = "http://query.yahooapis.com/v1/public/yql";
    var symbol = 'CLG15.NYM';
    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
        .done(function (data)
        {
            future = data.query.results.quote.LastTradePriceOnly;
            //console.log(future);
            findText(document.body, future);
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log('Request failed: ' + err);
            future = null;
            return false;
        });
}
function findText(element, oilPrice) {
    if (!element) element = document.body;
    var nodes = element.childNodes;
    console.log("nodes: " + nodes);
    for (var n=0; n<nodes.length; n++) {
        if (nodes[n].nodeType == Node.TEXT_NODE) {
            var matches = findReplacements(nodes[n], oilPrice);
            console.log("found a match");
            for(var key in matches)
                var text = matches[key] + " Barrels of Oil ";
                //console.log(key);
                nodes[n].textContent = nodes[n].textContent.replace(key, text);
        } else {
            findText(nodes[n]);
        }
    }
}
function findReplacements(node, oilPrice){
    var r = /\$(([1-9]\d{0,2}(,\d{3})*)|(([1-9]\d*)?\d))(\.\d\d)?$/;
    var matches = {};
    console.log(node.textContent);
    while (match = r.exec(node.textContent)) {
        var matchedVal = node.textContent.slice(match.index, r.lastIndex);
        console.log(matchedVal);
        var numVal = parseFloat(matchedVal);
        matches[matchedVal] = numVal/oilPrice;
    }
    return matches;
}

getData();