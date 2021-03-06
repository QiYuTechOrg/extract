import {FnExecArgsV2} from "../../shared/dt_core";

export async function fn(
    args: FnExecArgsV2<Record<string, never>, Record<string, any>>
): Promise<void> {
    console.log(args)

    const fns = args.fns
    const data_img = await fns.snapshot(document.body)
    if (data_img) {
        console.log("v1 img data success:", {length: data_img.length})
    }

    const ret = await fns.snapshot_v2(document.body, true)
    await fns.data.set({file_path: ret?.file_path})
}

