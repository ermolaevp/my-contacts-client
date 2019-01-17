const fs = require('fs')
const path = require('path')
const pluralize = require('pluralize')
const template = require('lodash/template')

const args = process.argv

const resource = args[2]

if (!resource) {
  process.exit('No resource')
}

const capitalize = str => str[0].toUpperCase() + str.slice(1)

const plural = pluralize(resource)
const singular = pluralize.singular(resource)

let templateMap = [
  ['actions.ts.tpl', `redux/actions/${plural}.ts`],
  ['epics.ts.tpl', `redux/epics/${plural}.ts`],
  ['epics.test.ts.tpl', `spec/redux/epics/${plural}.ts`],
  ['page.tsx.tpl', `pages/${plural}/index.tsx`],
  ['reducer.ts.tpl', `redux/reducers/${plural}.ts`],
]

templateMap = templateMap.map(([tpl, target]) => {
  return [
    path.resolve(__dirname, './templates/', tpl),
    path.resolve(__dirname, '../src/', target),
  ]
})

// check paths
templateMap.forEach(([tpl, target]) => {
  fs.accessSync(tpl, fs.constants.F_OK)
  const targetDir = path.dirname(target)
  try {
    fs.accessSync(targetDir, fs.constants.F_OK)
  } catch (error) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
})

const replacements = {
  plural,
  singular,
  Plural: capitalize(plural),
  Singular: capitalize(singular),
  PLURAL: plural.toLocaleUpperCase(),
  SINGULAR: singular.toUpperCase(),
}

templateMap.forEach(([tpl, target]) => {
  const tplString = fs.readFileSync(tpl, 'utf8')
  console.log(template(tplString)(replacements))
  fs.open(target, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST' /* todo: add here --force flag check */) {
        console.error('myfile already exists')
        return
      }

      throw err
    }
    fs.writeFile(target, tplString)
  })
})
