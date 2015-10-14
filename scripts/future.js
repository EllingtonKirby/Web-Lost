/**
 * Created by Ellioc on 1/9/2015.
 */
<script src="thirdParty/jquery-2.1.3.min.js">
var getData = function() {
    var url = "http://query.yahooapis.com/v1/public/yql";
    var symbol = 'CLG15.NYM';
    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
    var future;

    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
        .done(function (data)
        {
            future = data.query.results.quote.LastTradePriceOnly;
            console.log(future);

        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log('Request failed: ' + err);
            future = null;
        });

    return future;
};
</script>
