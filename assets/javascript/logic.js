$(document).ready(function()
{

    var howManyD4s;
    $(".dieImage").click(function()
    {
        howManyD4s = $("#d4").val();
        howManyD4s++;
        $("#d4").val(howManyD4s);
        console.log(howManyD4s);

    });
});