// Supabase Project URL and Anon Key
const SUPABASE_URL = 'https://gbycbuygvitvyrxbyjun.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieWNidXlndml0dnlyeGJ5anVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMTEwNjQsImV4cCI6MjA0NTY4NzA2NH0.NcuKCvQ3T1rQid_DVW3z7Df4ICueZ4jYvTdWcLW4ETM'; // Replace with your Supabase anon key

// Initialize Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to handle sign-up
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  const statusMessage = document.getElementById('statusMessage');

  if (error) {
    console.error("Sign-up error:", error.message);
    statusMessage.textContent = "Sign-up failed: " + error.message;
  } else {
    statusMessage.textContent = "Sign-up successful! Check your email to verify your account.";
  }
}

// Function to handle login
async function login(email, password) {
  const { session, error } = await supabase.auth.signInWithPassword({ email, password });
  const statusMessage = document.getElementById('statusMessage');

  if (error) {
    console.error("Login error:", error.message);
    statusMessage.textContent = "Login failed: " + error.message;
  } else {
    statusMessage.textContent = "Login successful!";
    window.location.href = "protected.html"; // Redirect to a protected page
  }
}

// Function to handle authentication based on user input
async function handleAuth() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // If login fails, attempt sign-up
    await signUp(email, password);
  } else {
    // If login is successful, proceed to login
    await login(email, password);
  }
}
