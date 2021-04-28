import {checkIfNumber} from "../shared/utils";
import {FnExecArgs, SearchResultData, SearchResultItem, SearchResultPage} from "../shared/dt";

let fn = async function (args: FnExecArgs): Promise<{ data: SearchResultData } | null> {
    /// 检测是否在 google 域名下面
    if (!document.location.host.includes("google")) {
        return null;
    }

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

    function extractItem(e: HTMLDivElement): SearchResultItem {
        if (!e || !e.firstElementChild || !e.firstElementChild.firstElementChild) {
            console.log('e is invalid: ', e)
            return null;
        }


        const r = e.firstElementChild.firstElementChild;
        if (!r.firstElementChild || !r.lastElementChild) {
            console.log('r not have enough children: ', r)
            return null;
        }


        const first = r.firstElementChild as HTMLDivElement;
        const last = r.lastElementChild as HTMLDivElement;

        if (!first || !last) {
            console.log('first is:', first, ' last is: ', last);
            return null;
        }

        const a = first.querySelector("a");
        if (!a) {
            console.log("first element is not find a:", first);
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
        return null;
    }

    const items = [...content.querySelectorAll(".g")].map(extractItem).filter((t) => t != null);

    console.log(items)

    return {
        data: {
            items: items,
            pages: extractPages(),
            related: extractRelated(),
        }
    }
}
