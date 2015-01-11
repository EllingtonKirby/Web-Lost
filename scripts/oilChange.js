/**
 * Created by Ellioc on 1/9/2015.
 */
function findText(element) {
    if (!element) element = document.body;
    var nodes = element.childNodes;
    var oilPrice = getData();
    for (var n=0; n<nodes.length; n++) {
        if (nodes[n].nodeType == Node.TEXT_NODE) {
            matches = findReplacements(nodes[n], oilPrice);
            for(key in matches)
                var text = matches[key] + " Barrels of Oil";
                nodes[n].textContent = nodes[n].textContent.replace(key, text);
        } else {
            findText(nodes[n]);
        }
    }
}

function findReplacements(node, oilPrice){
    var r = '\$(([1-9]\d{0,2}(,\d{3})*)|(([1-9]\d*)?\d))(\.\d\d)?$';
    var matches = {};
    while (match = r.exec(node.textContent)) {
        var matchedVal = node.textContent.slice(match.index, r.lastIndex);
        var numVal = parseFloat(matchedVal);
        matches[matchedVal] = numVal/oilPrice;
    }
    return matches;
}

findText(document);