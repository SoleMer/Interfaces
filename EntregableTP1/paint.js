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
let btnBlur = document.getElementById('btn-blur');
let btnSCR = document.getElementById('btn-scr');
let btnSCG = document.getElementById('btn-scg');
let btnSCB = document.getElementById('btn-scb');
let btnSobel = document.getElementById('btn-sobel');

/* ------------- DRAW ---------------*/
let color = document.getElementById("color");
let rangePencil = document.getElementById("rangePencil");
let rubber = document.getElementById("btn-rubber");
let pencil = document.getElementById("btn-pencil");
let rangeRubber = document.getElementById("rangeRubber");


pencil.addEventListener("click", e => {
    draw(true);
});

rubber.addEventListener("click", e => {
    draw(false);
});



function draw(isPencil) {

    let isDrawing = false;
    let x = 0;
    let y = 0;

    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('mouseenter', mouseEnter);
    canvas.addEventListener('mouseleave', mouseLeave);

    function mouseLeave(e) {
        x = 0;
        y = 0;
    }

    function mouseEnter(e) {
        if (isDrawing === true) {
            x = e.offsetX;
            y = e.offsetY;
        }
    }

    function mouseUp(e) {
        if (isDrawing === true) {
            drawLine(x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
        canvas.removeEventListener('mousedown', mouseDown);
        canvas.removeEventListener('mousemove', mouseMove);
        canvas.removeEventListener('mouseup', mouseUp);
        canvas.removeEventListener('mouseenter', mouseEnter);
        canvas.removeEventListener('mouseleave', mouseLeave);
    }
    function mouseDown(e) {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    }

    function mouseMove(e) {
        if (isDrawing === true) {
            drawLine(x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    }
    function drawLine(x1, y1, x2, y2) {

        ctx.beginPath();
        ctx.lineCap = "round";
        if (isPencil) {
            ctx.strokeStyle = color.value;
            ctx.lineWidth = rangePencil.value;

        }
        else {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = rangeRubber.value;

        }
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
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

btnSCR.addEventListener('click', e => {
    filterSplashColorRed();
})

btnSCG.addEventListener('click', e => {
    filterSplashColorGreen();
})

btnSCB.addEventListener('click', e => {
    filterSplashColorBlue();
})

btnBlur.addEventListener('click', e => {
    filterBlur();
})

btnSobel.addEventListener('click', e => {
    filterSobel();
})

btnCleanFilter.addEventListener('click', e => {
    cleanFilter();
})

btnCleanCanvas.addEventListener('click', e => {
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
            let pixel = getPixel(image, x, y);  //obtenemos los valores de cada pixel y lo multiplicamos por los valores necesarios en cada caso
            let r = (pixel[0] * 0.460 + pixel[1] * 0.470 + pixel[2] * 0.060);
            let g = (pixel[0] * 0.350 + pixel[1] * 0.425 + pixel[2] * 0.070);
            let b = (pixel[0] * 0.270 + pixel[1] * 0.135 + pixel[2] * 0.050);
            setPixel(image, x, y, r, g, b, 255);
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

function filterSplashColorRed() {
    comprobarFiltros();
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel
        for (let y = 0; y < image.height; y++) {
            let pixel = getPixel(image, x, y);  //obtenemos los valores de cada pixel y calculamos el promedio
            if (pixel[0] > pixel[1] && pixel[0] > pixel[2] && pixel[1] < 100) {
                setPixel(image, x, y, pixel[0], pixel[1], pixel[2], 255);
            } else {
                let prom = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3)
                //enviamos el promedio para setear los Bytes r, g y b con el promedio y el alpha en 255
                setPixel(image, x, y, prom, prom, prom, 255);
            }
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

function filterSplashColorGreen() {
    comprobarFiltros();
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel
        for (let y = 0; y < image.height; y++) {
            let pixel = getPixel(image, x, y);  //obtenemos los valores de cada pixel y calculamos el promedio
            if (pixel[1] > pixel[0] && pixel[1] > pixel[2]) {
                setPixel(image, x, y, pixel[0], pixel[1], pixel[2], 255);
            } else {
                let prom = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3)
                //enviamos el promedio para setear los Bytes r, g y b con el promedio y el alpha en 255
                setPixel(image, x, y, prom, prom, prom, 255);
            }
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

function filterSplashColorBlue() {
    comprobarFiltros();
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel
        for (let y = 0; y < image.height; y++) {
            let pixel = getPixel(image, x, y);  //obtenemos los valores de cada pixel y calculamos el promedio
            if (pixel[2] > pixel[0] && pixel[2] > pixel[1]) {
                setPixel(image, x, y, pixel[0], pixel[1], pixel[2], 255);
            } else {
                let prom = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3)
                //enviamos el promedio para setear los Bytes r, g y b con el promedio y el alpha en 255
                setPixel(image, x, y, prom, prom, prom, 255);
            }
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

function filterBlur() {
    comprobarFiltros();
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    let r = 0;
    let g = 0;
    let b = 0;
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel contemplando las posibilidades
        if (x === 0) {      //limitamos la cantidad de comprobaciones que se debe hacer en cada caso
            for (let y = 0; y < image.height; y++) {
                if (y === 0) {    //en cada caso particular, obtenemos el promedio de los valores vecinos a la posición actual
                    let xy1 = getPixel(originalImage, x, y + 1);
                    let x1y = getPixel(originalImage, x + 1, y);
                    let x1y1 = getPixel(originalImage, x + 1, y + 1);
                    r = (xy1[0] + x1y[0] + x1y1[0]) / 3;
                    g = (xy1[1] + x1y[1] + x1y1[1]) / 3;
                    b = (xy1[2] + x1y[2] + x1y1[2]) / 3;
                } else if (y === image.height - 1) {
                    let xy0 = getPixel(originalImage, x, y - 1);
                    let x1y = getPixel(originalImage, x + 1, y);
                    let x1y0 = getPixel(originalImage, x + 1, y - 1);
                    r = (xy0[0] + x1y[0] + x1y0[0]) / 3;
                    g = (xy0[1] + x1y[1] + x1y0[1]) / 3;
                    b = (xy0[2] + x1y[2] + x1y0[2]) / 3;
                } else {
                    let xy0 = getPixel(originalImage, x, y - 1);
                    let x1y0 = getPixel(originalImage, x + 1, y - 1);
                    let x1y = getPixel(originalImage, x + 1, y);
                    let x1y1 = getPixel(originalImage, x + 1, y + 1);
                    let xy1 = getPixel(originalImage, x, y + 1);
                    r = (xy0[0] + x1y0[0] + x1y[0] + x1y1[0] + xy1[0]) / 5;
                    g = (xy0[1] + x1y0[1] + x1y[1] + x1y1[1] + xy1[1]) / 5;
                    b = (xy0[2] + x1y0[2] + x1y[2] + x1y1[2] + xy1[2]) / 5;
                }
                setPixel(image, x, y, r, g, b, 255);
            }
        } else if (x === image.width - 1) {
            for (let y = 0; y < image.height; y++) {
                if (y === 0) {
                    let x0y = getPixel(originalImage, x - 1, y);
                    let x0y1 = getPixel(originalImage, x - 1, y + 1);
                    let xy1 = getPixel(originalImage, x, y + 1);
                    r = (x0y[0] + x0y1[0] + xy1[0]) / 3;
                    g = (x0y[1] + x0y1[1] + xy1[1]) / 3;
                    b = (x0y[2] + x0y1[2] + xy1[2]) / 3;
                } else if (y === image.height - 1) {
                    let x0y = getPixel(originalImage, x - 1, y);
                    let x0y0 = getPixel(originalImage, x - 1, y - 1);
                    let xy0 = getPixel(originalImage, x, y - 1);
                    r = (x0y[0] + x0y0[0] + xy0[0]) / 3;
                    g = (x0y[1] + x0y0[1] + xy0[1]) / 3;
                    b = (x0y[2] + x0y0[2] + xy0[2]) / 3;
                } else {
                    let xy0 = getPixel(originalImage, x, y - 1);
                    let x0y0 = getPixel(originalImage, x - 1, y - 1);
                    let x0y = getPixel(originalImage, x - 1, y);
                    let x0y1 = getPixel(originalImage, x - 1, y + 1);
                    let xy1 = getPixel(originalImage, x, y + 1);
                    r = (xy0[0] + x0y0[0] + x0y[0] + x0y1[0] + xy1[0]) / 5;
                    g = (xy0[1] + x0y0[1] + x0y[1] + x0y1[1] + xy1[1]) / 5;
                    b = (xy0[2] + x0y0[2] + x0y[2] + x0y1[2] + xy1[2]) / 5;
                }
                setPixel(image, x, y, r, g, b, 255);
            }
        } else {
            for (let y = 0; y < image.height; y++) {
                if (y === 0) {
                    let xy0 = getPixel(originalImage, x, y - 1);
                    let x0y1 = getPixel(originalImage, x - 1, y + 1);
                    let xy1 = getPixel(originalImage, x, y + 1);
                    let x1y1 = getPixel(originalImage, x + 1, y + 1);
                    let x1y = getPixel(originalImage, x + 1, y);
                    r = (xy0[0] + x1y1[0] + x1y[0] + x0y1[0] + xy1[0]) / 5;
                    g = (xy0[1] + x1y1[1] + x1y[1] + x0y1[1] + xy1[1]) / 5;
                    b = (xy0[2] + x1y1[2] + x1y[3] + x0y1[2] + xy1[2]) / 5;
                } else if (y === image.height - 1) {
                    let x0y = getPixel(originalImage, x - 1, y);
                    let x0y0 = getPixel(originalImage, x - 1, y - 1);
                    let xy0 = getPixel(originalImage, x, y - 1);
                    let x1y0 = getPixel(originalImage, x + 1, y - 1);
                    let x1y = getPixel(originalImage, x + 1, y);
                    r = (xy0[0] + x0y[0] + x1y[0] + x0y0[0] + x1y0[0]) / 5;
                    g = (xy0[1] + x0y[1] + x1y[1] + x0y0[1] + x1y0[1]) / 5;
                    b = (xy0[2] + x0y[2] + x1y[2] + x0y0[2] + x1y0[2]) / 5;
                } else {
                    let x0y0 = getPixel(originalImage, x - 1, y - 1);
                    let xy0 = getPixel(originalImage, x, y - 1);
                    let x1y0 = getPixel(originalImage, x + 1, y - 1);
                    let x1y = getPixel(originalImage, x + 1, y);
                    let x1y1 = getPixel(originalImage, x + 1, y + 1);
                    let xy1 = getPixel(originalImage, x, y + 1);
                    let x0y1 = getPixel(originalImage, x - 1, y + 1);
                    let x0y = getPixel(originalImage, x - 1, y);
                    r = (xy0[0] + x0y[0] + x1y[0] + x0y0[0] + x1y0[0] + x1y1[0] + xy1[0] + x0y1[0]) / 8;
                    g = (xy0[1] + x0y[1] + x1y[1] + x0y0[1] + x1y0[1] + x1y1[1] + xy1[1] + x0y1[1]) / 8;
                    b = (xy0[2] + x0y[2] + x1y[2] + x0y0[2] + x1y0[2] + x1y1[2] + xy1[2] + x0y1[2]) / 8;
                }
                setPixel(image, x, y, r, g, b, 255);
            }
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

function promedio(rgba) {
    let contador = 0;
    for (let i = 0; i < rgba.length-1; i++) {
        contador+= rgba[i];
    }
    return contador / rgba.length-1;
}

function filterSobel() {
    comprobarFiltros();
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    let r = 0;
    let g = 0;
    let b = 0;
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel contemplando las posibilidades
        for (let y = 0; y < image.height; y++) {
            let a = promedio(getPixel(originalImage, x - 1, y - 1));
            let b = promedio(getPixel(originalImage, x - 1, y));
            let c = promedio(getPixel(originalImage, x - 1, y + 1));
            let d = promedio(getPixel(originalImage, x + 1, y - 1));
            let e = promedio(getPixel(originalImage, x + 1, y));
            let f = promedio(getPixel(originalImage, x + 1, y + 1));
            let g = promedio(getPixel(originalImage, x, y-1));
            let h = promedio(getPixel(originalImage,x, y+1));
            

            let gx = ((-1 * a) + (1 * d))
                + ((-2 * b) + (2 * e))
                + ((-1 * c) + (1 * f));

            let gy = ((-1 * a) + (-2 * g) + (-1 * d))
                + ((1 * c) + (2 * h) + (1 * f));

            let gval = Math.sqrt((gx * gx) + (gy * gy));
            let p = comprobarValor(gval);
            setPixel(image, x, y, p, p, p, 255);
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

function comprobarValor(val) {
    if (val > 255) return 255;
    else if (val < 0) return 0;
    else return val;
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
        image = originalImage;  //la convertimos en la imagen original
        ctx.putImageData(image, 0, 0) * 4;
        aplicatedFilters = false;
        originalImage = ctx.createImageData(width, height);
    }
}

//se borra todo el lienzo y se deja como al inicio
function cleanCanvas() {
    canvas.width = width;   //seteamos el ancho y el alto originales de nuestro canvas inicial
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


