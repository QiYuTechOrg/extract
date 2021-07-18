import * as fs from "fs";
import * as child_process from "child_process";

const argv = process.argv.slice(2);

if (argv.length === 0) {
    console.log(`node watch.mjs watch-file

这个脚本可以在开发的时候使用，当检测到指定的 *.ts 文件发生变化的时候
则自动使用 rollup 编译出新的代码
`);
    process.exit(1);
}

const watch_file = argv[0];

fs.watchFile(watch_file, () => {
    child_process.execSync(`node build.mjd "${watch_file}"`);
});
