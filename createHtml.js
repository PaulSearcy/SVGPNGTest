import { JSDOM } from "jsdom"
import fs from 'fs'
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`)

const document = dom.window.document

const pngHtml = ''
const svgHtml = ''

const main = async () => {
	await fs.promises.readdir('png').then(files => files.forEach(file => document.body.insertAdjacentHTML('beforeend', `<img src="png/${file}">`)))
	await fs.promises.writeFile('pngHtml.html', document.documentElement.outerHTML)

	document.body.innerHTML = ''

	await fs.promises.readdir('svg').then(files => 
		files.forEach(file => {
			let text = fs.readFileSync(`svg/${file}`, 'utf-8')
			document.body.insertAdjacentHTML('beforeend', text)
		})
	)
	await fs.promises.writeFile('svgHtml.html', document.documentElement.outerHTML)
}

main()