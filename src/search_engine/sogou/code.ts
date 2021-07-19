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
): Promise<void> {
    if (!checkDomain("duckduckgo.com")) {
        return
    }

    function extractRelated(): string[] {
        return [...document.querySelectorAll('.hintBox a')]
            .map((a: HTMLAnchorElement) => {
                if (checkHumanCanView(a)) {
                    return a.innerText
                }
                return null
            }).filter(Boolean)
    }

    function extractPages(): SearchResultPage[] {
        return [...document.querySelectorAll('#pagebar_container a')]
            .map((a: HTMLAnchorElement) => {
                if (checkHumanCanView(a)) {
                    return {
                        page: Number(a.innerText) || 0,
                        url: a.href
                    } as SearchResultPage
                }
                return null
            }).filter(Boolean)
    }

    function extractItems(): SearchResultItem[] {
        return [...document.querySelectorAll('[id^="rb_"]')].map((div: HTMLDivElement) => {
            if (!checkHumanCanView(div)) {
                return
            }


            const s1 = div.querySelector('[id^="cacheresult_summary"]') as HTMLSpanElement
            const s2 = div.querySelector('.citeurl') as HTMLDivElement
            const summary = (s1?.innerText || "") + "\n" + (s2?.innerText || "")

            const a = div.querySelector('.vr-title > a') as HTMLAnchorElement
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
