import {DataType} from "./dt";
import {MonitorRuleViewBlock} from "../shared/dt";

/**
 * 对比函数
 */
export async function fn(v1: DataType | null, v2: DataType): Promise<MonitorRuleViewBlock[]> {
    if (v1 === v2) {
        return [];
    }
    return []
}
