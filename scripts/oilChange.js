/**
 * Created by Ellioc on 1/9/2015.
 */
 <script src="thirdParty/jquery-2.1.3.min.js">
function getData() {
    var url = "http://query.yahooapis.com/v1/public/yql";
    var symbol = "CLG15.NYM";
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
    console.log("oil: " + oilPrice);
    for (var n=0; n<nodes.length; n++) {
        if (nodes[n].nodeType == Node.TEXT_NODE) {
            var matches = findReplacements(nodes[n], oilPrice);
            console.log(nodes[n]);
            for(var key in matches)
                var text = matches[key] + " Barrels of Oil ";
                //console.log(matches[key]);
                //console.log(key);
                nodes[n].textContent = nodes[n].textContent.replace(key, text);
        } else {
            findText(nodes[n]);
        }
    }
}

function findReplacements(node, oilPrice){
    var r = /\$(([1-9]\d{0,2}(,\d{3})*)|(([1-9]\d*)?\d))(\.\d\d)?/;
    //problem with this regex!!!!!! won't parse $100000000 without commas
    var matches = {};
    //console.log(node.textContent);
    while (match = r.exec(node.textContent)) {
        var matchedVal = node.textContent.slice(match.index + 1, r.lastIndex);
        console.log("matched value: " + matchedVal);
        var numVal = parseFloat(matchedVal);
        console.log("num: " + numVal);
        matches[matchedVal] = numVal/oilPrice;
    }
    return matches;
}

getData();
</script>
