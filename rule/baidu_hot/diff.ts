import {DataType} from "./dt";

/**
 *
 * @param v1
 * @param v2
 */
let fn = (v1: DataType | null, v2: DataType): boolean => {
    return JSON.stringify(v1) !== JSON.stringify(v2)
}
