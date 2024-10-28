// Initialize Supabase client
const SUPABASE_URL = 'https://your-project-id.supabase.co'; // Replace with your Supabase API URL
const SUPABASE_ANON_KEY = 'your-anon-key'; // Replace with your Supabase anon key
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sign-up function
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error("Error during sign-up:", error.message);
    alert("Sign-up failed: " + error.message);
  } else {
    alert("Sign-up successful! Please check your email to verify your account.");
  }
}

// Login function
async function login(email, password) {
  const { session, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Error during login:", error.message);
    alert("Login failed: " + error.message);
  } else {
    alert("Login successful!");
    window.location.href = "protected.html"; // Redirect to your protected page
  }
}

// Handle authentication on button click
async function handleAuth() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // If user exists, log in; otherwise, sign up
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    signUp(email, password); // Sign up if login fails
  } else {
    login(email, password);
  }
}

// Check if user is authenticated
async function checkAuth() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    alert("You must be logged in to access this page.");
    window.location.href = "index.html"; // Redirect to login page
  }
}

// Logout function
async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error during logout:", error.message);
  } else {
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to login page
  }
}
