document.addEventListener("DOMContentLoaded", function () {
  const bookBtn = document.getElementById("bookBtn");

  bookBtn.addEventListener("click", async () => {
    const date = document.getElementById("bookingDate").value;
    const listingId = bookBtn.dataset.listingId;

    if (!date) {
      alert("Please select a date.");
      return;
    }

    const res = await fetch(`/bookings/${listingId}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Booked!");
    } else {
      alert("Something went wrong.");
    }
  });
});
