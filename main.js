const input = prompt();

fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${input}&limit=500`)
    .then(resp => resp.json())
    .then(async function (data) {
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