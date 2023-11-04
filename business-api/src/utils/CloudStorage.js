import firebase from "../config/FirebaseConfig.js";
import { getStorage } from "firebase-admin/storage";

const storage = getStorage(firebase).bucket();

export const UploadFileToBucket = (data,nombre) => {
  try {
    async function uploadFromMemory() {
      storage.file(nombre).save(data).then((snapshot) => {
        console.log(snapshot);
      });

      // console.log(downloadURL);
    }

    uploadFromMemory().catch(console.error);
  } catch (ex) {
    console.log(ex);
  }
};
