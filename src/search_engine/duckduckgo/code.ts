import {checkDomain, checkHumanCanView, sleep} from "../../shared/utils";
import {SearchResultData, SearchResultItem, SearchResultPage} from "../../shared/dt";
import {FnExecArgsV2} from "../../shared/dt_core";

export async function fn(
    args: FnExecArgsV2<Record<string, never>, SearchResultData>
): Promise<void> {

    if (!checkDomain("duckduckgo.com")) {
        return
    }

    function extractRelated(): string[] {
        return [...document.querySelectorAll('.related-searches__lists a')]
            .map((a: HTMLAnchorElement) => {
                if (checkHumanCanView(a)) {
                    return a.innerText
                }
                return null
            }).filter(Boolean)
    }

    function extractPages(): SearchResultPage[] {
        return []
    }

    function extractItems(): SearchResultItem[] {
        return [...document.querySelectorAll('#links > div')].map((div: HTMLDivElement) => {
            if (!checkHumanCanView(div)) {
                return
            }


            const s1 = div.querySelector('.result__snippet') as HTMLSpanElement
            const summary = s1?.innerText || ""

            const a = div.querySelector('.result__title > a') as HTMLAnchorElement
            if (!checkHumanCanView(a)) {
                return
            }

            return {
                summary: summary,
                url: a.href,
                title: a.title,
                innerText: a.innerText,
                innerHtml: a.innerHTML,
                isAd: false,
            } as SearchResultItem

        }).filter(Boolean)
    }


    async function waitForLoadData() {
        for (let t = 5 * 1000; t > 0; t = t - 20) {
            const m = document.querySelector('#links')
            if (m && m.innerHTML.trim() !== "") {
                console.log("result is:", m.innerHTML)
                break;
            } else {
                await sleep(20)
            }
        }
    }


    await waitForLoadData()

    await args.fns.data.set({
        items: extractItems(),
        pages: extractPages(),
        related: extractRelated(),
    })
}
