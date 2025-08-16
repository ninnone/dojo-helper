"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

async function deleteTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

export default function TicketList({ tickets }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
          </Link>
          <p>{ticket.body.slice(0, 200)}...</p>
          <button
            onClick={() => {
              setDeleting(true);
              deleteTicket(ticket.id);
              router.refresh();
              setDeleting(false);
            }}
            className="p-2 rounded-full bg-red-400 text-white cursor-pointer"
          >
            {deleting ? "Deleting..." : "Delete now"}
          </button>
          <div className={`pill  ${ticket.priority}`}>
            {ticket.priority} priority
          </div>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center"> There are no open tickets,Yay!</p>
      )}
    </>
  );
}
