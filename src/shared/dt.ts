/// 搜索引擎返回的结果
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

/// 搜索引擎返回的分页内容
export interface SearchResultPage {
    // 第几页
    page: number
    // 第 n 页面的 URL
    url: string
}

/**
 * 搜索引擎返回的标准数据类型
 */
export interface SearchResultData {
    // 搜索结果
    items: SearchResultItem[]
    // 相关搜索 关键词
    related: string[]
    // 翻页
    pages: SearchResultPage[]
}


export interface ExtractSmartOptions {
}

/// return mode 需要移除
/// 我们根据 options 和解析类型来判断返回的数据类型
export type DataExtractReturnMode = "string" | "html"

/// 抽取链接的规则
export interface ExtractLinkOptions {
    same_host: boolean // 必须是同一域名
    same_dir: boolean  // 必须是同一目录(下级目录也可以)
}

export type ExtractParseMode = "smart" | "link" | "value"

export interface ExtractValueOptions {
    inline_image: boolean
    inline_css: boolean
}

/// 数据抽取参数
export interface DataExtractArgs {
    /// 需要从这个节点抽取数据
    doc: HTMLElement

    /// 抽取模式
    parseMode: ExtractParseMode

    /// 返回模式
    /// 部分参数有可能不需要
    returnMode?: DataExtractReturnMode

    /// 抽取模式为 link 的时候有效
    /// 允许为 null 使用默认值
    linkOptions?: ExtractLinkOptions

    /// 抽取模式为 value 的时候有效
    /// 允许为 null 使用默认值
    valueOptions?: ExtractValueOptions

    /// 智能提取模式
    smartOptions?: ExtractSmartOptions
}

/// HTTP 请求参数
export interface HttpCallArgs {
    url: string
    method: string
    form_data: Record<string, any>
    form_type?: 'json' | 'form'
}

/// 抽取 URL 返回结果
export interface ExtractLinkItem {
    // 目标 URL
    target_url: string
    // 来源页面
    src_url: string
    // 链接标题
    link_title?: string
    // 内部文字
    innerText?: string
    // 内部 html
    innerHtml?: string
}

export type ExtractLinkResult = ExtractLinkItem[]

/// 函数执行参数
export interface FnExecArgs {
    /// 当前调用的函数 名称
    fn_name: string
    /// 函数的参数
    fn_args?: string | JSON

    /// 允许调用的函数
    fns: {
        // 截屏
        snapshot: (e: HTMLElement) => Promise<boolean>,
        // 模拟鼠标点击
        mouse_click: (args: { ele: HTMLElement, point: [number, number] }) => Promise<boolean>,
        // OCR 识别网页内容
        ocr_text: (ele: HTMLElement) => Promise<string>,
        // 提取内容
        extract: (args: DataExtractArgs) => Promise<ExtractLinkResult | string>,
        // 获取当前页面元素信息
        metadata: () => Promise<Record<string, any>>,
        // HTTP 请求
        http: (args: HttpCallArgs) => Promise<string>,
    }
}

export interface FnExecNextFnArgs {
    fn_name: string,
    fn_args: any
}

export interface FnQueueUrl {
    queue_name: string   // 处理队列
    url: string          // target url
    title?: string       // a href title
    inner_text?: string  // a href innerText
    inner_html?: string  // a href innerHtml (with polish)
}

/// 函数执行结果
export interface FnExecResult {
    /// 把 url 添加到 queue 中
    ///        队列 URL 的配置
    queue_url?: FnQueueUrl[]

    /// [queue_url] 中需要排除的 URL
    exclude_url?: string[]

    /// 当前页面需要 执行的函数 列表
    /// fn_args 可以为空 [表示没有参数]
    next_fns?: FnExecNextFnArgs[]

    /// 本函数 提取出来的数据
    /// 可以为空 [注意: 后面提取出来的数据会覆盖前面提取出来的数据]
    data?: Record<string, unknown> | any

    /// fn 函数的返回值
    fn_ret?: Record<string, any>

    /// 是否取消任务
    // [当发生严重错误的时候，返回 true 表示本次任务已经取消]
    cancel_job?: boolean
}
