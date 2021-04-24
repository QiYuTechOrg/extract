let fn = function (args) {
    if (!document.location.href.includes("baidu.com")) {
        return null;
    }
    function checkIfNumber(s) {
        return !isNaN(parseInt(s));
    }
    function checkHumanCanView(e) {
        console.log("useless data: ", e);
        if (e.style.display === 'none' || e.style.visibility === 'hidden') {
            return false;
        }
        const rect = e.getBoundingClientRect();
        return !(rect.width < 6 || rect.height < 6);
    }
    function extractPages() {
        const page = document.getElementById("page");
        if (!page) {
            return [];
        }
        const inner = page.querySelector(".page-inner");
        if (!inner) {
            return [];
        }
        const a_s = [...inner.querySelectorAll("a")];
        return a_s.map((a) => {
            if (a.innerText.includes("下一页") || !checkIfNumber(a.innerText)) {
                return null;
            }
            return { page: parseInt(a.innerText), url: a.href };
        }).filter((t) => t != null);
    }
    function extractItem(e) {
        if (checkHumanCanView(e) === false) {
            return null;
        }
        let summary = "";
        const ae = e.querySelector(".c-abstract");
        if (ae) {
            summary = ae.innerText;
        }
        else {
            console.log('summary is not found for:', e);
        }
        let a = e.querySelector('h3 a');
        if (!a) {
            console.log('use not find "h3 a" for element:', e);
            return null;
        }
        const isAd = [...e.querySelectorAll("span")].map((span) => {
            return span.innerText.trim() === "广告";
        }).some((v) => v);
        return {
            summary: summary,
            url: a.href,
            title: a.title,
            innerHtml: a.innerHTML,
            innerText: a.innerText,
            ad: isAd,
        };
    }
    const content = document.querySelector("#content_left");
    const items = [...content.children].map(extractItem).filter((t) => t != null);
    console.log(items);
    return {
        data: {
            baidu_search_results: items,
            baidu_search_pages: extractPages(),
        }
    };
};
