$(document).ready(function()
{
    var howManyD4 = 0;
    var howManyD6 = 0;
    var howManyD8 = 0;
    var howManyD10 = 0;
    var howManyD12 = 0;
    var howManyD20 = 0;
    var dieArray = [howManyD4, howManyD6,, howManyD8, howManyD10, howManyD12, howManyD20]
    
    // $(".dieImage").click(function()
    // {
    //     howManyD4 = $("#d" + this.data-value).val();
    //     howManyD4++;
    //     $("#d4").val(howManyD4s);
    //     console.log(howManyD4s);
    // });

    $(".dieImage").click(function()
    {
        console.log(dieArray);
        var temp = $(this).attr('data-value');
        var temp2 = $(this).attr('data-array');
        console.log(temp, temp2)
        dieArray[temp2] = $("#d" + temp).val();
        dieArray[temp2]++;
        console.log(dieArray);
        $("#d" + temp).val(dieArray[temp2]);
    });

});