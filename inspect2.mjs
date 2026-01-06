import jszip from 'jszip'
import { pathToFileURL } from 'url'

globalThis.JSZip = jszip.default || jszip
console.log('global JSZip set:', !!globalThis.JSZip)

const mod = await import(pathToFileURL('./dist/pptxgen.bundle.js').href)
console.log('Export keys:', Object.keys(mod))
console.log('Default type:', typeof mod.default)
console.log('Has PptxGenJS:', !!mod.PptxGenJS)
console.log('Has pptxgen:', !!mod.pptxgen)
console.log('mod.default keys:', mod.default && Object.keys(mod.default))

function resolveConstructor(mod) {
    if (!mod) return null
    if (typeof mod === 'function') return mod
    if (mod.default && typeof mod.default === 'function') return mod.default
    if (mod.pptxgen && typeof mod.pptxgen === 'function') return mod.pptxgen
    if (mod.PptxGenJS && typeof mod.PptxGenJS === 'function') return mod.PptxGenJS
    for (const key of Object.keys(mod)) {
        if (typeof mod[key] === 'function') return mod[key]
    }
    return null
}

const Ctor = resolveConstructor(mod)
console.log('Resolved constructor:', !!Ctor, typeof Ctor)
if (Ctor) {
    const inst = new Ctor()
    console.log('Instance keys:', Object.keys(inst))
    console.log('Has addSlide:', typeof inst.addSlide)
    console.log('Prototype keys:', Object.getOwnPropertyNames(Object.getPrototypeOf(inst)))
}
