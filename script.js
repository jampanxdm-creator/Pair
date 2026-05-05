const API = "https://jampan-xdm-bbeb3a9c6e1e.herokuapp.com/"; // BADILISHA na link yako halisi

// Pair function
async function pair() {
  const numberInput = document.getElementById("number");
  const otpBox = document.getElementById("otp");

  let number = numberInput.value.trim();

  if (!number) {
    alert("Weka namba ya simu");
    return;
  }

  // Ondoa + kama ipo
  number = number.replace("+", "");

  otpBox.innerText = "⏳ Inapair...";

  try {
    const res = await fetch(API + "/pair", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ number })
    });

    const data = await res.json();

    if (data.code) {
      otpBox.innerText = "🔑 OTP: " + data.code;
    } else {
      otpBox.innerText = "❌ Imeshindikana kupata OTP";
    }
  } catch (err) {
    otpBox.innerText = "❌ Server error";
  }
}

// STATUS LOOP
async function loadStatus() {
  try {
    const res = await fetch(API + "/status");
    const data = await res.json();

    let statusText = "🔴 Offline";

    if (data.status === "online") statusText = "🟢 Online";
    if (data.status === "connecting") statusText = "🟡 Connecting";

    document.getElementById("status").innerText =
      "Status: " + statusText;
  } catch {
    document.getElementById("status").innerText =
      "Status: 🔴 Error";
  }
}

// Run every 3 seconds
setInterval(loadStatus, 3000);
loadStatus();