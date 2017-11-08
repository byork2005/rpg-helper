$(document).ready(function()
{
    var tempValue;
    var tempArray;
    var dieArray = [0,0,0,0,0,0];
    var assignArray = [4,6,8,10,12,20];
    var showArray = [];
    var totalsArray = [];
    var d4RandomArr = [];
    var d6RandomArr = [];
    var d8RandomArr = [];
    var d10RandomArr = [];
    var d12RandomArr = [];
    var d20RandomArr = [];
    var dieRandoms = [d4RandomArr, d6RandomArr, d8RandomArr, d10RandomArr, d12RandomArr, d20RandomArr];

    $(".dieImage").click(function()
    {
        tempValue = $(this).attr('data-value');
        tempArray = $(this).attr('data-array');
        dieArray[tempArray] = $("#d" + tempValue).val();
        dieArray[tempArray]++;
        $("#d" + tempValue).val(dieArray[tempArray]);
    });

    $(".submitBtn").click(function()
    {
        event.preventDefault();
        for (var i = 0; i < dieArray.length; i++)
        {
            for( var j = 0; j < dieArray[i]; j++)
            {
                dieRandoms[i].push(RandomNum(1, assignArray[i]));
            }
        }
        displayNumbers();
        clearArrays();
    });

    $("#standAlone20").click(function()
    {
        var d20 = RandomNum(1, 20);
        $("#textBox").append("D20: {" + d20 + "}" + "\r\n---------------------\r\n");
        $("#20result").text(d20);

    });

    $("#textClearBtn").click(function()
    {
        $("#textBox").text("");
    });

    function displayNumbers()
    {
        var whichDieArray = [];
        for (var i = 0; i < 6; i++)
        {
            if (dieRandoms[i] != "")
            {
                showArray.push(dieRandoms[i]);
                whichDieArray.push(assignArray[i]);
            }
        }
        for (var j = 0; j < showArray.length; j++)
        {
            totalsArray[j] = showArray[j].reduce(getSumArray);
            var sumTotal = totalsArray.reduce(getSumArray);
            $("#textBox").append("D" + whichDieArray[j] + ": {" + showArray[j] + "}  Sum: " + totalsArray[j] + "\r\n");
        }
        $("#textBox").append("Sum Total: " + sumTotal + "\r\n---------------------\r\n");
    };

    function clearArrays()
    {
        dieArray = [0,0,0,0,0,0];
        showArray = [];
        totalsArray = [];
        whichDieArray = [];
        d4RandomArr = [];
        d6RandomArr = [];
        d8RandomArr = [];
        d10RandomArr = [];
        d12RandomArr = [];
        d20RandomArr = [];
        dieRandoms = [d4RandomArr, d6RandomArr, d8RandomArr, d10RandomArr, d12RandomArr, d20RandomArr];
        $(".numberBox").val(0);
    };

    // max is 305
    var search = "305";
    var queryURL = "http://www.dnd5eapi.co/api/spells/" + search
    $.ajax(
    {
        url: queryURL,
        method: "GET"
    })
    .done(function(response)
    {
        console.log(response);
        console.log(response.desc);
    });

});