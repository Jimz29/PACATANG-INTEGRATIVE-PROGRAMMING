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

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      alert("Enter a valid email address.");
      return;
    }

    // Load all users from localStorage
    let users = JSON.parse(localStorage.getItem("NEONPULSE_USERS")) || [];

    // If admin logs in, auto-add to users if not present
    if (email.toLowerCase() === "admin@neonpulse.com" && password === "admin123") {
      let adminUser = users.find(u => u.email === email);
      if (!adminUser) {
        adminUser = {
          name: "Admin",
          email: email,
          phone: "+63 000 000 0000",
          password: password,
          role: "admin"
        };
        users.push(adminUser);
        localStorage.setItem("NEONPULSE_USERS", JSON.stringify(users));
      }
      localStorage.setItem("NEONPULSE_USER", JSON.stringify(adminUser));
      alert("Login successful!");
      window.location.href = "manage-users.html";
      return;
    }

    // Normal user login
    const storedUser = users.find(u => u.email === email && u.password === password);

    if (!storedUser) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("NEONPULSE_USER", JSON.stringify(storedUser));
    alert("Login successful!");

    if (storedUser.role === "admin") {
      window.location.href = "manage-users.html"; // admin goes to manage users
    } else {
      window.location.href = "profile.html";
    }

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

    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      alert("Enter a valid email address.");
      return;
    }

    const phonePattern = /^\+?\d{10,15}$/;
    if (!phonePattern.test(phone)) {
      alert("Enter a valid phone number.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // ===== ADMIN ROLE CHECK =====
    let role = "user";
    if (email.toLowerCase() === "admin@neonpulse.com") {
      role = "admin";
    }

    const user = { name, email, phone, password, role };

    // Save in NEONPULSE_USERS
    let users = JSON.parse(localStorage.getItem("NEONPULSE_USERS")) || [];
    if (!users.some(u => u.email === email)) {
      users.push(user);
      localStorage.setItem("NEONPULSE_USERS", JSON.stringify(users));
    }

    localStorage.setItem("NEONPULSE_USER", JSON.stringify(user));
    alert("Account created successfully! Please log in.");
    showLogin();
  });
}
