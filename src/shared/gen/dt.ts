// 这个文件由 https://code.qiyutech.tech/docs 自动生成
// 请不要使用手工修改

export interface AcListResp {
    data: string[] /* 自动补全列表 */
}

export interface BrowserAddResp {
    ok: boolean /* 添加成功 */
    reason?: string /* 失败的原因 */
}

export interface BrowserAddArgs {
    worker_name: string /* 工作进程名称 */
    browser_name: string /* 浏览器名称 */
    headless?: boolean /* headless模式 */
    adblock?: boolean /* 屏蔽广告 */
    proxy?: string /* HTTP代理 */
}

export interface BrowserDetailData {
    worker_name: string /* 工作进程名称 */
    browser_name: string /* 浏览器名称 */
    headless?: boolean /* headless模式 */
    adblock?: boolean /* 屏蔽广告 */
    proxy?: string /* HTTP代理 */
    username: string /* 用户 */
}

export interface BrowserAllResp {
    data: BrowserDetailData[] /* 数据 */
}

export interface CodeFnArgConfig {
    arg_name: string /* 参数名称 */
    arg_type: string /* 参数类型 */
    arg_value: string /* 参数默认值 */
    arg_help: string /* 帮助信息 */
}

export interface CrawlTaskV2Config {
    queue_name: string /* 队列名称 */
    fn_name: string /* 函数名 */
    fn_config?: CodeFnArgConfig[] /* 函数参数配置 */
}

export interface CrawlTaskGenericConfig {
    v2?: CrawlTaskV2Config[] /* V2配置 */
}

export interface CCTaskDetailData {
    task_name: string /* 任务名称 */
    task_config: CrawlTaskGenericConfig /* 数据提取配置 */
    task_desc: string /* 任务描述 */
    urls: string /* URL列表 */
    browser_name: string /* 浏览器名称 */
    concurrent?: number /* 并发 */
    cron_rule: string /* 定时规则 */
    page_timeout?: number /* 页面超时时间 */
    record_snapshot?: boolean /* 截图 */
    record_rrweb?: boolean /* RRWEB */
    record_video?: boolean /* 视频 */
    username: string /* 用户名 */
    cc_job_id: number /* 工作ID */
    pre_time?: string /* Pre Time */
    next_time: string /* Next Time */
    run_state: string /* 运行状态 */
    disable: boolean /* 禁用 */
    ctime: string /* 创建时间 */
}

export interface CCJobDetailData {
    username: string /* 用户名 */
    cc_name: string /* 持续提取任务名称 */
    cc_desc: string /* 持续提取任务描述 */
    task_list: CCTaskDetailData[] /* 任务列表 */
}

export interface CCJobTaskArgs {
    task_name: string /* 任务名称 */
    task_config: CrawlTaskGenericConfig /* 数据提取配置 */
    task_desc: string /* 任务描述 */
    urls: string /* URL列表 */
    browser_name: string /* 浏览器名称 */
    concurrent?: number /* 并发 */
    cron_rule: string /* 定时规则 */
    page_timeout?: number /* 页面超时时间 */
    record_snapshot?: boolean /* 截图 */
    record_rrweb?: boolean /* RRWEB */
    record_video?: boolean /* 视频 */
}

export interface CCJobAddArgs {
    cc_name: string /* 持续提取任务名称 */
    cc_desc: string /* 持续提取任务描述 */
    task_list: CCJobTaskArgs[] /* 任务列表 */
}

export interface CCJobDeleteResp {
    ok: boolean /* 删除成功 */
    reason?: string /* 原因 */
}

export interface CCJobDeleteArgs {
    cc_name: string /* 持续提取任务名称 */
}

export interface CCJobListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: CCJobDetailData[] /* 详细数据 */
}

export interface CCJobListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    cc_name?: string /* 搜索名称 */
}

export interface CCJobTotalResp {
    total: number /* 持续提取工作数量 */
}

export interface CCTaskAddResp {
    errno: number /* 错误码 */
    errmsg?: string /* 错误信息 */
    data: CCTaskDetailData /* 详细数据 */
}

