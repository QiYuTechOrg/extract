import {checkIfNumber} from "../shared/utils";
import {BindingKeywordFunctions, FnExecArgs, SearchResultData, SearchResultItem, SearchResultPage} from "../shared/dt";

let fn = async function (args: FnExecArgs): Promise<{ data: SearchResultData } | null> {
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
            })
            .filter((t) => t !== null)
    }

    async function extractItem(e: HTMLDivElement): Promise<SearchResultItem> {
        if (!e || !e.firstElementChild || !e.firstElementChild.firstElementChild) {
            await fns.log.error(`e is invalid: ${e.outerHTML}`)
            return null;
        }


        const r = e.firstElementChild.firstElementChild;
        if (!r.firstElementChild || !r.lastElementChild) {
            await fns.log.error(`r not have enough children: ${r.outerHTML}`)
            return null;
        }


        const first = r.firstElementChild as HTMLDivElement;
        const last = r.lastElementChild as HTMLDivElement;

        if (!first || !last) {
            await fns.log.error(`first is: ${first} last is: ${last}`)
            return null;
        }

        const a = first.querySelector("a");
        if (!a) {
            await fns.log.info(`first element is not find a: ${first.innerText}`)
            return null;
        }

        // google 默认获取不到 广告的内容
        return {
            summary: last.innerText,
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
