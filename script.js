import { auth, db } from "./firebase-config.js";
 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
 
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
 
const page = window.location.pathname;
 
/* Signup */
const signupBtn = document.getElementById("signupBtn");
 
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
 
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
 
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");
      window.location.href = "setup.html";
    } catch (error) {
      alert(error.message);
    }
  });
}
 
/* Login */
const loginBtn = document.getElementById("loginBtn");
 
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
 
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Invalid login details");
    }
  });
}
 
/* Save setup */
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
 
      if (!bank || !accountType || !balance || !income || !expense) {
        alert("Please fill all details");
        return;
      }
 
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        bank: bank,
        accountType: accountType,
        balance: balance,
        income: income,
        expense: expense
      });
 
      alert("Bank details saved");
      window.location.href = "dashboard.html";
    });
  });
}
 
/* Dashboard data */
if (page.includes("dashboard.html")) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }
 
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
 
    if (!docSnap.exists()) {
      window.location.href = "setup.html";
      return;
    }
 
    const data = docSnap.data();
 
    const savings = data.income - data.expense;
    const healthScore = Math.max(0, Math.min(100, Math.round((savings / data.income) * 100)));
 
    document.getElementById("bankName").innerText = data.bank;
    document.getElementById("accountTypeText").innerText = data.accountType;
    document.getElementById("balanceText").innerText = "₹" + data.balance;
    document.getElementById("incomeText").innerText = "₹" + data.income;
    document.getElementById("expenseText").innerText = "₹" + data.expense;
    document.getElementById("savingText").innerText = "₹" + savings;
    document.getElementById("healthScore").innerText = healthScore + "%";
  });
}
 
/* Logout */
const logoutBtn = document.getElementById("logoutBtn");
 
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}
