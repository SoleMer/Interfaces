let canvas =  /** @type { HTMLcanvasElement} */ document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let imageData = ctx.createImageData(width, height);
let inputFile = document.getElementById('inputFile');
let btnBaW = document.getElementById('btn-baw');
let btnNeg = document.getElementById('btn-neg');
let btnSepia = document.getElementById('btn-sepia');
let btnCleanFilter = document.getElementById('btn-clean-filter');
let btnCleanCanvas = document.getElementById('btn-clean-canvas');

/* ------------- DRAW ---------------*/

pencil = document.getElementById("btn-pencil");
pencil.addEventListener("click", draw);
color = document.getElementById("color");
rangePencil = document.getElementById("rangePencil");
goma = document.getElementById("btn-goma");
goma.addEventListener("click", eraser);
rangeEraser = document.getElementById("rangoGoma");


function draw() {

    let isDrawing = false;
    let x = 0;
    let y = 0;
    canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });

    canvas.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            drawLine(color, rangePencil, ctx, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    });

    canvas.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            drawLine(color, rangePencil, ctx, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });

    function drawLine(color, rangePencil, context, x1, y1, x2, y2) {

        context.beginPath();
        context.strokeStyle = color.value;
        context.lineWidth = rangePencil.value;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }
}

function eraser() {
    let isEraser = false;
    let x = 0;
    let y = 0;
    canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isEraser = true;
    });

    canvas.addEventListener('mousemove', e => {
        if (isEraser === true) {
           eraserLine(rangeEraser, ctx, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    });

    canvas.addEventListener('mouseup', e => {
        if (isEraser === true) {
            eraserLine(rangeEraser, ctx, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });

    function eraserLine(rangeEraser, context, x1, y1, x2, y2) {

        context.beginPath();
        context.strokeStyle = 'white';
        context.lineWidth = rangeEraser.value;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }
}

/*-------------- FILTROS ---------------------*/

let aplicatedFilters = false;
let originalImage = ctx.createImageData(width, height);
let cantImg = 0;

inputFile.addEventListener('change', e => {
    showImage();
});

btnBaW.addEventListener('click', e => {
    filterBaW();
})

btnNeg.addEventListener('click', e => {
    filterNegative();
})

btnSepia.addEventListener('click', e => {
    filterSepia();
})

btnCleanFilter.addEventListener('click', e => {
    cleanFilter();
})

btnCleanCanvas.addEventListener('click', e=> {
    cleanCanvas();
})

function showImage() {
    if (cantImg != 0) {
        cleanCanvas();
    }
    var archivo = document.getElementById('inputFile').files[0];
    var reader = new FileReader();  //obtenemos el path de la imagen
    if (archivo) {  //si encontramos el archivo pasamos el source para empezar a dibujar
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            loadPicture(reader.result);
        }
    }
}

function loadPicture(source) {
    loadedImg = false;
    var image = new Image();
    image.src = source;
    loadedImg = true;
    if (image) { //si tenemos una imagen, esperamos a que cargue y la dibujamos en canvas
        image.onload = function () {
            let scale = Math.min(canvas.width / image.width, canvas.height / image.height);
            let x = (canvas.width / 2) - (image.width / 2) * scale;
            let y = (canvas.height / 2) - (image.height / 2) * scale;
            canvas.width = image.width * scale;
            canvas.height = image.height * scale;
            ctx.drawImage(image, 0, 0, image.width * scale, image.height * scale);
            imageData = ctx.getImageData(0, 0, image.width, image.height);
            ctx.putImageData(imageData, 0, 0);
            cantImg++;
        }
    }

};

function filterBaW() {
    comprobarFiltros();
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel
        for (let y = 0; y < image.height; y++) {
            let pixel = getPixel(image, x, y);  //obtenemos los valores de cada pixel y calculamos el promedio
            let prom = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3)
            //enviamos el promedio para setear los Bytes r, g y b con el promedio y el alpha en 255
            setPixel(image, x, y, prom, prom, prom, 255);
            
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

function filterNegative() {
    comprobarFiltros();
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel
        for (let y = 0; y < image.height; y++) {
            let pixel = getPixel(image, x, y);  //obtenemos los valores de cada pixel y se lo restamos a 255
            let r = 255 - pixel[0];
            let g = 255 - pixel[1];
            let b = 255 - pixel[2];
            setPixel(image, x, y, r, g, b, 255);
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

function filterSepia() {
    comprobarFiltros();
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel
        for (let y = 0; y < image.height; y++) {
            let pixel = getPixel(image, x, y);  //obtenemos los valores de cada pixel y 
            let r = (pixel[0] * 0.460 + pixel[1] * 0.470 + pixel[2] * 0.060) ;
            let g = (pixel[0] * 0.350 + pixel[1] * 0.425 + pixel[2] * 0.070) ;
            let b = (pixel[0] * 0.270 + pixel[1] * 0.135 + pixel[2] * 0.050) ;
            setPixel(image, x, y, r, g, b, 255);
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

//--------------- GET Y SET DE PIXEL --------------

function getPixel(imageData, x, y) {
    let index = (x + y * imageData.height) * 4;
    let r = imageData.data[index + 0];
    let g = imageData.data[index + 1];
    let b = imageData.data[index + 2];
    let a = imageData.data[index + 3];
    return [r, g, b, a];
}

function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.height) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

/**
 * ---------------- LIMPIAR FILTROS Y LIENZO ---------------------
 */

//al aplicarse el primer filtro a una imagen, se señala que tiene filtros aplicados y se guarda la imagen original (sin filtros)
function comprobarFiltros() {
    if (!aplicatedFilters) {
        saveOriginalImage();
        aplicatedFilters = true;
    }
}

//función que guarda la imagen original
function saveOriginalImage() {
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    originalImage = image;
}

//si la imagen tiene filtros aplicados, los borra y vuelve a mostrar la imagen como fue cargada originalmente
function cleanFilter() {
    if (aplicatedFilters) {
        let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
        image = originalImage;
        ctx.putImageData(image, 0, 0) * 4;
        aplicatedFilters = false;
        originalImage = ctx.createImageData(width, height);
    }
}

//se borra todo el lienzo y se deja como al inicio
function cleanCanvas() {
    canvas.width = width;
    canvas.height = height;
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel
        for (let y = 0; y < image.height; y++) {
            setPixel(image, x, y, 255, 255, 255, 255);
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
    aplicatedFilters = false;
    originalImage = ctx.createImageData(width, height);
}


