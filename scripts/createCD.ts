// 快速创建一个组件demo
// TODO: 生成路由
import { execSync } from "child_process";
import process from "process";
const fileName = process.argv[2];
try{
  const comp = execSync('pnpm run create:comp ' + fileName)
  console.log(comp.toString())
  const docs = execSync('pnpm run create:docs ' + fileName)
  console.log(docs.toString())
} catch(e) {
  console.log(e)
}