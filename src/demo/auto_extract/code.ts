import {FnExecArgsV2} from "../../shared/dt_core";

export async function fn(
    args: FnExecArgsV2<Record<string, never>, Record<string, any>>
): Promise<void> {
    const fns = args.fns
    const data = await fns.auto_extract() || {failed: '没有数据'}
    await fns.data.set(data)
}

