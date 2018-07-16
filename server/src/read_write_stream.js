import fs from 'fs';
import imageResize from './image_resize';

const resultImageStoragePath = '../output_files/';

const readStream = (imageURL) => fs.createReadStream(imageURL);

const writeStream = (outPath) => fs.createWriteStream(outPath);

function imageProcessingAndSave(inputImg, imageInfo) {
    return new Promise((resolve, reject) => {
        const outPath = `${resultImageStoragePath}${imageInfo[3].split('.').slice(0, -1).join('.')}.${imageInfo[2].replace('image/', '')}`;
        const creatNewImage = writeStream(outPath);
        const resolveOutputPath = () => resolve(outPath);
        imageResize(inputImg, imageInfo[0], imageInfo[1], imageInfo[2]).then((processedStream) => {
            processedStream.pipe(creatNewImage);
            resolveOutputPath();
        });
        creatNewImage.on('error', reject);
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