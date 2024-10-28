// app.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gbycbuygvitvyrxbyjun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieWNidXlndml0dnlyeGJ5anVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMTEwNjQsImV4cCI6MjA0NTY4NzA2NH0.NcuKCvQ3T1rQid_DVW3z7Df4ICueZ4jYvTdWcLW4ETM';
const supabase = createClient(supabaseUrl, supabaseKey);

const authButton = document.getElementById('auth-button');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const statusMessage = document.getElementById('statusMessage');

authButton.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        // Attempting to sign in if there's an error during signup
        const { error: signInError } = await supabase.auth.signIn({
            email,
            password,
        });
        if (signInError) {
            statusMessage.textContent = `Error: ${signInError.message}`;
        } else {
            statusMessage.textContent = 'Successfully logged in!';
        }
    } else {
        statusMessage.textContent = 'Check your email for confirmation!';
    }
});
