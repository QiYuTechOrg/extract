import {FnExecArgsV2, FnExecResult} from "../shared/dt_core";

/**
 * 获取 百度热搜 数据
 */
export async function fn(args: FnExecArgsV2<Record<string, never>, { items: string[] }>): Promise<FnExecResult> {
    const fns = args.fns;

    const ul = document.querySelector("#hotsearch-content-wrapper")
    if (!ul) {
        return;
    }

    const li_list = [...ul.querySelectorAll('[data-index]')]

    const items = li_list.map((li: HTMLLIElement) => {
        const title = li.querySelector('.title-content-title') as HTMLSpanElement
        return title?.innerText
    }).filter(Boolean)

    await fns.data.set({items})
}
