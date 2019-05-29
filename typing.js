var a = document.getElementById("type");
var str = 'Computer science major @ UT Dallas.';
a.innerHTML = str.replace(/\S/g, "_")

var i = 0;
function addLetterAndWait()
{
    if (i < str.length)
    {
        var first = a.innerHTML.substring(0, i);
        var rest = a.innerHTML.substring(i + 1, str.length);
        
        a.innerHTML = first + str.charAt(i) + rest;
        i++;
        setTimeout(addLetterAndWait, 50);
    }
}

$(window).bind("load", () =>
{
    addLetterAndWait();
});
