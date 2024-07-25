import {ref, getDownloadURL, uploadBytesResumable, deleteObject, getStorage} from 'firebase/storage'
import { storage } from '../src/config/firebase.js'
import sharp from 'sharp'

export async function uploadFile(file){
    let fileBuffer = await sharp(file.buffer)
    .resize({width: null, height: null, fit: 'cover'})
    .toBuffer()

    const fileRef = ref(storage, `files/${file.originalName} ${Date.now()}`)

    const fileMetadata = {
        contentType: file.mimetype
    }
    const fileUploadPromise = uploadBytesResumable(
        fileRef,
        fileBuffer,
        fileMetadata
    )

    await fileUploadPromise

    const fileDownloadURL = await getDownloadURL(fileRef)

    return{ref:fileRef, downloadURL: fileDownloadURL}
}

export async function deleteFile(fileUrl) {
    // Obtener una referencia al archivo en Firebase Storage
    const storage = getStorage();
    const fileRef = ref(storage, fileUrl);
  
    try {
      // Eliminar el archivo de Firebase Storage
      await deleteObject(fileRef);
      console.log(`Archivo ${fileUrl} eliminado correctamente.`);
    } catch (error) {
      console.error(`Error al eliminar el archivo ${fileUrl}:`, error);
      throw error;
    }
  }