export interface CCTaskAddArgs {
    task_name: string /* 任务名称 */
    task_config: CrawlTaskGenericConfig /* 数据提取配置 */
    task_desc: string /* 任务描述 */
    urls: string /* URL列表 */
    browser_name: string /* 浏览器名称 */
    concurrent?: number /* 并发 */
    cron_rule: string /* 定时规则 */
    page_timeout?: number /* 页面超时时间 */
    record_snapshot?: boolean /* 截图 */
    record_rrweb?: boolean /* RRWEB */
    record_video?: boolean /* 视频 */
    cc_name: string /* 工作名称 */
}

export interface CCTaskDeleteResp {
    ok: boolean /* 删除完成 */
    reason?: string /* Reason */
}

export interface CCTaskNameArgs {
    cc_name: string /* 工作名称 */
    task_name: string /* 任务名称 */
}

export interface CCTaskListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: CCTaskDetailData[] /* 详细数据 */
}

export interface CCTaskListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    cc_name?: string /* 工作名称 */
    task_name?: string /* 任务名称 */
}

export interface CCTaskTotalResp {
    total: number /* 持续提取工作任务数量 */
}

export interface CCTaskTotalArgs {
    cc_job_name: string /* 持续提取工作名称 */
}

export interface CodeFnQueueConfig {
    queue_name: string /* 队列名称 */
    queue_help: string /* 队列帮助信息 */
}

export interface CodeAddArgs {
    fn_name: string /* 函数名称 */
    fn_code: string /* 代码 */
    fn_summary: string /* 简述 */
    fn_detail: string /* 文档 */
    fn_mode?: string /* 模式 */
    fn_config?: CodeFnArgConfig[] /* 函数配置 */
    view_code?: string /* 视图代码 */
    fn_queue?: CodeFnQueueConfig[] /* 队列配置 */
}

export interface CodeDetailData {
    fn_name: string /* 函数名称 */
    fn_code: string /* 代码 */
    fn_summary: string /* 简述 */
    fn_detail: string /* 文档 */
    fn_mode?: string /* 模式 */
    fn_config?: CodeFnArgConfig[] /* 函数配置 */
    view_code?: string /* 视图代码 */
    fn_queue?: CodeFnQueueConfig[] /* 队列配置 */
    username: string /* 用户 */
}

export interface CodeListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: CodeDetailData[] /* 数据列表 */
}

export interface CodeListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    fn_name?: string /* 函数名称 */
}

export interface CodeTotalResp {
    total: number /* 数量 */
}

export interface CrawlFailureDetailData {
    username: string /* 用户 */
    task_name: string /* 数据获取任务名称 */
    dst_url: string /* URL */
    src_url: string /* 最终的URL */
    queue_name: string /* Queue Name */
    reason: string /* Reason */
    snapshot_path?: string /* Snapshot Path */
    rrweb_path?: string /* Rrweb Path */
    video_path?: string /* Video Path */
    consume: number /* Consume */
    ctime: string /* Ctime */
}

export interface CrawlFailureListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: CrawlFailureDetailData[] /* 数据 */
}

export interface CrawlFailureListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    crawl_name?: string /* 数据提取名称 */
    crawl_id?: number /* 数据提取ID */
}

export interface CrawlFailureTotalResp {
    errno: number /* 错误码 */
    errmsg: string /* 错误信息 */
    data?: number /* 数量 */
}

export interface CrawlFailureTotalArgs {
    crawl_name?: string /* 数据提取名称 */
    crawl_id?: number /* 数据提取ID */
}

export interface CrawlLogDetailData {
    username: string /* 用户 */
    task_name: string /* 数据获取任务名称 */
    url: string /* URL */
    level: string /* 日志等级 */
    message: string /* 日志消息 */
    context?: object /* 日志内容 */
    ctime: string /* 日志时间 */
}

export interface CrawlLogListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: CrawlLogDetailData[] /* 数据 */
}

export interface CrawlLogListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    crawl_id?: number /* 任务ID */
    crawl_name?: string /* 任务提取名称 */
}

export interface CrawlLogTotalResp {
    errno: number /* 错误码 */
    errmsg: string /* 错误信息 */
    data?: number /* 数量 */
}

export interface CrawlLogTotalArgs {
    crawl_id?: number /* 任务ID */
    crawl_name?: string /* 任务提取名称 */
}

export interface CrawlQueueDetailData {
    username: string /* 用户 */
    task_name: string /* 数据获取任务名称 */
    dst_url: string /* 目标URL */
    queue_name: string /* Queue Name */
    src_url?: string /* 源URL */
    link_depth?: number /* 深度 */
    link_title?: string /* Link Title */
    inner_text?: string /* ' */
}

