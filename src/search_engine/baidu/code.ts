import {checkDomain, checkHumanCanView, checkIfNumber} from "../../shared/utils";
import {
    BaiduHotData,
    BaiduNewsData,
    BindingKeywordFunctions,
    FnExecArgs,
    SearchResultData,
    SearchResultItem,
    SearchResultPage
} from "../../shared/dt";

export async function fn(
    args: FnExecArgs<SearchResultData, BindingKeywordFunctions<SearchResultData>>
): Promise<void> {
    /// 必须在 baidu.com 中执行才有用
    if (!checkDomain("baidu.com")) {
        return
    }

    const fns = args.fns

    /**
     * 获取百度热搜
     */
    function extractHot(): BaiduHotData[] {
        const body_list = [...document.querySelectorAll('.FYB_RD > table > tbody')]
        const values = body_list.map((tbody: HTMLElement) => {
            if (!checkHumanCanView(tbody)) {
                return null;
            }

            const tr_list = [...tbody.querySelectorAll('tr')]

            return tr_list.map((tr: HTMLTableRowElement, index) => {
                const td_list = [...tr.querySelectorAll('td')]
                if (td_list.length !== 2) {
                    return;
                }
                const first = td_list[0];
                const last = td_list[1];

                const a: HTMLAnchorElement = first.querySelector('a')
                if (!a) {
                    console.log(first, 'not have a href')
                    return null
                }

                return {
                    position: index,
                    title: a.title,
                    url: a.href,
                    inner_text: a.innerText,
                    hot_value: last.innerText
                } as BaiduHotData
            }).filter(Boolean)
        }).filter(Boolean)

        return values.flat()
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
        }).filter(Boolean)
    }

    function extractItem(e: HTMLDivElement): SearchResultItem {
        if (!checkHumanCanView(e)) {
            return
        }

        const s1 = (e.querySelector(".c-abstract") as HTMLDivElement)?.innerText
        const s2 = (e.querySelector('.op-bk-polysemy-piccontent') as HTMLDivElement)?.innerText

        const summary = s1 || s2 || "";

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

    function extractNews(): BaiduNewsData[] {
        const div_list = [...document.querySelectorAll('[tpl="news-realtime"] > div')] as HTMLDivElement[]
        return div_list.map((div) => {
            if (!checkHumanCanView(div)) {
                return null
            }

            return [...div.querySelectorAll('div > a')].map((a: HTMLAnchorElement) => {
                return {
                    title: a.title,
                    url: a.href,
                    inner_text: a.innerText,
                    from_src: a.nextElementSibling?.innerHTML ?? ""
                } as BaiduNewsData
            }).filter(Boolean)
        }).filter(Boolean).flat()
    }

    const content = document.querySelector("#content_left");
    const items = [...content.children].map(extractItem).filter(Boolean)

    console.log(items)

    await fns.data.set({
        items: items,
        pages: extractPages(),
        related: extractRelated(),
        baidu: {
            hots: extractHot(),
            news: extractNews(),
        }
    })
}
