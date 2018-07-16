import sharp from 'sharp';

const imageProcessControl = {
    resize: (inputStream, width, height) => {
        let transform = sharp();
      
        if (format) {
            transform = transform.toFormat(format);
        }
    
        if (width || height) {
            transform = transform.resize(width, height);
        }
    
        return new Promise((resolve, reject) => {
          inputStream.pipe(transform);
          inputStream.on('end', () => resolve(transform));
          transform.on('error', reject);
        });
    }
};


export default function imageProcessControl(imageStream) {
    return new Promise((resolve, reject) => {
        function imageProcess() {
            const readInputImg = readStream(imageURL);
            readInputImg.on('error', reject);
            Promise.all(
                images.map((info) => imageProcessingAndSave(readInputImg, info))
            )
            .then(resolve)
            .catch(reject);
        }
        imageProcess();
    });
}