const saveSetupBtn = document.getElementById("saveSetupBtn");

if (saveSetupBtn) {
  saveSetupBtn.addEventListener("click", () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Please login first");
        window.location.href = "index.html";
        return;
      }

      const bank = document.getElementById("bank").value;
      const accountType = document.getElementById("accountType").value;
      const balance = Number(document.getElementById("balance").value);
      const income = Number(document.getElementById("income").value);
      const expense = Number(document.getElementById("expense").value);
      const creditCard = Number(document.getElementById("creditCard").value);
      const investment = Number(document.getElementById("investment").value);
      const loan = Number(document.getElementById("loan").value);
      const goalName = document.getElementById("goalName").value;
      const goalTarget = Number(document.getElementById("goalTarget").value);
      const goalSaved = Number(document.getElementById("goalSaved").value);
      const trackingType = document.getElementById("trackingType").value;

      if (!bank || !accountType || !balance || !income || !expense || !goalName || !goalTarget || !trackingType) {
        alert("Please fill all required details");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        bank,
        accountType,
        balance,
        income,
        expense,
        creditCard,
        investment,
        loan,
        goalName,
        goalTarget,
        goalSaved,
        trackingType,
        setupCompleted: true
      });

      alert("Financial profile saved successfully");
      window.location.href = "dashboard.html";
    });
  });
}
