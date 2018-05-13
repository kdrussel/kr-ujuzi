const form = document.getElementById('poll-form');

// form submit
form.addEventListener('submit', e => {
	const choice = document.querySelector('input[name=avenger]:checked').value;
	const data = {avenger: choice};

	fetch('http://localhost:3000/poll', {
		method: 'post',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err));

	e.preventDefault();
});

let dataPoints = [
	{label: 'Captain America', y: 0 },
	{label: 'Iron Man', y: 0},
	{label: 'Black Panther', y: 0},
	{label: 'Thor', y: 0},
	{label: 'Spider-Man', y: 0},
	{label: 'Dr. Strange', y: 0},
	{label: 'Black Widow', y: 0}
];

const chartContainer = document.querySelector('#chartContainer');

if (chartContainer) {
	const chart = new CanvasJS.chart('chartContainer', {
		animationEnabled: true,
		theme: 'theme1',
		title: {
			text: 'Avenger Results'
		},
		data: [
			{
				type: 'column',
				dataPoints: dataPoints
			}
		]
	});
	chart.render();

	// Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('6c404551e69b77667b15', {
      cluster: 'us2',
      encrypted: true
    });

    var channel = pusher.subscribe('avenger-poll');
    channel.bind('avenger-vote', function(data) {
      dataPoints = dataPoints.map(x => {
      	if(x.label == data.avenger) {
      		x.y += data.points;
      		return x;
      	} else {
      		return x;
      	}
      });
      chart.render();
    });

}