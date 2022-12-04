/** 
 * Kopiera in koden från föregående uppgift "6-exercise"
 * 
 * Bygg vidare på inläggslistan
 * - Se till att varje inlägg endast visar sin rubrik, resten av inlägget skall vara dolt
 * - Rubriken skall vara en klickbar länk (som EJ laddar om sidan)
 * - När man trycker på en rubrik, då skall inläggets innehåll visas under rubriken. Trycker man igen, då döljs innehållet återigen.
 * - Extra (jQuery): Försök lägga till en animation som visar/döljer inläggsinnehållet på ett snyggt sätt. Ex slide up/slide down
 * 
 *
 */

let section = document.getElementById('section');
let links = document.querySelectorAll('a');
console.log(links);
for (let link of links) {
    link.addEventListener('click', function (e) {
        console.log(e.target.id)
        e.preventDefault();
        let a_link = e.target.id;
        fetchData(a_link);
    })
}

async function fetchData(id) {
    try {
        const response = await fetch('https://codexplained.se/simple_json.php')
        if (response.ok == false) {
            throw new Error('HTTP Error: ' + response.status);
        }
        const data = await response.json();
        if (id == 'blog_posts') {
            showBlogPost(data.blog_posts);
        } else {
            const title = id.charAt(0).toUpperCase() + id.slice(1);
            section.innerHTML = `<h2>${title}</h2><p>${data[id]}</p>`;
        }

    } catch (error) {
        console.log(error);
    }
}

function showBlogPost(posts) {
    let blogContent = "";
    for (let post of posts) {
        let tagContent = "";
        for (let tag of post.tags) {
            tagContent += `${tag}, `
        }
        blogContent += `<article>
                 <h2><a href="#">${post.title}</a></h2>
                 <content style="display: none">
                 <h3><i>${post.date}</i></h3>
                 <p >${post.text}</p>
                 <p style="padding-left: 15px">Tags: ${tagContent}</p>
                 </content>
                 </article>`;
        
    }

    section.innerHTML = `${blogContent}`;
    const a_links = section.querySelectorAll('a');
    console.log(a_links)
    for (let link of a_links){
        showDetailPosts(link);
    } 
}

function showDetailPosts(a){
    let content = a.parentNode.nextElementSibling;
    console.log(content);
    $(a).click(function(){
        $(content).toggle();
    })
}