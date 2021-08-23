import {FnExecArgsV2} from "../../shared/dt_core";

export async function fn(
    args: FnExecArgsV2<Record<string, never>, Record<string, any>>
): Promise<void> {
    const fns = args.fns
    await fns.data.set(args.fn_args)
}

