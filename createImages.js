import fs from 'fs'
import { createCanvas } from 'canvas'
import { createSVGWindow } from 'svgdom'
import { SVG, registerWindow  } from '@svgdotjs/svg.js'
const width = 300;
const height = 300;

const window = createSVGWindow()
const document = window.document
registerWindow(window, document)


for (let i = 1; i <= 300; i++) {
	const canvas = createCanvas(width, height);
	// const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d'); 
	// Draw on the canvas

	// ctx.fillStyle = 'black';

	ctx.fillRect(0, 0, width, height);
	ctx.font = "25px serif";
	ctx.fillStyle = 'grey';
	ctx.fillText(`PNG Image ${i}`, 20, 50); 
	const out = fs.createWriteStream(`png/image${i}.png`)
	const stream = canvas.createPNGStream()
	stream.pipe(out)
	out.on('finish', () => console.log(`Image ${i} created`))


	const svg = SVG(); 
	svg.rect(300,300)
	svg.attr({style: 'width:300px;height:300px'})
	svg.plain('SVG Image: ' + i).fill({ color: 'gray'}).attr({x: '20', y: '50', style: 'font: 25px serif'})

	// Save the SVG file

	fs.writeFileSync(`svg/image${i}.svg`, svg.svg()); 
	console.log(`Image ${i} created`);
}