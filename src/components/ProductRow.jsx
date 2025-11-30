import React, { useState } from "react";
import { db } from "./db.js";

export default function ProductRow({ product, refresh }) {
  if (!product) return null; // protecție valori undefined

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

  return (
    <tr>
      <td>{product.id}</td>
      <td>{edit ? <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /> : product.name}</td>
      <td>{edit ? <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) })} /> : product.quantity}</td>
      <td>{edit ? <input value={form.store} onChange={e => setForm({ ...form, store: e.target.value })} /> : product.store}</td>
      <td>
        {edit ? <button onClick={save}>Save</button> : <button onClick={() => setEdit(true)}>Edit</button>}
        <button onClick={remove} style={{ marginLeft: "0.5rem" }}>Delete</button>
      </td>
    </tr>
  );
}
