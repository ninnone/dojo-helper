import React, { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "./loading";

const Tickets = async () => {
  async function getTickets() {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const res = await fetch("http://localhost:4000/tickets", {
      next: {
        revalidate: 30,
      },
    });
    console.log("running");

    return res.json();
  }

  const tickets = await getTickets();

  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList tickets={tickets} />
      </Suspense>
    </main>
  );
};

export default Tickets;
