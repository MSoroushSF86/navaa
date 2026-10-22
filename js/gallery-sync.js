import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyCdy1XEUDrVdgmyrr2r5nnvxaIP6A6y294",
  projectId: "navaa-409cb"
});
const db = getFirestore(app);

// گوش دادن به تغییرات آثار (آنلاین)
onSnapshot(doc(db, 'navaa_storage', 'navaa_items_v3'), (docSnap) => {
  if (docSnap.exists()) {
    const cloudItems = JSON.parse(docSnap.data().value);
    window.DB.items = cloudItems;
    localStorage.setItem('navaa_items_v3', JSON.stringify(cloudItems));
    if (typeof renderGallery === 'function') renderGallery();
  }
});

// تابعی برای ارسال آثار جدید به سرور
window.saveItemsToCloud = async function(items) {
  const docRef = doc(db, 'navaa_storage', 'navaa_items_v3');
  await setDoc(docRef, { value: JSON.stringify(items), updatedAt: Date.now() });
};