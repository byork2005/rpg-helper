$(document).ready(function()
{
    var dieArray = [0,0,0,0,0,0];
    var assignArray = [4,6,8,10,12,20];
    var d4RandomArr = [];
    var d6RandomArr = [];
    var d8RandomArr = [];
    var d10RandomArr = [];
    var d12RandomArr = [];
    var d20RandomArr = [];
    var dieRandoms = [d4RandomArr, d6RandomArr, d8RandomArr, d10RandomArr, d12RandomArr, d20RandomArr];

    $(".dieImage").click(function()
    {
        var tempValue = $(this).attr('data-value');
        var tempArray = $(this).attr('data-array');
        dieArray[tempArray] = $("#d" + tempValue).val();
        dieArray[tempArray]++;
        $("#d" + tempValue).val(dieArray[tempArray]);
        console.log(dieArray);
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
    });



});