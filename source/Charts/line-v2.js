// Sample data (you can replace this with your own)
// const datasets = [
// 	[5, 20, 0, 40, 70, 60, 90, 80, 50, 200, -60, -250, 400],
// 	[100, 50, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650],
// 	[30, 70, 20, 90, 150, 120, 180, 200, 170, 160, 140, 130, 110]
// ];

// const parent = document.querySelector("#parent");

// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');




// // Fixed colors for the lines
// const lineColors = ['#ff6384', '#36a2eb', '#ffce56'];

// // Function to draw the line chart
// function drawLineChart(datasets) {

// 	canvas.width = parent.clientWidth
// 	canvas.height = parent.clientHeight

// 	const width = canvas.width * 0.9;
// 	const height = canvas.height * 0.75;

// 	const margin = {
// 		top: canvas.height * 0.2 / 2,
// 		right: canvas.width * 0.1 / 2,
// 		bottom: canvas.height * 0.1 / 2,
// 		left: canvas.width * 0.12 / 2
// 	};

// 	const x_start = margin.left;
// 	const x_end = width + x_start;
// 	const y_start = margin.top;
// 	const y_end = height + y_start;

// 	ctx.clearRect(0, 0, canvas.width, canvas.height);

// 	const gap = width / (datasets[0].length - 1);
// 	let minValue = Infinity;
// 	let maxValue = -Infinity;

// 	// Find the minimum and maximum values across all datasets
// 	for (let i = 0; i < datasets.length; i++) {
// 		const dataset = datasets[i];
// 		const min = Math.min(...dataset);
// 		const max = Math.max(...dataset);
// 		if (min < minValue) minValue = min;
// 		if (max > maxValue) maxValue = max;
// 	}

// 	const scaleY = height / (maxValue - minValue);

// 	// Draw title
// 	const title = "Test title of this chart";
// 	ctx.textAlign = "center";
// 	ctx.font = "bold 16px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
// 	ctx.fillText(title, canvas.width / 2, margin.top / 2);

// 	// Calculate total width required for legends
// 	let totalLegendWidth = 0;
// 	const legendPadding = 10;
// 	const legendTextWidths = [];

// 	ctx.font = "12px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
// 	for (let i = 0; i < datasets.length; i++) {
// 		const legendText = `Line ${i + 1}`;
// 		const legendTextWidth = ctx.measureText(legendText).width;
// 		legendTextWidths.push(legendTextWidth);
// 		totalLegendWidth += legendTextWidth + 20 + legendPadding * 3; // Width of colored rectangle (20) + padding
// 	}

// 	// Calculate starting position for legends
// 	let startX = (canvas.width - totalLegendWidth) / 2;
// 	const legendY = canvas.height - margin.bottom; // Position legend below the chart

// 	// Draw legend
// 	for (let i = 0; i < datasets.length; i++) {
// 		const legendText = `Line ${i + 1}`;
// 		const legendColor = lineColors[i % lineColors.length];


// 		// Draw colored rectangle
// 		ctx.fillStyle = legendColor;
// 		ctx.fillRect(startX, legendY, 20, 10);

// 		// Draw legend text
// 		ctx.fillStyle = "#000000";
// 		ctx.fillText(legendText, startX + 30 + legendPadding, legendY + 9); // Adjust 14 to vertically center text

// 		// Update starting position for next legend
// 		startX += legendTextWidths[i] + 30 + legendPadding * 3; // Width of colored rectangle (20) + padding
// 	}



// 	// Draw the x-axis and y-axis
// 	ctx.beginPath();
// 	ctx.moveTo(x_start, y_start);
// 	ctx.lineTo(x_start, y_end);
// 	ctx.lineTo(x_end, y_end);
// 	ctx.strokeStyle = '#35374B';
// 	ctx.lineWidth = 1;
// 	ctx.stroke();

// 	// Calculate evenly spaced y-axis values
// 	const numYTicks = 10;
// 	const yTickGap = (maxValue - minValue) / (numYTicks - 1);
// 	const yTickValues = Array.from({ length: numYTicks }, (_, i) => minValue + i * yTickGap);

// 	// Draw Y-axis markers and labels
// 	for (let i = 0; i < yTickValues.length; i++) {
// 		const yTick = yTickValues[i];
// 		const yTickPosY = y_end - (yTick - minValue) * scaleY;
// 		ctx.beginPath();
// 		ctx.moveTo(x_start - 5, yTickPosY);
// 		ctx.lineTo(x_end, yTickPosY);
// 		ctx.strokeStyle = '#35374B'; // Grid line color
// 		ctx.lineWidth = 0.1;
// 		ctx.stroke();
// 		// Add text labels
// 		ctx.textAlign = "right";
// 		ctx.font = " 11px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
// 		ctx.fillText(yTick.toFixed(1), x_start - 10, yTickPosY + 3);
// 	}

