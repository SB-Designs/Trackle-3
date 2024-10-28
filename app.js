import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/dist/esm/supabase.js';

const supabaseUrl = 'https://gbycbuygvitvyrxbyjun.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // replace with your actual anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission

  const email = event.target.email.value;
  const password = event.target.password.value;

  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    errorMessage.textContent = error.message;
  } else {
    // Redirect to protected.html
    window.location.href = 'protected.html';
  }
});
