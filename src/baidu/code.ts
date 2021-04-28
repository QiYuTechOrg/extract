import {
    checkIfNumber,
    checkHumanCanView,
    FnExecArgs,
    SearchResultData,
    SearchResultItem,
    SearchResultPage
} from "../shared/utils";

let fn = async function (args: FnExecArgs): Promise<{ data: SearchResultData }> {
    /// 必须在 baidu.com 中执行才有用
    if (!document.location.href.includes("baidu.com")) {
        return null;
    }

    function extractPages(): SearchResultPage[] {
        const page = document.getElementById("page")
        if (!page) {
            return [];
        }
        const inner = page.querySelector(".page-inner")
        if (!inner) {
            return [];
        }
        const a_s = [...inner.querySelectorAll("a")];
        return a_s.map((a: HTMLAnchorElement) => {
            if (a.innerText.includes("下一页") || !checkIfNumber(a.innerText)) {
                return null;
            }
            return {page: parseInt(a.innerText), url: a.href}
        }).filter((t) => t != null)
    }

    function extractItem(e: HTMLDivElement): SearchResultItem {
        if (checkHumanCanView(e) === false) {
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
            isAd: isAd,
        }
    }

    function extractRelated(): string[] {
        const rs = document.getElementById("rs")
        if (!rs) {
            return [];
        }

        const as = [...rs.querySelectorAll("a")]

        return as.map((a: HTMLAnchorElement) => {
            return a.innerText
        })
    }

    const content = document.querySelector("#content_left");
    const items = [...content.children].map(extractItem).filter((t) => t != null)

    console.log(items)

    return {
        data: {
            items: items,
            pages: extractPages(),
            related: extractRelated(),
        }
    }
}
