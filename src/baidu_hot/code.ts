import {BindingMonitorFunctions, FnExecArgs} from "../shared/dt";

/**
 * 获取 百度热搜 数据
 */
export async function fn(
    args: FnExecArgs<Record<string, never>, { items: string[] }, BindingMonitorFunctions<{ items: string[] }>>
) {
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