export interface CrawlQueueListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: CrawlQueueDetailData[] /* 数据 */
}

export interface CrawlQueueListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    crawl_id?: number /* 数据提取任务ID */
    crawl_name?: string /* 任务提取名称 */
}

export interface CrawlQueueTotalResp {
    errno: number /* 错误码 */
    errmsg: string /* 错误信息 */
    data?: number /* 数量 */
}

export interface CrawlQueueTotalArgs {
    crawl_id?: number /* 数据提取任务ID */
    crawl_name?: string /* 任务提取名称 */
}

export interface CrawlSuccessDetailData {
    username: string /* 用户 */
    task_name: string /* 数据获取任务名称 */
    url: string /* URL */
    final_url: string /* 最终的URL */
    queue_name: string /* Queue Name */
    link_depth: number /* Link Depth */
    extract_data: string /* Extract Data */
    html_raw?: string /* Html Raw */
    snapshot_path?: string /* Snapshot Path */
    rrweb_path?: string /* Rrweb Path */
    video_path?: string /* Video Path */
    consume: number /* Consume */
    ctime: string /* Ctime */
}

export interface CrawlSuccessListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: CrawlSuccessDetailData[] /* 数据 */
}

export interface CrawlSuccessListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    crawl_id?: number /* 数据提取任务ID */
    crawl_name?: string /* 数据提取任务名称 */
}

export interface CrawlSuccessTotalResp {
    errno: number /* 错误码 */
    errmsg: string /* 错误信息 */
    data?: number /* 数量 */
}

export interface CrawlSuccessTotalArgs {
    crawl_id?: number /* 数据提取任务ID */
    crawl_name?: string /* 数据提取任务名称 */
}

export interface CrawlTaskDetailData {
    crawl_name: string /* 任务提取名称 */
    crawl_config: CrawlTaskGenericConfig /* 数据提取配置 */
    crawl_desc: string /* 抓取描述 */
    browser_name?: string /* 浏览器名称 */
    concurrent?: number /* 并发 */
    init_urls: string /* 初始URL列表 */
    depth_limit?: number /* 深度限制 */
    page_limit?: number /* 页面数量限制 */
    time_limit?: number /* 时间限制 */
    timeout?: number /* 每个页面的超时时间 */
    record_snapshot?: boolean /* 记录截图 */
    record_rrweb?: boolean /* 启用RRWeb */
    record_video?: boolean /* 视频 */
    crawl_id: number /* 数据提取ID */
    username: string /* 用户 */
    run_state: "init" | "start" | "stop" | "run" | "pause" | "done" /* 运行状态 */
    pause_reason: string /* 暂停原因 */
    run_page: number /* 已抓取 */
    run_time: number /* 耗时 */
    ctime: string /* 创建时间 */
}

export interface CrawlTaskAddArgs {
    crawl_name: string /* 任务提取名称 */
    crawl_config: CrawlTaskGenericConfig /* 数据提取配置 */
    crawl_desc: string /* 抓取描述 */
    browser_name?: string /* 浏览器名称 */
    concurrent?: number /* 并发 */
    init_urls: string /* 初始URL列表 */
    depth_limit?: number /* 深度限制 */
    page_limit?: number /* 页面数量限制 */
    time_limit?: number /* 时间限制 */
    timeout?: number /* 每个页面的超时时间 */
    record_snapshot?: boolean /* 记录截图 */
    record_rrweb?: boolean /* 启用RRWeb */
    record_video?: boolean /* 视频 */
}

export interface CrawlTaskListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: CrawlTaskDetailData[] /* 数据 */
}

export interface CrawlTaskListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    crawl_name?: string /* 数据提取任务 */
    crawl_id?: number /* 数据提取任务ID */
}

export interface CrawlTaskStartResp {
    start: boolean /* 是否启动 */
    reason?: string /* 失败原因 */
}

export interface CrawlTaskStartArgs {
    crawl_name?: string /* 数据提取任务 */
    crawl_id?: number /* 数据提取任务ID */
}

export interface WorkerStopCrawlResp {
    stop: boolean /* 暂停运行 */
    reason?: string /* 暂停失败的原因 */
}

