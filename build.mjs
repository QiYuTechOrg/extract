import * as fs from "fs";
import * as child_process from "child_process";
import * as path from "path";


const argv = process.argv.slice(2);

if (argv.length === 0) {
    console.log(`node build.mjs input-ts-file.ts ...`);
    return;
}


argv.map((ts_file) => {
    console.log('处理: ', ts_file, " ...");

    const dir_name = path.dirname(ts_file);
    const base_name = path.basename(ts_file);
    const js_file = `${dir_name}/${base_name.slice(0, base_name.length - 3)}.js`;

    child_process.execFileSync("yarn",
        ["rollup", "-i", ts_file, "-f", "iife", "-p", "typescript", "-d", dir_name],
    );


    const in_code = fs.readFileSync(js_file, {encoding: 'utf-8'});

    const out_code = `
let fn = async function (args) {
    const exports = ${in_code}

    return await exports.fn(args);
}
`;

    fs.writeFileSync(js_file, out_code);
    console.log('处理: ', ts_file, " 完成");
});
