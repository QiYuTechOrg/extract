/**
 * 翻译参数
 */
export interface TranslateArgs {
    text: string
    src_lang: string
    dst_lang: string
    // 超时时间
    timeout: number
}

/**
 * 翻译的结果
 */
export interface TranslateData {
    src_lang: string
    src_text: string

    dst_lang: string
    dst_text: string
}

export interface TranslateResult extends GenericEvalResult {
    // 翻译的结果
    result?: TranslateData
}

/**
 * 搜索引擎返回的结果
 */
export interface SearchResultItem {
    /// 简介
    summary: string
    /// 目标 URL
    url: string
    /// 标题
    title: string
    /// 内部文字
    innerText: string
    /// 内部 HTML
    innerHtml: string
    /// 是否为广告
    isAd: boolean
}

/**
 * 搜索引擎返回的分页内容
 */
export interface SearchResultPage {
    // 第几页
    page: number
    // 第 n 页面的 URL
    url: string
}


/**
 * 百度热搜
 */
export interface BaiduHotData {
    position: number | string
    title: string
    url: string
    inner_text: string
    hot_value: string
}

export interface GenericNewsData {
    title: string
    url: string
    inner_text: string
}

/**
 * 新闻信息
 */
export interface BaiduNewsData extends GenericNewsData {
    from_src: string
}

/**
 * 百度搜索返回的额外结果
 */
export interface BaiduExtraData {
    hots?: BaiduHotData[]
    news?: BaiduNewsData[]
}

export interface GoogleNewsData extends GenericNewsData {
}

export interface GoogleExtraData {
    news?: GoogleNewsData[]
}

/**
 * 搜索引擎返回的标准数据类型
 */
export interface SearchResultData {
    // 搜索结果
    items: SearchResultItem[]
    // 相关搜索 关键词
    related: string[]
    // 翻页 URL
    pages: SearchResultPage[]
    // 百度搜索 额外的数据
    baidu?: BaiduExtraData
    // Google搜索 额外的数据
    google?: GoogleExtraData
}

/**
 * 通用的执行结果
 */
interface GenericEvalResult {
    /// 无法正常获取代码
    code_error?: boolean
    /// 无法打开新页面 [通常是因为浏览器配置错误]
    page_error?: boolean
}


/**
 * [MonitorRuleMetaFields.view_fn] 返回的结果
 */
export interface MonitorRuleViewBlock {
    view_type: 'text_diff' | 'json' | 'title' | 'markdown'

    // view_type == 'text_diff'
    text_diff_blocks?: [number, string][]

    // view_type == 'json
    json_values?: { old_value: any, new_value: any }

    // view_type == 'title'
    title_text?: string

    // view_type == 'markdown'
    markdown_text?: string
}


