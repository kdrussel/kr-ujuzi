const form = document.getElementById('poll-form');

form.addEventListener('submit', e => {
	const choice = document.querySelector('input[name=avenger]:checked').value;
	const data = {avenger: choice};

	fetch('http://localhost:3000/poll', {
		method: 'post',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}).then(res => res.json())
	.then(data => console.log(data))
	.catch(err => console.log(err));

	e.preventDefault();
});