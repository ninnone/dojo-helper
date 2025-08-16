"use client";
import react from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { noStore } from "next/cache";

export default function CreateForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      ...formData,
      priority,
      user_email: "mario@netninja.dev",
    };

    noStore();
    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      // router.refresh();
      setFormData({
        title: "",
        body: "",
      });
      router.push("/tickets");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span> Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
        />
      </label>
      <label>
        <span> body</span>
        <textarea
          required
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          value={formData.body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">high priority</option>
        </select>
      </label>
      <button
        className="btn-primary bg-black text-red-400 "
        disabled={isLoading}
      >
        {isLoading && <span>Adding ... </span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}
