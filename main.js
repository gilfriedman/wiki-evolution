const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const input = urlParams.get('input');

// getSubcatsByCatAndLevel("Category:Animals", 2);

fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&list=categorymembers&cmtitle=Category:${input}&format=json&cmlimit=500`)
    .then(resp => resp.json())
    .then(async function (data) {
        debugger
        document.write("<table><tr><td>name</td><td>url</td><td>he name</td></tr>");

        const urls = data[1].map(title => `https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${title}&prop=langlinks&format=json&lllang=he&lllimit=500`);
        const responses = await Promise.all(urls.map(async url => {
            const resp = await fetch(url);
            return resp.json();
        }));
        const langLinks = responses.map(response => response.query.pages[Object.keys(response.query.pages)[0]].langlinks);
        const heNames = langLinks.map(langLink => langLink && langLink[0][Object.keys(langLink[0])[1]]);

        for (let key in data[1]) {
            document.write(`<tr>
        <td>${data[1][key]}</td>
        <td>${data[3][key]}</td>`
                + (heNames[key] ? `<td><a href="https://he.wikipedia.org/wiki/${heNames[key]}">${heNames[key]}</a></td>` : "<td></td>")
                + `</tr>`);
        }
    });

async function getSubcatsByCatAndLevel(catName, level) {
    // let subcats = [];
    let resp = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&list=categorymembers&cmtitle=${catName}&cmtype=subcat&format=json&cmlimit=500`);
    let json = await resp.json();
    debugger
    let subcats = json.query.categorymembers.map(cat => cat.title)
    if (level > 0){
        level--;
        subcats.forEach(async subcat => {
            let results = await getSubcatsByCatAndLevel(subcat, level);
            subcats = [...subcats, ...results];
        });
    }
    return subcats;
}

async function getAllSubcats(catName){
    let resp = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&list=categorymembers&cmtitle=${catName}&cmtype=subcat&format=json&cmlimit=500`);
    let json = await resp.json();
    if (json.continue){

    }
    return 
}