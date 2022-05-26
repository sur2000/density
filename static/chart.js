var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: 1200,
  height: 600,
	layout: {
		backgroundColor: '#0C090A',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: '#8D918D',
		},
		horzLines: {
			color: '#8D918D',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	rightPriceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
});

var candleSeries = chart.addCandlestickSeries({
  upColor: '#00FFFF',
  downColor: '#000',
  borderDownColor: '#FF00FF',
  borderUpColor: '#FF00FF',
  wickDownColor: '#FF00FF',
  wickUpColor: '#FF00FF',
});

fetch('http://localhost:5000/history')
	.then((r) => r.json())
	.then((response) => {
		console.log(response)

		candleSeries.setData(response);
	}) 

	var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_15m"); 

	
binanceSocket.onmessage = function (event) {	
var message = JSON.parse(event.data); 

var candlestick = message.k;

	console.log(message.k)

	candleSeries.update({
		time: candlestick.t / 1000,
		open: candlestick.o,
		high: candlestick.h,
		low: candlestick.l,
		close: candlestick.c
	})
}
