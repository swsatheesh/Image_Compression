export const UPLOAD_DOCUMENT_SUCCESS = 'image/upload/Success';
export const UPLOAD_DOCUMENT_FAIL = 'image/upload/Failed';

export function uploadSuccess(data, dataId) {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    payload: {
      id: dataId,
      data: {
        downloadLink: data.data
      }
    },
  };
}
  
export function uploadFail(error) {
  return {
    type: UPLOAD_DOCUMENT_FAIL,
    payload: {
      error
    },
  };
}