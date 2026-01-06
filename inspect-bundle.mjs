import { pathToFileURL } from 'url'
const mod = await import(pathToFileURL('./dist/pptxgen.bundle.js').href)
console.log('Export keys:', Object.keys(mod))
console.log('Default type:', typeof mod.default)
console.log('Has PptxGenJS:', !!mod.PptxGenJS)
console.log('Has pptxgen:', !!mod.pptxgen)
console.log('mod.default keys:', mod.default && Object.keys(mod.default))
