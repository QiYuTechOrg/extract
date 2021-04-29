import {checkHumanCanView, checkSameDomain, convertHrefsToQueue} from "../shared/utils";
import {FnExecArgs, FnExecResult, FnQueueUrl} from "../shared/dt";

let fn = async function (args: FnExecArgs): Promise<FnExecResult> {
    /// 检测是否为 腾讯新闻页面
    const allow_host = new Set(["news.qq.com", "new.qq.com"]);
    if (allow_host.has(document.location.host) === false) {
        return null;
    }

    const TOP_LIST_QUEUE = 'top';
    const HOT_QUEUE = "hot"

    // 今日要问
    function extractTopList(): FnQueueUrl[] {
        const topList = document.querySelector(".top-list")
        if (!topList) {
            return []
        }

        const news = [...topList.querySelectorAll('a')];

        return convertHrefsToQueue(
            news.filter((a: HTMLAnchorElement) => {
                return checkHumanCanView(a)
            }),
            {queue_name: TOP_LIST_QUEUE}
        )
    }


    // 热点精选
    function extractHot(): FnQueueUrl[] {
        const jx = document.querySelector('.jx-tit')?.nextElementSibling;
        if (!jx) {
            return [];
        }

        const urls = [...jx.querySelectorAll('.detail > h3 > a')]
            .filter((a: HTMLAnchorElement) => {
                return checkHumanCanView(a)
            }) as HTMLAnchorElement[];

        return convertHrefsToQueue(urls, {queue_name: HOT_QUEUE})
    }

    function extractNewsContent(): Record<string, string> {
        if (document.location.host !== 'new.qq.com') {
            return {}
        }

        const left_stick_wp = document.querySelector('.left-stick-wp');
        if (!left_stick_wp) {
            return {}
        }

        const datetime = (left_stick_wp.querySelector('.year') as HTMLElement)?.innerText +
            "/" + (left_stick_wp.querySelector('.md') as HTMLElement)?.innerText +
            " " + (left_stick_wp.querySelector('.time') as HTMLElement)?.innerText


        const author = (left_stick_wp.querySelector(".author > div") as HTMLElement)?.innerText;
        const title = document.querySelector('h1')?.innerText || "";
        const content = document.querySelector('.content-article')?.innerHTML;


        return {
            time: datetime,
            title: title,
            author: author,
            content: content,
        }
    }


    return {
        queue_url: [...extractTopList(), ...extractHot()],
        data: extractNewsContent(),
    }
}
