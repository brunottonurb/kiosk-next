import { useEffect, useState } from 'react';

export default function Weather() {
	const [data, setData] = useState<any>({
		isLoading: true,
	});

	const fetchWeather = async () => {
		try {
			const res = await fetch('/api/weather');
			const data = await res.json();
			setData(data);
		} catch (err) {
			console.error(err);
			setData({
				isLoading: false,
				error: err,
			});
		}
	};

	// update every 15 minutes
	useEffect(() => {
		fetchWeather();
		const interval = setInterval(() => {
			fetchWeather();
		}, 1000 * 60 * 15);
		return () => clearInterval(interval);
	}, []);

	if (data.isLoading) {
		return (
			<div className="p-2 cursor-pointer bg-gray-100 active:shadow-inner active:bg-gray-200">
				<h2 className="text-xl">Loading...</h2>
			</div>
		);
	}

	if (data.error) {
		return (
			<div className="p-2 cursor-pointer bg-gray-100 active:shadow-inner active:bg-gray-200">
				<h2 className="text-xl">Error</h2>
			</div>
		);
	}

	return (
		<div
			onClick={() => {
				setData({
					isLoading: true,
				});
				fetchWeather();
			}}
			className="p-2 cursor-pointer bg-gray-100 active:shadow-inner active:bg-gray-200 w-full h-full overflow-auto"
		>
			<div className="flex flex-row">
				<img alt="weather" className="h-16" src={`icons/${data.weather[0].icon}.png`} />
				<div className="flex flex-col">
					<p className="text-3xl">{Math.round(data.main.temp * 10) / 10}°C</p>
					<p className="text-sm">{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</p>
				</div>
			</div>
			<p className="text-sm">Feels like {Math.round(data.main.feels_like * 10) / 10}°C</p>
			<div className="flex flex-row items-center space-x-1 pl-1 text-sm mt-2">
				<div className="" style={{
					transform: `rotate(${data.wind.deg}deg)`,
				}}>➤</div>
				<div>{data.wind.speed}m/s</div>
			</div>
			<p className='text-sm'>Humidity: {data.main.humidity}%</p>
			<p className='text-sm'>Pressure: {data.main.pressure}hPa</p>
		</div>
	);
}
