import React, { useState } from "react";
import { db } from "./db.js";

export default function PlayerRow({ player, refresh }) {
if (!player) return null; // protecție valori undefined

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
{edit ? ( <button onClick={save}>Save</button>
) : (
<button onClick={() => setEdit(true)}>Edit</button>
)}
<button onClick={remove} style={{ marginLeft: "0.5rem" }}>Delete</button> </td> </tr>
);
}
