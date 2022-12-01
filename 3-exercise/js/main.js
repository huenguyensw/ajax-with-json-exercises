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
    constructor(columns) {
        this.columns = columns;
        let row1 = "";
        for (let column of this.columns) {
            row1 += `<th><button id=${column}>${column}</button></th>`;
        }
        tableForm.innerHTML += `<tr>${row1}</tr>`;
    }
    showData(){
        tableForm.innerHTML += `<tr></tr>`;
        for (let column of this.columns){
            this.fetchData(column);
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
                    tableForm.lastElementChild.firstElementChild.innerHTML += `<td>${words}</td>`;
                } catch(error){
                    console.log(error);
                }
            })
    }
}

const table = new Columns([1,2,3,4,5]);
console.log(table.columns);
table.showData();