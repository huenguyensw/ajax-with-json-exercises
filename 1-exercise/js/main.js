/** 
 * Skapa ett textfält och en knapp "Roll dices".
 * I textfältet skall man kunna ange ett nummer, 
 * som är antal tärningar(slumpad siffra mellan 1-6), som skall hämtas från https://codexplained.se/dice_json_array.php?numberOfDice= värdet från textfältet
 * 
 * Undersök vad som visas i webbläsaren, med följande URLer:
 * https://codexplained.se/dice_json_array.php?numberOfDice=1
 * https://codexplained.se/dice_json_array.php?numberOfDice=4
 *
 * Datan skall i sin tur visas i en lista, där varje tärning placeras i en listItem <li>
 */

let textField = document.getElementById('numberOfDice');
let button = document.getElementById('button');
let listItem = button.nextElementSibling;
const link = 'https://codexplained.se/dice_json_array.php?numberOfDice=';


button.addEventListener('click',async()=>{
    try {
        const response = await fetch(link + textField.value);
        console.log(response)
        if(response.ok == false){
            throw new Error('HTTP error:' + response.status);
        }
        const data = await response.text();
        const dices = JSON.parse(data);
        let htmlContent = "";
        for(let dice of dices){
            htmlContent +=`<li>${dice}</li>`;
        }
        listItem.innerHTML = htmlContent;
    } catch(error){
        console.log(error);
    }
})