let canvas =  /** @type { HTMLcanvasElement} */ document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let imageData = ctx.createImageData(width, height);
let inputFile = document.getElementById('inputFile');
let btnBaW = document.getElementById('btn-baw');
let btnNeg = document.getElementById('btn-neg');
let btnSepia = document.getElementById('btn-sepia');

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

function showImage() {
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
            ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
            imageData = ctx.getImageData(0, 0, image.width, image.height);
            ctx.putImageData(imageData, 0, 0);
        }
    }

};

function filterBaW() {
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel
        for (let y = 0; y < image.height; y++) {
            let pixel = getPixel(image, x, y);  //obtenemos los valores de cada pixel y calculamos el promedio
            let prom = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3)
            if (prom === 0) {
                setPixel(image, x, y, 255, 255, 255, 255);
            } else {        //enviamos el promedio para setear los Bytes r, g y b con el promedio y el alpha en 255
                setPixel(image, x, y, prom, prom, prom, 255);
            }
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

function filterNegative() {
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
    let image = ctx.getImageData(0, 0, width, height);  //obtenemos la imagen
    for (let x = 0; x <= image.width; x++) {    //la recorremos pixel a pixel
        for (let y = 0; y < image.height; y++) {
            let pixel = getPixel(image, x, y);  //obtenemos los valores de cada pixel y 
            let r = (pixel[0] * 0.460 + pixel[1] * 0.470 + pixel[2] * 0.060) ;
            let g = (pixel[0] * 0.350 + pixel[1] * 0.425 + pixel[2] * 0.070) ;
            let b = (pixel[0] * 0.270 + pixel[1] * 0.135 + pixel[2] * 0.050) ;
            if (r === 0 && g === 0) {
                setPixel(image, x, y, 255, 255, 255, 255);
            } else {
                setPixel(image, x, y, r, g, b, 255);
            }
        }
    }
    ctx.putImageData(image, 0, 0) * 4;
}

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