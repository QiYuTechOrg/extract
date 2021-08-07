import {CodeFnArgConfig, CodeFnQueueConfig} from "./gen/dt";


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
 * 搜索引擎返回的字段信息
 */
export interface KeywordSearchResult extends GenericEvalResult {
    /// 搜索引擎的名字 [必须有表示这个信息是那个搜索引擎产生的]
    se_name: string
    /// 搜索的关键字
    keyword: string

    /// 搜索结果
    search_result?: SearchResultData
    /// 函数的日志记录
    func_log?: LogRecord[]
}


/**
 * 智能抽取模式
 */
export interface ExtractSmartOptions {
}

/// return mode 需要移除
/// 我们根据 options 和解析类型来判断返回的数据类型
export type DataExtractReturnMode = "string" | "html"

/**
 * 链接的抽取规则
 */
export interface ExtractLinkOptions {
    /**
     * 必须是同一域名
     */
    same_host: boolean
    /**
     * 必须是同一目录(下级目录也可以)
     */
    same_dir: boolean
}

export type ExtractParseMode = "smart" | "link" | "value"

export interface ExtractValueOptions {
    inline_image: boolean
    inline_css: boolean
}

/**
 * 数据抽取参数
 */
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

/**
 * HTTP 请求参数
 */
export interface HttpCallArgs {
    url: string
    method: string
    form_data: Record<string, any>
    form_type?: 'json' | 'form'
}

/**
 * 文本比较参数
 */
export interface TextDiffArgs {
    t1: string
    t2: string
}

/**
 * 调用其他函数
 */
export interface FuncCallArgs {
    // 函数的名称
    fn_name: string
    // 函数的参数
    fn_args: Record<string, any>
}

/**
 * 抽取 URL 返回结果
 */
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


/**
 * 数据提取结果记录
 */
export interface StorageCrawlResultRecord {
    id: number

    /**
     * 访问的源 URL
     */
    url: string
    /**
     * 最终的 URL [一般跟 url 应该一样，除非 301/302 跳转]
     */
    final_url: string
    /**
     * 队列名称
     */
    queue_name: string

    link_depth: number
    /**
     * 获取到的数据
     */
    extract_data: string | Record<string, any>
    /**
     * HTML 源代码
     */
    html_raw: string

    snapshot_path: string | null
    rrweb_path: string | null
    video_path: string | null
    /**
     * 耗时
     * 单位:毫秒
     */
    consume: number

    /// 创建时间
    ctime: string
}

export interface BindingDbFunctions {
    /// 添加到队列中
    crawl_queue_add: (newUrl: FnQueueUrl) => Promise<boolean>
}

/**
 * 绑定的日志函数
 */
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

export interface BindingDataFunctions<DataType extends Record<string, any>> {
    set: (obj: DataType) => Promise<void>
    get: () => Promise<DataType>
}


export interface SnapshotV2Result {
    base64_img: string
    file_path?: string
}

export interface OnRequestArgs {
    req: {
        url: string
        failure: string | null
        headers: Record<string, string>,
        method: string,
        post_data: string | null
    },
    res: {
        status: number | null
        headers: Record<string, string>
        text: string
        data: Buffer
    }
}

export interface BindingSharedFunctions<DataType extends Record<string, any>> {
    /// 截图
    snapshot: (element: string | HTMLElement) => Promise<string | null>,
    /**
     * 截图 v2
     * @param element 截图的元素
     * @param save 是否保存到文件
     */
    snapshot_v2: (element: string | HTMLElement, save: boolean) => Promise<SnapshotV2Result>
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
    data: BindingDataFunctions<DataType>
    /// 本地通知
    notify: (args: LocalNotificationOptions) => Promise<boolean>
    /// 文本比较
    text_diff: (args: TextDiffArgs) => Promise<[number, string][]>
    /// 当网页发生请求的时候
    on_request: (callback: (data: OnRequestArgs) => Promise<void>) => Promise<void>
    // 自动提取页面内容
    auto_extract: () => Promise<Record<string, any>>
}

export interface BindingKeywordFunctions<DataType = Record<string, any>> extends BindingSharedFunctions<DataType> {
}

export interface BindingCrawlFunctions<DataType = Record<string, any>> extends BindingSharedFunctions<DataType> {
    /// 数据库相关的操作
    db: BindingDbFunctions,
}

/**
 * 监控运行时函数
 */
export interface BindingMonitorFunctions<DataType = Record<string, any>> extends BindingSharedFunctions<DataType> {
}

/**
 * 沙箱执行的函数
 * 代码管理 -> 实验室 -> PLAYGROUND
 * 沙箱的导出函数 应该具有所有运行环境的函数
 */
export interface BindingSandboxFunctions<DataType = Record<string, any>>
    extends BindingKeywordFunctions<DataType>,
        BindingCrawlFunctions<DataType>,
        BindingMonitorFunctions<DataType> {
}

/**
 *  函数执行的参数
 */
export interface FnExecArgs<ArgsType extends Record<string, any>, DataType, FnsType extends BindingSharedFunctions<DataType>> {
    /// 当前调用的函数 名称
    fn_name: string
    /// 函数的参数
    fn_args?: ArgsType
    /// 绑定的函数
    fns: FnsType
}


export interface MonitorExecResult {
    // 获取数据是否成功
    ok: boolean
}


/// 可以返回任意的值
/// 注意: 个别字段有特殊的含义
export interface FnExecResult extends Record<string, any> {
    /// 在运行数据抓取的时候有效
    cancel_job?: boolean
}


/**
 * 数据提取 URL 消息队列
 */
export interface FnQueueUrl {
    queue_name: string   // 处理队列
    url: string          // target url
    title?: string       // a href title
    inner_text?: string  // a href innerText
    inner_html?: string  // a href innerHtml (with polish)
    not_inc_depth?: boolean  // 不需要增加 深度 [比如: 一般对于翻页URL, 不需要增加页面的深度] default: false
}


/**
 * 数据提取添加日志参数
 */
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


/**
 * 日志记录
 */
export interface LogRecord {
    level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'
    message: string
    context: Record<string, any> | null
}


/**
 * 本地(操作系统)通知提示
 */
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


/**
 * 代码 index.json 配置文件的内容
 */
export interface CodeIndexJson {
    // 函数名
    name: string
    // 简介
    summary: string
    // 这个函数的参数配置
    fn_config?: CodeFnArgConfig[]
    // 这个函数产生的队列
    fn_queue?: CodeFnQueueConfig[]
}

