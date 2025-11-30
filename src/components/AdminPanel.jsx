import React, { useEffect, useState } from "react";
import { db } from "./db.js";

// Row editabil pentru produs
function ProductRowEditable({ product, refresh }) {
const [edit, setEdit] = useState(false);
const [form, setForm] = useState({ ...product });

const save = async () => {
await db.products.put(form);
setEdit(false);
refresh();
};

const remove = async () => {
await db.products.delete(product.id);
refresh();
};

return ( <tr> <td>{product.id}</td> <td>{edit ? <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /> : product.name}</td> <td>{edit ? <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) })} /> : product.quantity}</td> <td>{edit ? <input value={form.store} onChange={e => setForm({ ...form, store: e.target.value })} /> : product.store}</td> <td>
{edit ? <button onClick={save}>Save</button> : <button onClick={() => setEdit(true)}>Edit</button>}
<button onClick={remove} style={{ marginLeft: "0.5rem" }}>Delete</button> </td> </tr>
);
}

// Row editabil pentru jucător
function PlayerRowEditable({ player, refresh }) {
const [edit, setEdit] = useState(false);
const [form, setForm] = useState({ ...player });

const save = async () => {
await db.players.put(form);
setEdit(false);
refresh();
};

const remove = async () => {
await db.players.delete(player.id);
refresh();
};

return ( <tr> <td>{player.id}</td> <td>{edit ? <input value={form.nume} onChange={e => setForm({ ...form, nume: e.target.value })} /> : player.nume}</td> <td>{edit ? <input value={form.prenume} onChange={e => setForm({ ...form, prenume: e.target.value })} /> : player.prenume}</td> <td>{edit ? <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /> : player.email}</td> <td>{edit ? <input value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} /> : player.telefon}</td> <td>{edit ? <input value={form.magazin || ""} onChange={e => setForm({ ...form, magazin: e.target.value })} /> : player.magazin || ""}</td> <td>{edit ? <input value={form.premiu || ""} onChange={e => setForm({ ...form, premiu: e.target.value })} /> : player.premiu || ""}</td> <td>
{edit ? <button onClick={save}>Save</button> : <button onClick={() => setEdit(true)}>Edit</button>}
<button onClick={remove} style={{ marginLeft: "0.5rem" }}>Delete</button> </td> </tr>
);
}

// Transformare array obiecte în CSV
const arrayToCsv = (arr) => {
if (!arr.length) return "";
const keys = Object.keys(arr[0]);
const csv = [
keys.join(","), // header
...arr.map(obj => keys.map(k => `"${obj[k] ?? ""}"`).join(",")) // valori
];
return csv.join("\n");
};

export default function AdminPanel({ onBack }) {
const [products, setProducts] = useState([]);
const [players, setPlayers] = useState([]);
const [csvPopup, setCsvPopup] = useState("");

const fetchData = async () => {
const prods = await db.products.toArray();
const plays = await db.players.toArray();
setProducts(prods.filter(Boolean));
setPlayers(plays.filter(Boolean));
};

useEffect(() => { fetchData(); }, []);

const handleExport = (type) => {
let csv = "";
if (type === "products") csv = arrayToCsv(products);
if (type === "players") csv = arrayToCsv(players);
setCsvPopup(csv);
};

return (
<div style={{ padding: "2rem" }}>
<button onClick={onBack} style={{ marginBottom: "1rem" }}>⬅ Back</button>

  <h2>Produse</h2>
  <button onClick={() => handleExport("products")}>Export Produse CSV</button>
  <table border="1" cellPadding="5" style={{ marginTop: "1rem", width: "100%" }}>
    <thead>
      <tr><th>ID</th><th>Nume</th><th>Stoc</th><th>Magazin</th><th>Acțiuni</th></tr>
    </thead>
    <tbody>
      {products.map(p => (
        <ProductRowEditable key={p.id} product={p} refresh={fetchData} />
      ))}
    </tbody>
  </table>

  <h2 style={{ marginTop: "2rem" }}>Jucători</h2>
  <button onClick={() => handleExport("players")}>Export Jucători CSV</button>
  <table border="1" cellPadding="5" style={{ marginTop: "1rem", width: "100%" }}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nume</th>
        <th>Prenume</th>
        <th>Email</th>
        <th>Telefon</th>
        <th>Magazin</th>
        <th>Premiu</th>
        <th>Acțiuni</th>
      </tr>
    </thead>
    <tbody>
      {players.map(p => (
        <PlayerRowEditable key={p.id} player={p} refresh={fetchData} />
      ))}
    </tbody>
  </table>

  {/* Popup CSV / copiere */}
  {csvPopup && (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "#e41468", display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000, padding: "1rem"
    }}>
      <div style={{ background: "white", padding: "1rem", borderRadius: "10px", maxHeight: "90%", overflow: "auto", width: "90%" }}>
        <h3>CSV export</h3>
        <textarea style={{ width: "100%", height: "300px" }} readOnly value={csvPopup}></textarea>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => { navigator.clipboard.writeText(csvPopup); alert("CSV copiat în clipboard!"); }}>
            Copiază
          </button>
          <button onClick={() => setCsvPopup("")}>Închide</button>
        </div>
      </div>
    </div>
  )}
</div>


);
}
