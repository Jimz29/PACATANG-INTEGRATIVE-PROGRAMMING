// ================= LOGIN & SIGNUP VALIDATION =================

// Show Signup / Login forms
function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function showLogin() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// ======= LOGIN =======
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) { alert("Please enter both email and password."); return; }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) { alert("Enter a valid email address."); return; }

    const storedUser = JSON.parse(localStorage.getItem("NEONPULSE_USER"));
    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      alert("Invalid email or password."); return;
    }

    alert("Login successful!");
    window.location.href = "profile.html";
  });
}

// ======= SIGNUP =======
if (document.getElementById("signupForm")) {
  document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (!name || !email || !phone || !password || !confirmPassword) { alert("All fields are required."); return; }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) { alert("Enter a valid email address."); return; }

    const phonePattern = /^\+?\d{10,15}$/;
    if (!phonePattern.test(phone)) { alert("Enter a valid phone number."); return; }

    if (password.length < 6) { alert("Password must be at least 6 characters."); return; }

    if (password !== confirmPassword) { alert("Passwords do not match."); return; }

    const user = { name, email, phone, password };
    localStorage.setItem("NEONPULSE_USER", JSON.stringify(user));

    alert("Account created successfully! Please log in.");
    showLogin();
  });
}
