import {FnQueueUrl} from "./dt";

/**
 * 检测是否为数字
 * @param s
 */
export function checkIfNumber(s: string) {
    return !isNaN(parseInt(s));
}

/**
 * 检测元素是否可以被人类看见
 * @param e
 */
export function checkHumanCanView(e: HTMLElement): boolean {
    if (e.style.display === 'none' || e.style.visibility === 'hidden') {
        console.log("element ", e, " is hidden")
        return false;
    }
    const rect = e.getBoundingClientRect();
    if (rect.width < 6 || rect.height < 6) {
        console.log("element ", e, " is too small")
        return false;
    }

    return true;
}

/**
 * 检测域名后缀
 * @param domain
 */
export function checkDomain(domain: string): boolean {
    return document.location.hostname.endsWith(domain)
}


/**
 * 删除 obj 中的空元素
 * @param obj
 */
export function removeObjectEmptyValue(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => Boolean(v))
    );
}


/**
 * 检测 URL 是否跟当前的页面是同一个域名
 * @param url
 */
export function checkSameDomain(url: string): boolean {
    try {
        const u = new URL(url);
        const location = document.location;

        return u.host === location.host;
    } catch (e) {
        console.log(`invalid url: ${url}, error: `, e)
        return false;
    }
}


/**
 * 把多个链接转换成 消息队列
 * @param as
 * @param queue_name
 */
export function convertHrefsToQueue(
    as: HTMLAnchorElement[], {queue_name}: { queue_name: string }
): FnQueueUrl[] {
    return as.map((a): FnQueueUrl => {
        return {
            queue_name: queue_name,
            url: a.href,
            title: a.title,
            inner_text: a.innerText,
            inner_html: a.innerHTML,
        }
    })
}