// 	// Draw vertical lines from x-axis
// 	for (let i = 0; i < datasets[0].length; i++) {
// 		const x = i * gap + x_start;
// 		ctx.beginPath();
// 		ctx.moveTo(x, y_start);
// 		ctx.lineTo(x, y_end);
// 		ctx.strokeStyle = '#35374B'; // Grid line color
// 		ctx.lineWidth = 0.1;
// 		ctx.stroke();
// 	}

// 	// Draw lines for each dataset
// 	for (let i = 0; i < datasets.length; i++) {
// 		const dataset = datasets[i];
// 		const lineColor = lineColors[i % lineColors.length]; // Cycle through line colors
// 		ctx.strokeStyle = lineColor;
// 		ctx.beginPath();
// 		ctx.moveTo(x_start, y_end - (dataset[0] - minValue) * scaleY);
// 		for (let j = 0; j < dataset.length; j++) {
// 			const x = j * gap + x_start;
// 			const y = y_end - (dataset[j] - minValue) * scaleY;
// 			ctx.lineTo(x, y);
// 		}
// 		ctx.lineWidth = 2; // Increased line width for better visibility
// 		ctx.stroke();
// 	}

// 	// Draw dots for each dataset
// 	for (let i = 0; i < datasets.length; i++) {
// 		const dataset = datasets[i];
// 		const lineColor = lineColors[i % lineColors.length]; // Cycle through line colors
// 		ctx.fillStyle = lineColor;
// 		for (let j = 0; j < dataset.length; j++) {
// 			const x = j * gap + x_start;
// 			const y = y_end - (dataset[j] - minValue) * scaleY;
// 			// ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
// 			ctx.beginPath();
// 			ctx.arc(x, y, 4, 0, Math.PI * 2);
// 			ctx.fill();
// 		}
// 	}

// 	// Draw X-axis markers and labels
// 	for (let i = 0; i < datasets[0].length; i++) {
// 		const x = i * gap + x_start;

// 		// Draw X-axis markers
// 		ctx.beginPath();
// 		ctx.moveTo(x, y_end);
// 		ctx.lineTo(x, y_end + 5);
// 		ctx.strokeStyle = '#35374B';
// 		ctx.fillStyle = "black"
// 		ctx.lineWidth = 0.2;
// 		ctx.stroke();
// 		// Add text labels
// 		ctx.textAlign = "center"
// 		ctx.font = " 11px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
// 		ctx.fillText(i, x, y_end + 20);
// 	}
// }

// drawLineChart(datasets);

// // Create a new ResizeObserver instance
// const resizeObserver = new ResizeObserver(()=>{
// 	drawLineChart(datasets)
// });

// // Observe changes in the size of the parent container
// resizeObserver.observe(parent);



export default class Line extends HTMLElement{
	#data;
	#canvas;
	#ctx;
	#padding = 50;
	#paddings;
	#minValue = Infinity;
	#maxValue = -Infinity;
	#longestDataset = 0;
	#gapXAxis = 0;
	#gapYAxis = 0;
	#markerSize = 10;
	#markerCountYAxis = 10;
	#YAxisStepValue;
	#circleRad = 4;
	#gridLineWidth = 0.1;


	constructor(){
		super();

		this.shadow = this.attachShadow({mode: 'closed'});

		this.#data = JSON.parse(this.innerHTML);

		console.log(this.#data);

		this.shadow.appendChild(document.createElement("canvas"));
		this.#canvas = this.shadow.querySelector("canvas");
		this.#ctx = this.#canvas.getContext('2d');

		this.#setUpCanvas();
		this.#setValues();
		this.#drawTitle();
		this.#drawMainAxis();
		this.#drawXLines();
		this.#drawYLines();
		this.#drawLines();
		this.#drawCircle();
		this.#drawMarkersXAxis();
		this.#drawMarkersYAxis();
		this.#drawLegends();
	}

	#setUpCanvas(){
		this.#canvas.width = 700;
		this.#canvas.height = 500;
		this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
		this.#ctx.fillStyle = "white";
		this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
	}

	#setValues(){
		// Finding min max
		for(let i = 0; i < this.#data["data"].length; i++){
			const min = Math.min(...this.#data["data"][i]["values"]);
			const max = Math.max(...this.#data["data"][i]["values"]);
			if(min < this.#minValue) this.#minValue = min;
			if(max > this.#maxValue) this.#maxValue = max;

			// Longest dataset
			if(this.#data["data"][i]["values"].length > this.#longestDataset) this.#longestDataset = this.#data["data"][i]["values"].length;
		}

		this.#paddings = {
			top: this.#padding,
			right: this.#canvas.width - this.#padding,
			bottom: this.#canvas.height - this.#padding,
			left: this.#padding
		};

		this.#gapXAxis = this.#paddings.right / this.#longestDataset;
		this.#gapYAxis = this.#paddings.bottom / this.#markerCountYAxis;

		this.#YAxisStepValue = (this.#maxValue - this.#minValue) / (this.#markerCountYAxis - 1);
	}

	#drawTitle(){
		this.#ctx.fillStyle = "black";
		this.#ctx.textAlign = "center";
		this.#ctx.font = "bold 16px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
		this.#ctx.fillText(this.#data.title, this.#canvas.width / 2, this.#paddings.top / 2);
	}

	#drawMainAxis(){
		this.#ctx.beginPath();
		this.#ctx.moveTo(this.#paddings.left, this.#paddings.top);
		this.#ctx.lineTo(this.#paddings.left, this.#paddings.bottom);
		this.#ctx.lineTo(this.#paddings.right, this.#paddings.bottom);

		this.#ctx.strokeStyle = '#35374B';
		this.#ctx.lineWidth = 1;
		this.#ctx.stroke();
	}

	#drawXLines(){
		this.#ctx.strokeStyle = '#35374B';
		this.#ctx.lineWidth = this.#gridLineWidth;

		for (let i = 0; i < this.#markerCountYAxis; i++) {
			this.#ctx.beginPath();
			this.#ctx.moveTo(this.#paddings.left - this.#markerSize, this.#gapYAxis * i + this.#padding);
			this.#ctx.lineTo(this.#paddings.right, this.#gapYAxis * i + this.#padding);
			this.#ctx.stroke();
		}
	}

