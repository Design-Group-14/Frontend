import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImageToFirebase = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Starting image upload:", file);

      const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload progress:", progress.toFixed(0));
          if (onProgress) onProgress(progress.toFixed(0));
        },
        (error) => {
          console.error("Firebase upload failed:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Image uploaded to Firebase. URL:", downloadURL);
          resolve(downloadURL);
        }
      );
    } catch (err) {
      console.error("Image upload error (outer try):", err);
      reject(err);
    }
  });
};
