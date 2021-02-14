(function () {
    // Initialize firebase

    const config = {
        apikey: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: ""
    };

    firebase.initializeApp(config);

    // Get elements

    const txtEmail = document.getElementById('email');
    const txtPassword = document.getElementById('password');
    const btnLogin = document.getElementById('login');
    const btnRegister = document.getElementById('register');
    const btnLogout = document.getElementById('logout');

    // Add Login event

    btnLogin.addEventListener('click', e => {
        // Get email and password
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));


    })
} ());