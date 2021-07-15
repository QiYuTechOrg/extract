import {BindingSharedFunctions} from "../../src/shared/dt";

/**
 * 获取 百度热搜 数据
 */
let fn = async (fns: BindingSharedFunctions) => {
    const ul = document.querySelector("#hotsearch-content-wrapper")
    if (!ul) {
        return;
    }

    const li_list = [...ul.querySelectorAll('[data-index]')]

    const items = li_list.map((li: HTMLLIElement) => {
        const title = li.querySelector('.title-content-title') as HTMLSpanElement
        return title?.innerText
    })

    await fns.data.set({items})
}
