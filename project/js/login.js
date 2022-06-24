function checkUserPassword() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	console.log('===', username, password);

	if (username === 'username' && password === 'secret') {
		document.getElementById('try_success').style.display = 'block';
		document.getElementById('try_error').style.display = 'none';

		sessionStorage.setItem('userLoggedIn', 'logged');
		window.location.replace('index.html');
	} else {
		document.getElementById('try_success').style.display = 'none';
		document.getElementById('try_error').style.display = 'block';
	}
}

function checkLoggedIn() {
	const userLoggedIn = sessionStorage.getItem('userLoggedIn');
	if (userLoggedIn === 'logged') {
		window.location.replace('index.html');
	}
} 