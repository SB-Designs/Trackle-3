<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trackle™ - Login</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
</head>
<body>
    <header>
        <h1>Trackle™ Login</h1>
    </header>
    <main>
        <form id="login-form">
            <label for="email">Email:</label>
            <input type="email" id="email" required>
            <label for="password">Password:</label>
            <input type="password" id="password" required>
            <button type="button" onclick="handleAuth()">Login / Sign Up</button>
        </form>
        <p id="statusMessage"></p>
    </main>
    <footer>
        <p>&copy; 2024 SB Designs. All rights reserved.</p>
    </footer>
    <script type="module">
        const supabaseUrl = 'https://gbycbuygvitvyrxbyjun.supabase.co';
        const supabaseKey = 'your-supabase-key-here'; // Replace with your Supabase key
        const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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

        async function handleAuth() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Attempt to log in
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                // If login fails, attempt sign-up
                await signUp(email, password);
            } else {
                // If login is successful, proceed to login
                await login(email, password);
            }
        }
    </script>
</body>
</html>
