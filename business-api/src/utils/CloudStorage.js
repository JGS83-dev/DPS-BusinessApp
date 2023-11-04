import firebase from "../config/FirebaseConfig.js";
import { getStorage } from "firebase-admin/storage";

const storage = getStorage(firebase).bucket();

export async function UploadFileToBucket(data, nombre) {
  let signedUrl = null;
  try {
    await storage
      .file(nombre)
      .save(data)
      .then((snapshot) => {
        console.log("Archivo subido...");
      });
    await storage
      .file(nombre)
      .getSignedUrl({
        action: "read",
        expires: "01-31-2024",
      })
      .then((signedUrls) => {
        signedUrl = signedUrls[0];
        // console.log(signedUrls);
      });
  } catch (ex) {
    console.log(ex);
  } finally {
    return signedUrl;
  }
}
