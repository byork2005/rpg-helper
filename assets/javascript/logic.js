$(document).ready(function()
{
    //// dice variables
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
    //// api variables
    var currentSpellIndex;
    var currentSpellName;
    var favoriteSpells = [];

    //// Firebase
    var config = 
    {
        apiKey: "AIzaSyAnZYOgCyStnfjT_IsVVoXyKLuw9PjnK6w",
        authDomain: "myrpg-df26c.firebaseapp.com",
        databaseURL: "https://myrpg-df26c.firebaseio.com",
        projectId: "myrpg-df26c",
        storageBucket: "myrpg-df26c.appspot.com",
        messagingSenderId: "975165908705"
    };
    firebase.initializeApp(config);
    
    //// Click Events
    // Adds one to input field for the associating die image.
    $(".dieImage").click(function()
    {
        tempValue = $(this).attr('data-value');
        tempArray = $(this).attr('data-array');
        dieArray[tempArray] = $("#d" + tempValue).val();
        dieArray[tempArray]++;
        $("#d" + tempValue).val(dieArray[tempArray]);
    });

    // Collects all the input from the dice fields, generates appropriate amount of random values. Runs display and clear functions.
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

    // Random Number between 1-20, inserts into own div and the text area.
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

    // Calls Dnd5e api with random index number. Inserts all returned values into Spell Card.
    $("#spellBtn").on("click", function()
    {
        var search = RandomNum(1, 305);
        var queryURL = "http://www.dnd5eapi.co/api/spells/" + search;
        $.ajax(
        {
            url: queryURL,
            method: "GET"
        })
        .done(function(response)
        {
            currentSpellIndex = response.index;
            currentSpellName = response.name;
            $("#spellName").text(response.name);
            $("#casting").text("Casting Time: " + response.casting_time);
            $("#duration").text("Duration: " + response.duration);
            $("#level").text("Level: " + response.level);
            $("#desc").text("Description: " + response.desc);
            $("#range").text("Range: " + response.range);
            $("#con").text("Concentration: " + response.concentration);
            $("#school").text("School: " + response.school.name);
        });
    });

    $("#saveSpellBtn").on("click", function()
    {
        favoriteSpells.push({currentSpellIndex, currentSpellName});
        console.log(favoriteSpells);
        makeSpellBtns();
        // var newSpellBtn = $("<button class='btn btn-primary favSpells'>");
        // newSpellBtn.attr("data-value", currentSpellIndex);
        // newSpellBtn.text(currentSpellName);
        // $("#newSpellBtns").append(newSpellBtn);
    });

    //// Functions
    // Insert the random numbers from dieRandoms array into the text area.
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

    // Reset all the arrays to empty and input fields to 0.
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

    function makeSpellBtns()
    {
        $("#newSpellBtns").empty();
        for (var i = 0; i < favoriteSpells.length; i++)
        {
            var newSpellBtn = $("<button class='btn btn-primary favSpells'>");
            newSpellBtn.attr("data-value", favoriteSpells[i].currentSpellIndex);
            newSpellBtn.text(favoriteSpells[i].currentSpellName);
            $("#newSpellBtns").append(newSpellBtn);
        }
    };
});