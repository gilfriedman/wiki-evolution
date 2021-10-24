fetch("https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=evolution&limit=500")
.then(resp => resp.json())
.then(async function(data) {
    let html = "<table><tr><td>name</td><td>url</td><td>he name</td></tr>"
    for (let key in data[1]) {
        let heName = await fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&titles="+ data[1][key] +"&prop=langlinks&format=json&lllang=he&lllimit=100")
        .then(resp => resp.json()).then(function(data) {
            let langLinks = data.query.pages[Object.keys(data.query.pages)[0]].langlinks
            let langLink = langLinks && langLinks.find(langObj => langObj.lang == "he");
            return langLink && langLink[Object.keys(langLink)[1]];
        });
        html += `<tr>
        <td>${data[1][key]}</td>
        <td>${data[3][key]}</td>
        <td>${heName}</td>
        </tr>`
    }
    html += "</table>";
    document.write(html);
    console.table(data);
});