import * as fs from "fs";

const need_convert = [
    "./src/baidu/code.js",
];


need_convert.map((file) => {
    const in_code = fs.readFileSync(file, {encoding: 'utf-8'});

    const out_code = `
let fn = async (args) {
    const exports = ${in_code};

    return await exports.fn(args);
}
    `;

    fs.writeFileSync(file, out_code);
});
