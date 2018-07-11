import fs from 'fs';
import imageResize from './image_resize';

const resultImageStoragePath = '../output_files/';

const readStream = (imageURL) => fs.createReadStream(imageURL);

const writeStream = (outPath) => fs.createWriteStream(outPath);

function imageProcessingAndSave(inputImg, imageInfo) {
    // var resizeTransform = sharp().resize(imageInfo[0], imageInfo[1]).max();
    return new Promise((resolve, reject) => {
        const outPath = `${resultImageStoragePath}${ imageInfo[2] }`;
        const creatNewImage = writeStream(outPath);
        const resolveOutputPath = () => resolve(outPath);
        // inputImg.pipe(resizeTransform).pipe(creatNewImage);
        // imageResize(inputImg, imageInfo[0], imageInfo[1], resolveOutputPath).pipe(creatNewImage);
        imageResize(inputImg, imageInfo[0], imageInfo[1]).then((processedStream) => {
            processedStream.pipe(creatNewImage);
            resolveOutputPath();
        });
        // inputImg.on('end', () => resolve(outPath));
        creatNewImage.on('error', reject);
        // resizeTransform.on('error', reject);
    });
}

export default function readWriteStream(imageURL, images) {

    return new Promise((resolve, reject) => {
        function stream() {
            const readInputImg = readStream(imageURL);
            readInputImg.on('error', reject);
            Promise.all(
                images.map((info) => imageProcessingAndSave(readInputImg, info))
            )
            .then(resolve)
            .catch(reject);
        }
        stream();
    });
}