/** 
 * Skapa ett textfält och en knapp 'Fetch data'.
 * I textfältet skall man kunna ange ett nummer, 
 * som är antal ord som man vill hämta från https://codexplained.se/lorem_json_array.php?numberOfWords= värdet från textfältet
 * 
 * Undersök vad som visas i webbläsaren, med följande URLer:
 * https://codexplained.se/lorem_json_array.php?numberOfWords=3
 * https://codexplained.se/lorem_json_array.php?numberOfWords=10
 *
 * Datan skall läggas in i en tabell <table></table>, med 2 kolumner:
 * - Kolumn 1 skall ha rubriken 'Number of words', och innehålla nummret som angavs
 * - Kolumn 2 skall ha rubriken 'Result', och innehålla datan. Datan är en array med ord, där varje ord skall visas i en egen listItem <li>
 * 
 * Varje anrop skall hämta och placera datan i en ny rad, i tabellen
 * 
 * Skall ungefär se ut på följande sätt:
 * |-----------------|-----------|
 * | Number of words | Result    |
 * |-----------------|-----------|
 * |        2        |   .wer    |
 * |                 |   .sfd    |
 * |-----------------|-----------|
 * |        3        |   .wer    |
 * |                 |   .sfd    |
 * |                 |   .ert    |
 * |-----------------|-----------|
 */

let textField = document.getElementById('textField');
let fetchDataButton = document.getElementById('fetchData');
let table = document.getElementById('table');

let numberOfWords;

fetchDataButton.addEventListener('click', async()=>{
    numberOfWords = textField.value;
    try{
        const response = await fetch('https://codexplained.se/lorem_json_array.php?numberOfWords=' + numberOfWords);

        if(response.ok == false){
            throw new Error('HTTP Error: ' + response.status);
        }

        const data = await response.text();
        const words = JSON.parse(data);
        let listofWords = "";
        for (let word of words){
            listofWords += `<li>${word}</li>`
        }
        table.innerHTML +=`<tr><td>${numberOfWords}</td><td>${listofWords}</td></tr>`
        
    }
    catch(error){
        console.log(error);
    }
})