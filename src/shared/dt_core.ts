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
 * HTTP 请求参数
 */
export interface HttpCallArgs {
    url: string
    method: string
    form_data: Record<string, any>
    form_type?: 'json' | 'form'
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
        data: ArrayBuffer
    }
}

export interface SnapshotV2Result {
    base64_img: string
    file_path?: string
}

/**
 * 文本比较参数
 */
export interface TextDiffArgs {
    t1: string
    t2: string
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

export interface BindingDbFunctions {
    /// 添加到队列中
    crawl_queue_add: (newUrl: FnQueueUrl) => Promise<boolean>
}

/**
 * 绑定的所有函数
 */
export interface BindingAllFunctions<DataType = Record<string, any>> extends BindingSharedFunctions<DataType> {
    /// 数据库相关的操作
    db: BindingDbFunctions,
}

/**
 *  函数执行的参数
 */
export interface FnExecArgsV2<ArgsType extends Record<string, any>, DataType> {
    /// 当前调用的函数 名称
    fn_name: string
    /// 函数的参数
    fn_args?: ArgsType
    /// 绑定的函数
    fns: BindingAllFunctions<DataType>
}

/// 可以返回任意的值
/// 注意: 个别字段有特殊的含义
export interface FnExecResult extends Record<string, any> {
    /// 在运行数据抓取的时候有效
    cancel_job?: boolean
}
