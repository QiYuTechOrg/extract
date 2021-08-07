import {BindingSandboxFunctions, FnExecArgs} from "../../shared/dt";

export async function fn(
    args: FnExecArgs<Record<string, never>, Record<string, any>, BindingSandboxFunctions>
): Promise<void> {
    const fns = args.fns
    const data = await fns.auto_extract || {failed: '没有数据'}
    await fns.data.set(data)
}

