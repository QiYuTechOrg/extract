export function checkIfNumber(s: string) {
    return !isNaN(parseInt(s));
}

/// 忽略有毒的数据
export function checkHumanCanView(e: HTMLElement) {
    console.log("useless data: ", e)
    if (e.style.display === 'none' || e.style.visibility === 'hidden') {
        return false;
    }
    const rect = e.getBoundingClientRect();

    return !(rect.width < 6 || rect.height < 6);
}


export interface SearchResultItem {
    summary: string
    url: string
    title: string
    innerText: string
    innerHtml: string
    isAd: boolean
}

export interface SearchResultPage {
    page: number
    url: string
}

export interface SearchResultData {
    // 搜索结果
    items: SearchResultItem[]
    // 相关搜索
    related: string[]
    /// 翻页 URL
    pages: SearchResultPage[]
}


export interface FnExecArgs {
    fn_name: string,
    fn_args: Record<string, any>,
    fns: {}
}