export interface CrawlTaskStopArgs {
    crawl_name?: string /* 数据提取任务 */
    crawl_id?: number /* 数据提取任务ID */
}

export interface CrawlTaskTotalResp {
    total: number /* 数量 */
}

export interface MonitorLogDetailData {
    username: string /* Username */
    task_name: string /* 任务名称 */
    url: string /* Url */
    final_url: string /* Final Url */
    browser_name: string /* Browser Name */
    ctime: string /* Ctime */
    status: string /* Status */
    p_text: string /* P Text */
    rrweb?: string /* Rrweb */
    screenshot?: string /* Screenshot */
}

export interface MonitorLogListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: MonitorLogDetailData[] /* 数据 */
}

export interface MonitorLogListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    task_name: string /* 任务名称 */
}

export interface MonitorLogTotalResp {
    total: number /* 任务数量 */
}

export interface MonitorLogTotalArgs {
    task_name: string /* 任务名称 */
}

export interface MonitorTaskAddArgs {
    task_name: string /* 任务名称 */
    url: string /* 监控URL */
    browser_name: string /* 浏览器名称 */
    fn_name: string /* 代码 */
    cron_rule: string /* 定时任务 */
    fail_alert: number /* 失败告警 */
    fail_webhook: string /* 失败WebHook */
    success_webhook: string /* 成功WebHook */
    change_webhook: string /* 变化WebHook */
    record_log: boolean /* 记录日志 */
    record_snapshot: boolean /* 记录截图 */
    record_rrweb: boolean /* 记录RRWeb */
    record_pdf?: boolean /* 记录PDF */
    record_video?: boolean /* 视频录制 */
    timeout: number /* 超时时间 */
    enable: boolean /* 启用 */
}

export interface MonitorTaskDetailData {
    task_name: string /* 任务名称 */
    url: string /* 监控URL */
    browser_name: string /* 浏览器名称 */
    fn_name: string /* 代码 */
    cron_rule: string /* 定时任务 */
    fail_alert: number /* 失败告警 */
    fail_webhook: string /* 失败WebHook */
    success_webhook: string /* 成功WebHook */
    change_webhook: string /* 变化WebHook */
    record_log: boolean /* 记录日志 */
    record_snapshot: boolean /* 记录截图 */
    record_rrweb: boolean /* 记录RRWeb */
    record_pdf?: boolean /* 记录PDF */
    record_video?: boolean /* 视频录制 */
    timeout: number /* 超时时间 */
    enable: boolean /* 启用 */
    username: string /* 用户名 */
    pre_time?: string /* Pre Time */
    next_time?: string /* Next Time */
    status: string /* Status */
    http_code: number /* Http Code */
    fail_counter: number /* Fail Counter */
    pre_text: string /* Pre Text */
    cur_text: string /* Cur Text */
    cur_change: boolean /* Cur Change */
    cur_need_view: boolean /* Cur Need View */
    valid: boolean /* Valid */
}

export interface MonitorTaskListResp {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    data: MonitorTaskDetailData[] /* 数据 */
}

export interface MonitorTaskListArgs {
    page_no?: number /* 页数 */
    page_size?: number /* 分页大小 */
    task_name: string /* 任务名称 */
    only_need_view?: boolean /* 只显示未查看的 */
}

export interface MonitorTaskTotalResp {
    total: number /* 监控任务数量 */
}

export interface ProcessGetBrowserArgs {
    browser_id: number /* 浏览器ID */
}

export interface ProcessGetCodeArgs {
    code_id?: number /* 代码ID */
    username?: string /* 用户 */
    code_name?: string /* 函数名 */
}

export interface ProcessRegisterArgs {
    worker_name: string /* 工作进程的名称 */
    worker_url: string /* 工作进程的URL */
    worker_token: string /* 工作进程认证令牌 */
    worker_version: string /* 工作进程的版本 */
    worker_groups: string[] /* 工作进程的分组 */
}

export interface CCTaskAddUrlResp {
    add: boolean /* 是否添加 */
}

export interface CCAddUrlArgs {
    url: string /* 添加的URL */
    queue_name: string /* 队列名称 */
    src_url?: string /* Src Url */
    link_depth: number /* ' */
    link_title?: string /* Link Title */
    inner_text?: string /* Inner Text */
    cc_task_id: number /* 持续提取任务ID */
    add_if_before?: string /* 添加条件 */
}

