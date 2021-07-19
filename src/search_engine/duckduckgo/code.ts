import {checkDomain, checkHumanCanView} from "../../shared/utils";
import {
    BindingKeywordFunctions,
    FnExecArgs,
    SearchResultData,
    SearchResultItem,
    SearchResultPage
} from "../../shared/dt";

export async function fn(
    args: FnExecArgs<Record<string, never>, SearchResultData, BindingKeywordFunctions<SearchResultData>>
):
    Promise<void> {
    if (!
        checkDomain("duckduckgo.com")
    ) {
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
            if (!a || !checkHumanCanView(a)) {
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


    await args.fns.data.set({
        items: extractItems(),
        pages: extractPages(),
        related: extractRelated(),
    })
}
