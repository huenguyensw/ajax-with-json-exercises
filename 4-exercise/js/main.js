/** 
 * 
 * Skapa en meny med 3 länkar: 'Blog posts', 'Author', 'About'
 * Beroende på vilken länk man trycker, skall sidans innehåll uppdateras via API anrop till: https://codexplained.se/simple_json.php
 * Notera att länkarna skall EJ ladda om sidan, utan se till att anropen endast uppdaterar en HTML element (ex div#content), där sidans innehåll placeras
 * 
 * Klickar man på 'About'-länken
 *  - Visa då endast en rubrik "About" tillsammans med texten som finns i 'about'-parametern
 * 
 * Klickar man på 'Author'-länken
 *  - Visa då endast en rubrik "Author" tillsammans med texten som finns i 'author'-parametern
 *        
 *
 */

// let blog = document.getElementById('1');
// let about = document.getElementById('2');
// let author = document.getElementById('3');
let section = document.getElementById('section');
let links = document.querySelectorAll('a');
console.log(links);
for(let link of links){
    link.addEventListener('click',function(e){
        console.log(e.target.id)
        e.preventDefault();
        let a_link = e.target.id;
        fetchData(a_link);
    })
}

async function fetchData(id){
    try{
        const response = await fetch('https://codexplained.se/simple_json.php')
        if(response.ok == false){
            throw new Error('HTTP Error: ' + response.status);
        }
        const data = await response.json();
        if(id == 'blog_posts'){
            let blogContent = "";
            for(let text of data.blog_posts){
                let tagContent = "";
                for(let tag of text.tags){
                    tagContent += `${tag}, `
                }
                blogContent += `<article>
                <h2>${text.title}</h2>
                <h3><i>${text.date}</i></h3>
                <p>${text.text}</p>
                <p style="padding-left: 15px">Tags: ${tagContent}</p>
                </article>`;  
            }
            section.innerHTML = `${blogContent}`;
        } else {
            const title = id.charAt(0).toUpperCase()+ id.slice(1);
            section.innerHTML = `<h2>${title}</h2><p>${data[id]}</p>`;
        }

    }catch(error){
        console.log(error);
    }
}
// blog.addEventListener('click',function(e){
//     e.preventDefault();
//     fetchData(1);
// });
// about.addEventListener('click',function(e){
//     e.preventDefault();
//     fetchData(2);
// });
// author.addEventListener('click',function(e){
//     e.preventDefault();
//     fetchData(3);
// });

