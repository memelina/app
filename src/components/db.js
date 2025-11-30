import Dexie from "dexie";

export const db = new Dexie("MemoryGameDB");

// Tabele: produse și jucători
db.version(4).stores({
  products: "id,name,quantity,store",
  players: "++id,nume,prenume,email,telefon,score,time,premiu,magazin"
});

// Seed produse la prima rulare
export const seedProducts = async () => {
  const count = await db.products.count();
  if (count === 0) {
    await db.products.bulkAdd([
      { id: 1, name: "Decathlon", quantity: 20, store: "Decathlon" },
      { id: 2, name: "Douglas", quantity: 50, store: "Douglas" },
      { id: 3, name: "Hervis", quantity: 20, store: "Hervis" },
      { id: 4, name: "Jysk", quantity: 15, store: "Jysk" },
      { id: 5, name: "Cărturești", quantity: 40, store: "Cărturești" },
      { id: 6, name: "Dormeo", quantity: 20, store: "Dormeo" },
      { id: 7, name: "Marionnaud", quantity:40, store:"Marionnaud"},
      { id: 8, name: "Premiu Surpriză", quantity: 35, store: "Premiu Surpriză"}
    ]);
  }
};
