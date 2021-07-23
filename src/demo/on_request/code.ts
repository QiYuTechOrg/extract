import {BindingSandboxFunctions, FnExecArgs} from "../../shared/dt";
import {sleep} from "../../shared/utils";

export async function fn(
    args: FnExecArgs<Record<string, never>, Record<string, any>, BindingSandboxFunctions>
): Promise<void> {
    const fns = args.fns


    const url_list = [];
    await fns.on_request(async (data) => {
        console.log(data)

        url_list.push(data.req.url)
    })

    await sleep(10_000)
    await fns.data.set({url_list: url_list})
}