export interface CCFailureAddResp {
    ok: boolean /* 是否成功 */
}

export interface CCFailureAddArgs {
    dst_url: string /* 目标URL */
    src_url: string /* 源URL */
    queue_name: string /* 队列名称 */
    snapshot_path?: string /* 截图文件 */
    rrweb_path?: string /* RRWeb文件 */
    pdf_path?: string /* PDF */
    video_path?: string /* 录屏 */
    consume: number /* 耗时 */
    reason: string /* 错误原因 */
    cc_task_id: number /* 持续提取任务ID */
}

export interface CCLogAddResp {
    ok: boolean /* 是否成功 */
}

export interface CCLogAddArgs {
    url: string /* URL */
    level: string /* 日志等级 */
    message: string /* 日志消息 */
    context?: object /* 上下文 */
    cc_task_id: number /* 持续提取任务ID */
}

export interface CCSuccessAddResp {
    ok: boolean /* 是否成功 */
}

export interface CCSuccessAddArgs {
    dst_url: string /* 目标URL */
    src_url: string /* 源URL */
    queue_name: string /* 队列名称 */
    snapshot_path?: string /* 截图文件 */
    rrweb_path?: string /* RRWeb文件 */
    pdf_path?: string /* PDF */
    video_path?: string /* 录屏 */
    consume: number /* 耗时 */
    extract_data: string /* 提取出来的数据 */
    cc_task_id: number /* 持续提取任务ID */
}

export interface CCQueueDetailData {
    username: string /* 用户名 */
    cc_job_id: number /* 工作ID */
    cc_task_id: number /* 任务ID */
    dst_url: string /* 访问URL */
    queue_name: string /* 队列名称 */
    src_url: string /* 来源URL */
    link_depth: number /* 链接深度 */
    link_title: string /* 链接标题 */
    inner_text: string /* 内部文本 */
    ctime: string /* 创建时间 */
}

export interface CCGetJobResp {
    data: CCQueueDetailData /* 详细数据 */
}

export interface CCGetJobArgs {
    cc_task_id: number /* 持续提取任务ID */
}

export interface CrawlAddUrlArgs {
    url: string /* 添加的URL */
    queue_name: string /* 队列名称 */
    src_url?: string /* Src Url */
    link_depth: number /* ' */
    link_title?: string /* Link Title */
    inner_text?: string /* Inner Text */
    crawl_id: number /* 数据提取任务ID */
}

export interface CrawlFailureAddResp {
    run_time: number /* 耗时 */
    run_page: number /* 页面数量 */
}

export interface CrawlFailureAddArgs {
    dst_url: string /* 目标URL */
    src_url: string /* 源URL */
    queue_name: string /* 队列名称 */
    snapshot_path?: string /* 截图文件 */
    rrweb_path?: string /* RRWeb文件 */
    pdf_path?: string /* PDF */
    video_path?: string /* 录屏 */
    consume: number /* 耗时 */
    reason: string /* 错误原因 */
    crawl_id: number /* 数据提取任务ID */
}

export interface CrawlLogAddArgs {
    url: string /* URL */
    level: string /* 日志等级 */
    message: string /* 日志消息 */
    context?: object /* 上下文 */
    crawl_id: number /* 任务ID */
}

export interface CrawlSuccessAddResp {
    run_time: number /* 耗时 */
    run_page: number /* 页面数量 */
}

export interface CrawlSuccessAddArgs {
    dst_url: string /* 目标URL */
    src_url: string /* 源URL */
    queue_name: string /* 队列名称 */
    snapshot_path?: string /* 截图文件 */
    rrweb_path?: string /* RRWeb文件 */
    pdf_path?: string /* PDF */
    video_path?: string /* 录屏 */
    consume: number /* 耗时 */
    extract_data: string /* 提取出来的数据 */
    crawl_id: number /* 数据提取任务ID */
    final_url: string /* 最终URL */
    link_depth: number /* 深度 */
}

export interface CrawlGetJobResp {
    data: CrawlQueueDetailData /* 任务数据 */
}

export interface CrawlGetJobArgs {
    crawl_id: number /* 数据提取任务ID */
}

export interface CrawlSetDoneArgs {
    crawl_id: number /* 数据提取任务ID */
}

