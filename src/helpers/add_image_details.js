import uniqid from 'uniqid';

const dataset = {
    id: undefined,
    downloadLink: '',
    downloadImageName: '',
    imageUrl: '',
    file: '',
    sourceFile: '',
    imageSpec: {
        width: 0,
        height: 0
    }
};

export default (imageUrl, file, sourceFile, imageSpec) => {
    const id = uniqid('img_');
    return { ...dataset, id, imageUrl, file, sourceFile, imageSpec }
}; 