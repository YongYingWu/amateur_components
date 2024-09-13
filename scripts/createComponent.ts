// 用来创建一个组件模板结构
import fs from 'fs'
import path from 'path'
import process from 'process';
// 获取生成的组件名
const fileName = process.argv[2];
const dir = path.join('packages/components', fileName)

const templateBase = 'template/components/'
// 模板所在的路径
const templateVue = templateBase +  'src/template.vue'
const templateTs = templateBase +  'src/template.ts'
const templateScss = templateBase +  'styles/index.scss'
const templateIndex = templateBase +  'index.ts'
const templateCommon = 'template/examples/common.vue'

// 用来替换
function replaceTmp(str) {
  str = str.replaceAll('<template>', '<FFCS_2024>' )
  str = str.replaceAll('</template>', '</FFCS_2024>')
  str = str.replaceAll('template', fileName)
  str = str.replaceAll('Template', fileName)
  str = str.replaceAll('<FFCS_2024>', '<template>' )
  str = str.replaceAll('</FFCS_2024>', '</template>')
  return str
}
if (fs.existsSync(dir)) {
  console.error('组件已存在')
} else {
  try {
    console.log('-------------创建组件模板---------')
    fs.mkdirSync(dir, {recursive: true})
    fs.mkdirSync(path.join(dir,'/src'))
    // 创建src .vue文件
    console.log('-------------创建vue文件----------')
    const tmpVue = fs.readFileSync(templateVue, 'utf8')
    fs.writeFileSync(path.join(dir,`/src/${fileName}.vue`),replaceTmp(tmpVue))

    // 创建ts文件，存放prop和emit
    console.log('-------------创建ts文件----------')
    const tmpTs = fs.readFileSync(templateTs, 'utf8')
    fs.writeFileSync(path.join(dir,`/src/${fileName}.ts`),replaceTmp(tmpTs))

    // 创建index文件，导出vue文件
    console.log('-------------创建index文件----------')
    const tmpIndex = fs.readFileSync(templateIndex, 'utf8')
    fs.writeFileSync(path.join(dir,'/index.ts'),replaceTmp(tmpIndex))

    // 创建scss文件
    console.log('-------------创建scss文件----------')
    fs.mkdirSync(path.join(dir,'/styles'))
    fs.createReadStream(templateScss).pipe(fs.createWriteStream(path.join(dir,'/styles/index.scss')))

    // 创建examples文件
    console.log('-------------创建examples文件----------')
    fs.mkdirSync(path.join('docs/examples', fileName))
    const commonVue = fs.readFileSync(templateCommon, 'utf8')
    fs.writeFileSync(path.join('docs/examples', fileName,'common.vue'),replaceTmp(commonVue))
    console.log('--------------创建成功----------')
  } catch (e) {
    console.error(e)
  }
}
// fs.mkdirSync(dir+'sb.js', {recursive: true},)
