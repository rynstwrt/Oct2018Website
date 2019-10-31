// Ryan Stewart Oct 31, 2019.
var typeElem = document.getElementById("type");
var placeHolder = '\u2022'
var destString = 'Computer science major @ UT Dallas.';

typeElem.innerHTML = destString.replace(/\S/g, placeHolder);

var i = 0;
function addLetterAndWait()
{
    if (i < destString.length)
    {
        var firstCharacter = typeElem.innerHTML.substring(0, i);
        var remainingCharacters = typeElem.innerHTML.substring(i + 1, destString.length);
        
        typeElem.innerHTML = firstCharacter + destString.charAt(i) + remainingCharacters;
        i++;
        setTimeout(addLetterAndWait, 50);
    }
}