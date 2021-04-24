let fn = function (args) {
    if (!document.location.host.includes("google")) {
        return null;
    }
    function checkIfNumber(s) {
        return !isNaN(parseInt(s));
    }
    function extractPages() {
        const tr = document.querySelector("#xjs > table > tbody > tr");
        if (!tr) {
            return [];
        }
        return [...tr.querySelectorAll("td")]
            .map((td) => {
            const a = td.querySelector("a");
            if (!a || !checkIfNumber(a.innerText)) {
                return null;
            }
            return { page: parseInt(a.innerText), url: a.href };
        })
            .filter((t) => t !== null);
    }
    function extractItem(e) {
        if (!e || !e.firstElementChild || !e.firstElementChild.firstElementChild) {
            console.log('e is invalid: ', e);
            return null;
        }
        const r = e.firstElementChild.firstElementChild;
        if (!r.firstElementChild || !r.lastElementChild) {
            console.log('r not have enough children: ', r);
            return null;
        }
        const first = r.firstElementChild;
        const last = r.lastElementChild;
        if (!first || !last) {
            console.log('first is:', first, ' last is: ', last);
            return null;
        }
        const a = first.querySelector("a");
        if (!a) {
            console.log("first element is not find a:", first);
            return null;
        }
        return {
            summary: last.innerText,
            url: a.href,
            title: a.title,
            innerHtml: a.innerHTML,
            innerText: a.innerText,
            ad: false,
        };
    }
    const content = document.querySelector("#rso");
    if (!content) {
        return null;
    }
    const items = [...content.querySelectorAll(".g")].map(extractItem).filter((t) => t != null);
    console.log(items);
    return {
        data: {
            google_search_results: items,
            google_search_pages: extractPages(),
        }
    };
};
