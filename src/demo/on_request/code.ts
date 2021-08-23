import {sleep} from "../../shared/utils";
import {FnExecArgsV2} from "../../shared/dt_core";

export async function fn(
    args: FnExecArgsV2<Record<string, never>, Record<string, any>>
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

