import {checkIfNumber} from "../../shared/utils";
import {
    BindingKeywordFunctions,
    FnExecArgs,
    SearchResultData,
    SearchResultItem,
    SearchResultPage
} from "../../shared/dt";

export async function fn(
    args: FnExecArgs<SearchResultData, BindingKeywordFunctions<SearchResultData>>
): Promise<void> {
    /// 检测是否在 google 域名下面
    if (!document.location.host.includes("google")) {
        return null;
    }

    const fns = args.fns as BindingKeywordFunctions

    function extractRelated(): string[] {
        const d = document.getElementById("botstuff")
        if (!d) {
            return [];
        }

        const as = [...d.querySelectorAll('a')]

        return as.map((a: HTMLAnchorElement) => {
            return a.innerText
        })
    }

    function extractPages(): SearchResultPage[] {
        const tr = document.querySelector("#xjs > table > tbody > tr");
        if (!tr) {
            return [];
        }

        return [...tr.querySelectorAll("td")]
            .map((td: HTMLTableDataCellElement) => {
                const a = td.querySelector("a")
                // ignore Next 上一页 下一页
                if (!a || !checkIfNumber(a.innerText)) {
                    return null
                }
                return {page: parseInt(a.innerText), url: a.href}
            }).filter(Boolean)
    }

    async function extractItem(g: HTMLDivElement): Promise<SearchResultItem> {
        const last = g.querySelector('.IsZvec') as HTMLDivElement

        const a = g.querySelector("a");
        if (!a) {
            return null;
        }

        // google 默认获取不到 广告的内容
        return {
            summary: last?.innerText || "",
            url: a.href,
            title: a.title,
            innerHtml: a.innerHTML,
            innerText: a.innerText,
            isAd: false,
        }
    }

    const content = document.querySelector("#rso");
    if (!content) {
        await fns.notify({title: 'Google Search 获取失败', body: '#rso is not found'})
        return null;
    }

    const items = (await Promise.all([...content.querySelectorAll(".g")].map(extractItem))).filter(Boolean);

    await fns.data.set({
        items: items,
        pages: extractPages(),
        related: extractRelated(),
    })
}