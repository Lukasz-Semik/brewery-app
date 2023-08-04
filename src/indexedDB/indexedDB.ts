const DB_NAME = "brewery-db";
const OBJECT_STORE_NAME = "data";

export function getDataFromIndexedDB<ResponseType>() {
  return new Promise<ResponseType>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    // Just for making code shorter within recruitment task, onupgradeneeded is put here, as `getDataFromIndexedDB` runs when main page is mounted.
    request.onupgradeneeded = () => {
      const db = request.result;
      const objectStore = db.createObjectStore(OBJECT_STORE_NAME, {
        keyPath: "id",
      });
      objectStore.createIndex("id", "id", { unique: true });
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(OBJECT_STORE_NAME, "readonly");
      const store = transaction.objectStore(OBJECT_STORE_NAME);

      const getDataRequest = store.getAll();

      getDataRequest.onsuccess = () => {
        resolve(getDataRequest.result as ResponseType);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    request.onerror = () => {
      reject(new Error("Error opening IndexedDB"));
    };
  });
}

export function storeDataInIndexedDB<DataType>(data: DataType[]) {
  if ("indexedDB" in window) {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onerror = function () {
      console.error("An error occurred with IndexedDB");
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
      const store = transaction.objectStore(OBJECT_STORE_NAME);

      store.clear();

      data.forEach((item) => {
        store.put(item);
      });

      transaction.oncomplete = () => {
        db.close();
      };
    };
  }
}

export function clearDataInIndexedDB() {
  if ("indexedDB" in window) {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onerror = function () {
      console.error("An error occurred with IndexedDB");
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
      const store = transaction.objectStore(OBJECT_STORE_NAME);

      store.clear();

      transaction.oncomplete = () => {
        db.close();
      };
    };
  }
}

export function removeItemsDataInIndexedDB<DataType extends { id: string }>(
  beers: DataType[]
) {
  if ("indexedDB" in window) {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onerror = function () {
      console.error("An error occurred with IndexedDB");
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
      const store = transaction.objectStore(OBJECT_STORE_NAME);

      beers.forEach((beer) => {
        store.delete(beer.id);
      });

      transaction.oncomplete = () => {
        db.close();
      };
    };
  }
}
