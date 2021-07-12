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

/**
 * 搜索引擎返回的字段信息
 */
export interface KeywordSearchResult {
    /// 搜索引擎的名字 [必须有表示这个信息是那个搜索引擎产生的]
    se_name: string

    /// 无法正常获取 code
    code_error?: boolean
    /// 无法打开新页面 [通常是因为浏览器配置错误]
    page_error?: boolean
    /// 搜索结果
    search_result?: SearchResultData
    /// 函数的日志记录
    func_log?: LogRecord[]
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

/// 调用其他函数
export interface FuncCallArgs {
    // 函数的名称
    fn_name: string
    // 函数的参数
    fn_args: Record<string, any>
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

export interface StorageCrawlResultRecord {
    id: number

    url: string
    /// 最终的 URL [一般跟 url 应该一样，除非 301 跳转等]
    final_url: string
    queue_name: string

    link_depth: number
    /// 最后抓取到的数据
    extract_data: string | Record<string, any>
    /// html 源文件
    html_raw: string

    snapshot_path: string | null
    rrweb_path: string | null
    video_path: string | null

    // 耗时 单位毫秒
    consume: number

    /// 创建时间
    ctime: string
}

export interface BindingDbFunctions {
    /// 添加到队列中
    crawl_queue_add: (newUrl: FnQueueUrl) => Promise<boolean>
}

export interface BindingLogFunctions {
    /// 调试日志
    debug: (message: string, context?: Record<string, any>) => Promise<void>
    /// 提示日志
    info: (message: string, context?: Record<string, any>) => Promise<void>
    /// 警告日志
    warn: (message: string, context?: Record<string, any>) => Promise<void>
    /// 错误日志
    error: (message: string, context?: Record<string, any>) => Promise<void>
}

export interface BindingCacheFunctions {
    /// 设置页面内缓存
    set: (key: string, value: any) => Promise<void>
    /// 获取页面内缓存
    get: (key: string, default_value: any) => Promise<any | null>
    /// 获取页面内所有的缓存值
    all: () => Promise<Record<string, any>>
}

export interface BindingDataFunctions {
    set: (obj: Record<string, any>) => Promise<void>
    get: () => Promise<Record<string, any>>
}


export interface BindingSharedFunctions {
    /// 截图
    snapshot: (element: string | HTMLElement) => Promise<string | null>,
    /// OCR 识别
    ocr: (element: string | HTMLElement) => Promise<string | null>,
    /// 点击
    mouse_click: (element: string | HTMLElement) => Promise<void>,
    /// 语言
    language: {
        // 语言识别 返回语言的类别
        identify: (text: string) => Promise<string | null>,
    },
    /// 发送 HTTP 请求
    http: (args: HttpCallArgs) => Promise<string | null>,
    /// 函数调用
    call_func: (args: FuncCallArgs) => Promise<any | null>
    /// 日志相关的操作
    log: BindingLogFunctions,
    /// cache 操作
    cache: BindingCacheFunctions
    /// 数据相关的操作
    data: BindingDataFunctions
    /// 本地通知
    notify: (args: LocalNotificationOptions) => Promise<boolean>
}

export interface BindingKeywordFunctions extends BindingSharedFunctions {
}

export interface BindingCrawlFunctions extends BindingSharedFunctions {
    /// 数据库相关的操作
    db: BindingDbFunctions,
}

export interface FnExecArgs {
    /// 当前调用的函数 名称
    fn_name: string
    /// 函数的参数
    fn_args?: Record<string, any>
    /// 绑定的函数
    fns: BindingCrawlFunctions    // 数据提取的时候
        | BindingKeywordFunctions // 关键字搜索的时候
}

/// 可以返回任意的值
/// 注意: 个别字段有特殊的含义
export interface FnExecResult extends Record<string, any> {
    /// 在运行数据抓取的时候有效
    cancel_job?: boolean
}


export interface FnQueueUrl {
    queue_name: string   // 处理队列
    url: string          // target url
    title?: string       // a href title
    inner_text?: string  // a href innerText
    inner_html?: string  // a href innerHtml (with polish)
    not_inc_depth?: boolean  // 不需要增加 深度 [比如: 一般对于翻页URL, 不需要增加页面的深度] default: false
}


export interface CrawlAddLogArgs {
    // 网页的 URL
    url: string,
    // 日志等级
    level: string,
    // 消息
    message: string,
    // 上下文
    context?: Record<string, any>
}


export interface LogRecord {
    level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'
    message: string
    context: Record<string, any> | null
}


/// 本地通知提示
export interface LocalNotificationOptions {
    /**
     * 通知的标题
     */
    title: string
    /**
     * 通知的内容
     */
    body: string
}

export interface EvaluateFuncType {
    /// 函数名
    name: string,
    /// 函数代码
    code: string,
    /// 函数参数
    args: Record<string, any>
}
