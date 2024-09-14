// 用来创建一个DOCS(md文件)
// TODO: emit和插槽生成
import fs from 'fs'
import path from 'path'
import process from 'process';
import readline from 'readline';
// 获取要生成md文档的组件名
const compName = process.argv[2];
const dir = path.join('packages/components', compName)
const mdDir = path.join('docs/components', compName, 'base.md')
if (!fs.existsSync(path.join('docs/components', compName))) {
  fs.mkdirSync(path.join('docs/components', compName),{recursive: true})
}
let demoIndex = 0
// 示例模板
function demoModel(title,dir,desc) {
  title = title || 'demo' + demoIndex++
  return `
### ${title}
:::demo ${desc}
${compName}/${dir}
:::

`
}

// 属性模板
function propModel(name: string, desc: string, type: Function | Array<Function>, defaultValue:string | Function ='-') {
  let types = ''
  if (type instanceof Function) {
    types = type.name
  } else {
    types = type.map(_ => _.name).join('|')
  }
  if (typeof defaultValue === 'function') {
    defaultValue = JSON.stringify(defaultValue())
  }
  return `| ${name}              | ${desc}                                                             | ${types}                                          | ${defaultValue}       |
`
}

// 获取组件示例信息
async function getInfo(filePath) {
  return new Promise((res, rej) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath)
    })
    const info = {
      name: '',
      desc: ''
    }
    const infoLine = []
    let isInfo = false
    let count = 0
    rl.on('line', line => {
      if (count === 0 && line.includes('<!--')) {
        isInfo = true
      }else if (isInfo && line.includes('-->')) {
        rl.close()
      }else if (isInfo) {
        infoLine.push(line)
      } else if (line.includes('<template>')) {
        rl.close()
      }
      count++
    })
    rl.on('close', () => {
      const index = infoLine.findIndex(item => item.includes('@desc'))
      // [0-index)为name，[index,end]为desc
      let i = 0
      while(i < index) {
        info.name += infoLine[i]
        i++
      }
      while(i < infoLine.length) {
        info.desc += infoLine[i]
        i++
      }
      info.name = info.name.replace('@name:', '').trim()
      info.desc = info.desc.replace('@desc:', '').trim()
      res(info)
    })
  })
}

// 获取属性描述（attr,）
async function getAttrDesc(filePath, data) {
  return new Promise((res, rej) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath)
    })
    let type = 'props'
    const descQueue : Array<String> = []
    const regx = /'.*',/
    rl.on('line', line => {
      if (line.includes('Emits') && line.includes('export const')) {
        descQueue.splice(0)
        type = 'emits'
      }else if (line.includes('//')) {
        descQueue.push(line.trim().replace('//', ''))
      } else if(descQueue.length && type === 'props' && line.match(/.*:/) && line.includes('{')) {
        // 绑定到属性上
        const attr = line.trim().split(':')[0]
        data[type][attr].desc = descQueue.shift() ?? ''
      } else if (descQueue.length && type === 'emits' && regx.test(line)) {
        // const attr = line.trim().split(",")[1]
        // data[type][attr].desc = descQueue.shift() ?? ''
      }
    })
    rl.on('close', () => {
      res(true)
    })
  })
}
if (fs.existsSync(dir)) {
  try {
    console.log('-------------创建md文件----------')
    fs.writeFileSync(mdDir,`
# ${compName}

`)
    // 需要在组件示例头部添加注释
    // <!--
    //   @name: 组件名
    //   @desc: 测试标题输入框
    // -->
    // 不然按照'demo1','demo2'命名
    console.log('-------------生成组件示例----------')
    // 组件实例来自docs/examples/{filename}
    const examples = fs.readdirSync(path.join('docs/examples', compName))
    examples.forEach(async _ => {
      const filePath = path.join('docs/examples', compName, _)
      const filename = path.basename(filePath)
      // 获取name
      const info = await getInfo(filePath)
      const demo = demoModel(info.name,filename.split('.')[0],info.desc)
      fs.appendFileSync(mdDir,demo)
    })

    console.log('-------------获取组件属性----------')
    const attrPath = path.join(dir, `src/${compName}.ts`)
    const attr = await import(`../packages/components/${compName}/src/${compName}.ts`);
    const attrs = {
      props: [],
      emits: []
    }
    Object.keys(attr.default).forEach(key => {
      if (key.includes('Props')) {
        attrs.props = attr.default[key]
      } else if (key.includes('Emit')) {
        // attrs.emits = attr.default[key]
      }
    })
    // 获取描述
    if (fs.existsSync(attrPath)) {
      await getAttrDesc(attrPath, attrs)
      console.log('-------------生成props----------')
      fs.appendFileSync(mdDir, `#### ${compName}属性`)
      fs.appendFileSync(mdDir,`
| 属性名              | 说明                                                             | 类型                                                                            | 默认值 |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
`)
      Object.keys(attrs.props).forEach(_ => {
        const { default: defaultValue = '-', type, desc = '-'  } = attrs.props[_]
        fs.appendFileSync(mdDir,propModel(_, desc, type, defaultValue ))
      })
      console.log('-------------生成emit----------')
    } else {
      console.log('组件没有attr配置文件')
    }
  } catch (error) {
    console.log(error)
  }
} else {
  console.log('组件不存在')
}