export interface CrawlSetRunningArgs {
    crawl_id: number /* 数据提取任务ID */
    running: boolean /* 是否在运行中 */
}

export interface MonitorLogAddArgs {
    monitor_id: number /* 监控ID */
    url: string /* 监控URL */
    final_url: string /* 最终监控URL */
    status: string /* 状态 */
    p_text: string /* 最终结果 */
    rrweb: string /* Rrweb */
    screenshot: string /* Screenshot */
    success: boolean /* 监控是否成功 */
}

export interface CaptchaSettingData {
    server_url?: string /* 服务器的地址 */
    server_token?: string /* 服务器的Token */
}

export interface UserLoginResp {
    username?: string /* 用户名 */
}

export interface UserTokenResp {
    token: string /* 新的Token */
}

export interface LogRecord {
    level: "DEBUG" | "INFO" | "WARN" | "ERROR" /* 日志等级 */
    message: string /* 日志信息 */
    context?: object /* 上下文 */
}

export interface WorkerRunSandboxData {
    page_data?: object /* 返回的数据 */
    log_data?: LogRecord[] /* 日志记录 */
}

export interface WorkerRunSandboxResp {
    errno: number /* 错误码 */
    errmsg?: string /* 错误信息 */
    data?: WorkerRunSandboxData /* 返回结果 */
}

export interface VialSandboxRunCodeArgs {
    url: string /* 目标网页 */
    browser_name?: string /* 浏览器 */
    worker_name?: string /* 工作者 */
    timeout?: number /* 超时时间 */
    fn_config?: object /* 函数参数 */
    fn_code: string /* 运行的代码 */
}

export interface VialSandboxRunFuncArgs {
    url: string /* 目标网页 */
    browser_name?: string /* 浏览器 */
    worker_name?: string /* 工作者 */
    timeout?: number /* 超时时间 */
    fn_config?: object /* 函数参数 */
    fn_name: string /* 运行的函数 */
}

export interface WorkerRunCrawlResp {
    start: boolean /* 启动运行 */
    reason?: string /* 启动失败的原因 */
}

export interface WorkerRunCrawlArgs {
    crawl_id: number /* 数据提取任务ID */
    username: string /* 用户名 */
    crawl_name: string /* 任务名称 */
    crawl_config: CrawlTaskGenericConfig /* 任务配置 */
    browser_id?: number /* 浏览器ID */
    browser_name?: string /* 浏览器名称 */
    concurrent: number /* 并发 */
    init_urls: string /* 初始URL */
    depth_limit: number /* 深度限制 */
    run_page: number /* 运行页面 */
    run_time: number /* 已耗时 */
    page_limit: number /* 页面数量限制 */
    time_limit: number /* 时间限制 */
    timeout: number /* 页面执行时间 */
    record_snapshot: boolean /* 截图 */
    record_rrweb: boolean /* RRWEB记录 */
    record_video: boolean /* 录屏 */
}

export interface WorkerStopCrawlArgs {
    crawl_id: number /* 数据提取任务ID */
}

export interface WorkerRunMonitorResp {
    start: boolean /* 启动运行 */
    reason?: string /* 启动失败的原因 */
}

export interface WorkerRunMonitorArgs {
    monitor_id: number /* 监控任务ID */
    username: string /* 用户名 */
    task_name: string /* 任务名称 */
    url: string /* URL */
    browser_id?: number /* 浏览器名称 */
    code_id: number /* 代码ID */
    record_log: boolean /* 记录日志 */
    record_snapshot: boolean /* 截图 */
    record_rrweb: boolean /* RRWEB记录 */
    timeout: number /* 超时时间 */
}

export interface WorkerRunSandboxArgs {
    username: string /* 用户名 */
    url: string /* 目标网址 */
    browser_id?: number /* 浏览器ID */
    timeout?: number /* 超时时间 */
    fn_name: string /* 函数名称 */
    fn_code: string /* 函数代码 */
    fn_config?: object /* 函数参数配置 */
}

export interface WorkerBrowserRunLimit {
    limit: number /* 最大限制 */
    running: number /* 运行中 */
}

export interface WorkerStateResp {
    persistent: WorkerBrowserRunLimit /* persistent 浏览器限制 */
    incognito: WorkerBrowserRunLimit /* incognito 浏览器限制 */
}

