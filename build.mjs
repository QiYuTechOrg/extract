import * as fs from "fs";
import {parse} from "@babel/parser";
import * as bg from "@babel/generator";


const utilsCode = fs.readFileSync("src/shared/utils.js", {encoding: 'utf8'});

const utilsNode = parse(utilsCode, {sourceType: "module"});


/// 如果 src 目录中的 *.ts 文件 有 import 语句
/// 则自动添加 shared/utils 中的所有函数到 编译生成之后的 js 文件中
/// 这样多个脚本可以共享相同的逻辑
fs.readdirSync("src")
    .map((dir_name) => {
        const full_path = `src/${dir_name}/code.js`;
        if (!fs.existsSync(full_path)) {
            console.log(`${full_path} is not exists(ignored)!`)
            return;
        }
        const code = fs.readFileSync(full_path, {encoding: "utf-8"})
        const ast = parse(code, {sourceType: "module"})

        const body = ast.program.body;
        if (body.length === 1) {
            /// 没有 import 导入语句，我们什么都不需要做
            return;
        }

        console.assert(body.length === 2, "只能有两个节点");

        let importNode = body[0];
        console.assert(importNode.type === "ImportDeclaration")

        /** @type {ExportNamedDeclaration[]} utilsBody */
        const utilsBody = utilsNode.program.body
        /** @type {FunctionDeclaration[]} fnDecls */
        const fnDecls = utilsBody.map((node) => {
            return node.declaration;
        })

        ast.program.body = [body[1]];

        const fnNode = body[1];
        const fnBody = fnNode.declarations[0].init.body

        fnBody.body = [...fnDecls, ...fnBody.body];

        const newCode = bg.default.default(ast, {})

        fs.writeFileSync(full_path, newCode.code, {encoding: 'utf8'})
    })
