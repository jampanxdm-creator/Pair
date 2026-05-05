async function pair() {
  const number = document.getElementById("number").value;

  const res = await fetch("http://localhost:3000/pair", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ number })
  });

  const data = await res.json();

  if (data.code) {
    document.getElementById("otp").innerText =
      "OTP: " + data.code;
  } else {
    alert("Failed");
  }
}

// STATUS LOOP
setInterval(async () => {
  const res = await fetch("http://localhost:3000/status");
  const data = await res.json();

  document.getElementById("status").innerText =
    "Status: " + data.status;
}, 2000);