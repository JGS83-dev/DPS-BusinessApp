import firebase from "../config/FirebaseConfig.js";
import { getStorage } from "firebase/storage";
const storage = getStorage(firebase, process.env.bucket_name);

export const UploadFileToBucket = (
  file,
  contents = "these are my file contents",
  destFileName = "file.txt"
) => {
  async function uploadFromMemory() {
    const storageRef = storage.ref();
    storageRef.put(file).then((snapshot) => {
      console.log("Uploaded a blob or file:", snapshot);
    });

    console.log(`${data} uploaded to ${bucketName}.`);
  }

  uploadFromMemory().catch(console.error);
};
