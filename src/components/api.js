import { db, seedProducts } from "./db.js";

// Obține produse
export const getProducts = async () => {
  await seedProducts();
  return await db.products.toArray();
};

// Actualizează stocul unui produs
export const decrementProduct = async (id) => {
  const product = await db.products.get(id);
  if (!product || product.quantity <= 0) return null;
  await db.products.update(id, { quantity: product.quantity - 1 });
  return await db.products.get(id);
};

// Export CSV
export const exportPlayersCsv = async () => {
  const players = await db.players.toArray();
  let csv = "Nume,Prenume,Email,Telefon,Premiu\n";
  players.forEach(p => {
    csv += `${p.nume},${p.prenume},${p.email},${p.telefon},${p.premiu || ""}\n`;
  });
  return csv;
};

// Export produse CSV
export const exportProductsCsv = async () => {
  const products = await db.products.toArray();
  let csv = "ID,Nume,Quantity,Store\n";
  products.forEach(p => {
    csv += `${p.id},${p.name},${p.quantity},${p.store}\n`;
  });
  return csv;
};

export const addPlayerLocal = async (player) => {
  return await db.players.add(player); // returnează id
};

export const assignPrizeToPlayer = async (playerId, prizeName) => {
  await db.players.update(playerId, { premiu: prizeName });
};

