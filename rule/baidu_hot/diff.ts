import {DataType} from "./dt";

/**
 *
 * @param v1
 * @param v2
 */
let fn = async (v1: DataType | null, v2: DataType): Promise<boolean> => {
    return JSON.stringify(v1) !== JSON.stringify(v2)
}
