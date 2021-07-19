import {checkDomain, checkHumanCanView, getByText, sleep} from "../../shared/utils";
import {BindingSharedFunctions, FnExecArgs, TranslateArgs, TranslateResult} from "../../shared/dt";

export async function fn(
    args: FnExecArgs<TranslateArgs, TranslateResult, BindingSharedFunctions<TranslateResult>>
): Promise<void> {
    if (!checkDomain("fanyi.baidu.com")) {
        return
    }

    const fns = args.fns
    const fn_args = args.fn_args
    const timeout = Number(fn_args) || 30 * 1000

    /**
     * 自动关闭弹窗
     */
    async function autoClosePopup() {
        const close = document.querySelector('.desktop-guide-close') as HTMLElement
        if (close) {
            await fns.mouse_click(close)
        }
    }

    async function setLang(lang: string) {
        const lang_table = document.querySelector('.lang-table') as HTMLTableElement
        if (!checkHumanCanView(lang_table)) {
            throw new Error('lang table is not display')
        }

        const src_element = getByText(lang, lang_table)
        if (!src_element) {
            throw new Error(`${lang} 语言不存在`)
        }
        await fns.mouse_click(src_element)
    }

    async function setSrcLang() {
        const src_lang = document.querySelector('.select-from-language') as HTMLElement
        await fns.mouse_click(src_lang)

        await setLang(fn_args.src_lang)
    }

    async function setDstLang() {
        const to_lang = document.querySelector('.select-to-language') as HTMLElement
        await fns.mouse_click(to_lang)

        await setLang(fn_args.dst_lang)
    }

    async function setInputText() {
        const input = document.querySelector('#baidu_translate_input') as HTMLTextAreaElement
        if (!checkHumanCanView(input)) {
            throw new Error('input is not display')
        }
        input.value = fn_args.text
    }

    async function waitTranslate(): Promise<string> {
        const btn = document.querySelector('#translate-button') as HTMLButtonElement
        if (!btn) {
            throw new Error('翻译按钮没有找到')
        }

        if (!checkHumanCanView(btn)) {
            throw new Error("翻译按钮不可见")
        }
        await fns.mouse_click(btn)

        for (let t = timeout; t > 0; t = t - 20) {
            const out = (document.querySelector('.target-output') as HTMLElement)?.innerText?.trim() || ""
            if (out) {
                return out
            }

            await sleep(20)
        }
        return ""
    }

    try {
        await autoClosePopup()
        await setSrcLang()
        await setDstLang()
        await setInputText()
        const text = await waitTranslate()

        if (text) {
            await fns.data.set({
                result: {
                    src_lang: fn_args.src_lang,
                    src_text: fn_args.text,
                    dst_lang: fn_args.dst_lang,
                    dst_text: text,
                }
            })
        }
    } catch (e) {
        await fns.log.error(`exec failed: ${e.toString()}`)
    }
}
