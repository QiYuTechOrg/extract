import {FnExecArgs} from "../../shared/dt";

export async function fn(args: FnExecArgs): Promise<void> {
    const fns = args.fns
    await fns.data.set(args.fn_args)
}

