import {checkDomain, checkHumanCanView} from "../../shared/utils";
import {SearchResultData, SearchResultItem, SearchResultPage} from "../../shared/dt";
import {FnExecArgsV2} from "../../shared/dt_core";

export async function fn(
    args: FnExecArgsV2<Record<string, never>, SearchResultData>
): Promise<void> {
    if (!checkDomain("bing.com")) {
        return
    }

    function extractRelated(): string[] {
        return [...document.querySelectorAll('.b_rs > ul > li > a')]
            .map((a: HTMLAnchorElement) => {
                return a.innerText
            })
    }

    function extractPages(): SearchResultPage[] {
        return [...document.querySelectorAll('.sb_pagF > li > a')].map((a: HTMLAnchorElement) => {
            return {
                page: Number(a.innerText) || 0,
                url: a.href,
            } as SearchResultPage
        })
    }

    function extractItems(): SearchResultItem[] {
        return [...document.querySelectorAll('.b_algo')].map((div: HTMLDivElement) => {
            if (!checkHumanCanView(div)) {
                return null
            }

            const s1 = div.querySelector('.b_caption') as HTMLSpanElement
            const summary = s1?.innerText || ""

            const a = div.querySelector('h2 > a') as HTMLAnchorElement
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
