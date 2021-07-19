import {checkDomain, checkHumanCanView} from "../../shared/utils";
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
    if (!checkDomain("so.com")) {
        return
    }

    function extractRelated(): string[] {
        return [...document.querySelectorAll('#rs > table a')]
            .map((a: HTMLAnchorElement) => {
                return a.innerText
            })
    }

    function extractPages(): SearchResultPage[] {
        return [...document.querySelectorAll('#page > a')].map((a: HTMLAnchorElement) => {
            return {
                page: Number(a.innerText) || 0,
                url: a.href,
            } as SearchResultPage
        })
    }

    function extractItems(): SearchResultItem[] {
        return [...document.querySelectorAll('.res-list')].map((div: HTMLDivElement) => {
            if (!checkHumanCanView(div)) {
                return null
            }

            const s1 = div.querySelector('.res-comm-con') as HTMLSpanElement
            const s2 = div.querySelector('.res-desc') as HTMLSpanElement
            const s3 = div.querySelector('.res-rich') as HTMLSpanElement
            const summary = s1?.innerText || s2?.innerText || s3?.innerText || ""

            const a = div.querySelector('a') as HTMLAnchorElement
            if (!a) {
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
