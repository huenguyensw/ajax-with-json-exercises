/** 
 * Skapa en tabell med 5 kolumner och 2 rader
 * Första raden i tabellen skall innehålla en knapp per kolumn, dvs totalt fem knappar på först raden.
 * - Första knappen skall heta "1", och hämta endast ett ord från https://codexplained.se/lorem_json_array.php?numberOfWords= värdet som anges
 * - Andra knappen skall heta "2", och hämta två ord från samma URL
 * - Tredje knappen skall heta "3", och hämta tre ord från samma URL
 * - Gör samma sak för knapp 4 och 5
 * 
 * Undersök vad som visas i webbläsaren, med följande URLer:
 * https://codexplained.se/lorem_json_array.php?numberOfWords=3
 * https://codexplained.se/lorem_json_array.php?numberOfWords=10
 *
 * Varje knapp hämtar datan och placerar datan under respektive knapp, i andra raden.
 * Datan är en array med ord, dessa ord skall visas i en lista där varje ord är en listitem <il>
 * 
 * 
 * Skall ungefär se ut på följande sätt, efter att varje knapp gjort ett anrop
 * |-----|-----|-----|-----|-----|
 * |  1  |  2  |  3  |  4  |  5  |
 * |-----|-----|-----|-----|-----|
 * |.asd |.asd |.qwe |.qwe |.wer |
 * |     |.weq |.ewr |.gfd |.sfd |
 * |     |     |.ewr |.gfd |.cvx |
 * |     |     |     |.gfd |.dff |
 * |     |     |     |     |.bvc |
 * |-----|-----|-----|-----|-----|
 */
let tableForm = document.getElementById('table');

const URL = 'https://codexplained.se/lorem_json_array.php?numberOfWords=';
class Columns{
    constructor(numberOfColumns) {
        this.numberOfColumns = numberOfColumns;
        //create header-row
        let row1 = "";
        for (let i = 1; i<= numberOfColumns; i++) {
            row1 += `<th><button id=${i}>${i}</button></th>`;
        }
        tableForm.innerHTML += `<thead><tr>${row1}</tr></thead>`;
        
        //create data-row
        let listOfTd = "";
        for (let i= 1; i<=numberOfColumns; i++){
            listOfTd += `<td></td>`;
        }
        tableForm.innerHTML += `<tbody><tr>${listOfTd}</tr></tbody>`;
        
        this.displayData();
    }
    displayData(){
        for (let i= 1; i<= this.numberOfColumns; i++){
            this.fetchData(i);
        }
    }
    fetchData(id){
            let button = document.getElementById(id);
            button.addEventListener('click',async()=>{
                try{
                    const response = await fetch(URL+id);
                    if(response.ok == false){
                        throw new Error('HTTP Error: ' + response.status);
                    }
                    const data = await response.text();
                    const listofWords = JSON.parse(data);
                    let words = "";
                    for (let word of listofWords){
                        words += `<li>${word}</li>`;
                    }
                    tableForm.lastElementChild.firstElementChild.childNodes[id-1].innerHTML += `${words}`;
                    
                } catch(error){
                    console.log(error);
                }
            })
    }
}
const maxColums = 5;
const table = new Columns(maxColums);
console.log(table.columns);