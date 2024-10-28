// Initialize Supabase client - ensure this is at the very top of your file
const SUPABASE_URL = 'https://gbycbuygvitvyrxbyjun.supabase.co'; // Replace with your Supabase API URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieWNidXlndml0dnlyeGJ5anVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMTEwNjQsImV4cCI6MjA0NTY4NzA2NH0.NcuKCvQ3T1rQid_DVW3z7Df4ICueZ4jYvTdWcLW4ETM'; // Replace with your Supabase anon key
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
