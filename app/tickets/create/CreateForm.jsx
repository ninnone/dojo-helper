"use client";
import react from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      title,
      body,
      priority,
      user_email: "mario@netninja.dev",
    };

    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
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
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span> Title:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
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