	#drawYLines(){
		this.#ctx.strokeStyle = '#35374B';
		this.#ctx.lineWidth = this.#gridLineWidth;

		for(let i = 0; i < this.#longestDataset; i++){
			const x = i * this.#gapXAxis + this.#padding;
			this.#ctx.beginPath();
			this.#ctx.moveTo(x, this.#paddings.top);
			this.#ctx.lineTo(x, this.#paddings.bottom + this.#markerSize);
			this.#ctx.stroke();
		}
	}

	#drawLines(){
		const scaleY = (this.#canvas.height - this.#padding * 2) / (this.#maxValue - this.#minValue);

		this.#ctx.lineWidth = 2;

		for(let i = 0; i < this.#data["data"].length; i++){
			const values = this.#data["data"][i]["values"];

			this.#ctx.beginPath();
			this.#ctx.moveTo(this.#paddings.left, this.#paddings.bottom - (values[0] - this.#minValue) * scaleY);
			this.#ctx.strokeStyle = this.#data["data"][i]["color"];

			for(let j = 0; j < values.length; j++){
				const x = j * this.#gapXAxis + this.#padding;
				const y = this.#paddings.bottom - (values[j] - this.#minValue) * scaleY;
				this.#ctx.lineTo(x, y);
			}

			this.#ctx.stroke();
		}
	}

	#drawCircle(){
		const scaleY = (this.#canvas.height - this.#padding * 2) / (this.#maxValue - this.#minValue);

		for (let i = 0; i < this.#data["data"].length; i++) {
			const values = this.#data["data"][i]["values"];

			for(let j = 0; j < values.length; j++){
				const x = j * this.#gapXAxis + this.#padding;
				const y = this.#paddings.bottom - (values[j] - this.#minValue) * scaleY;
				this.#ctx.beginPath();
				this.#ctx.fillStyle = this.#data["data"][i]["color"];
				this.#ctx.arc(x, y, this.#circleRad, 0, Math.PI * 2);
				this.#ctx.fill();
			}
		}
	}

	#drawMarkersXAxis(){
		for(let i = 0; i < this.#longestDataset; i++){
			const x = i * this.#gapXAxis + this.#padding;

			this.#ctx.textAlign = "center";
			this.#ctx.font = " 11px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
			this.#ctx.fillStyle = "black";
			this.#ctx.fillText(i, x, this.#paddings.bottom + this.#markerSize * 2.5);
		}
	}

	#drawMarkersYAxis(){
		for(let i = 0; i < this.#markerCountYAxis; i++){
			this.#ctx.textAlign = "right";
			this.#ctx.font = " 11px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
			this.#ctx.textBaseline = "middle";
			this.#ctx.fillText(this.#maxValue - i * this.#YAxisStepValue, this.#paddings.left - this.#markerSize * 2.5, i * this.#gapYAxis + this.#padding);
		}
	}

	#drawLegends(){
		const rectWidth = 20;
		const rectHeight = 10;
		const gap = 50;

		// put to the center (x axis)
		let startX = (this.#canvas.width) / 2;

		// - text widths
		for(let i = 0; i < this.#data["data"].length; i++)
			startX -= this.#ctx.measureText(this.#data["data"][i]["label"]).width / 2;

		// - rectangles
		startX -= this.#data["data"].length * rectWidth / 2;

		// - Gaps
		startX -= (this.#data["data"].length - 1) * gap / 2;

		for(let i = 0; i < this.#data["data"].length; i++){
			this.#ctx.fillStyle = this.#data["data"][i]["color"];

			this.#ctx.fillRect(startX, this.#paddings.bottom + this.#padding / 2, rectWidth, rectHeight);

			this.#ctx.textBaseline = "top";
			this.#ctx.font = "bold 11px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
			this.#ctx.fillText(this.#data["data"][i]["label"], startX + gap, this.#paddings.bottom + this.#padding / 2);

			startX += this.#ctx.measureText(this.#data["data"][i]["label"]).width + rectWidth + gap;
		}
	}

}

window.customElements.define('x-line-chart', Line);







