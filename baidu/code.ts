let fn = function (args) {


    function extractItem(e: HTMLDivElement) {
        const rect = e.getBoundingClientRect();
        if (rect.width < 6 || rect.height < 6) {
            return null;
        }

        let summary = "";
        const ae = e.querySelector(".c-abstract") as HTMLDivElement
        if (ae) {
            summary = ae.innerText
        } else {
            console.log('summary is not found for:', e)
        }

        let a = e.querySelector('h3 a') as HTMLAnchorElement
        if (!a) {
            console.log('use not find "h3 a" for element:', e)
            return null;
        }

        const isAd = [...e.querySelectorAll("span")].map((span: HTMLSpanElement) => {
            return span.innerText.trim() === "广告"
        }).some((v) => v)

        return {
            summary: summary,
            url: a.href,
            title: a.title,
            innerHtml: a.innerHTML,
            innerText: a.innerText,
            ad: isAd,
        }
    }

    const content = document.querySelector("#content_left");
    const items = [...content.children].map(extractItem).filter((t) => t != null)

    console.log(items)

    return {
        data: {
            baidu_search_results: items
        }
    }
}
