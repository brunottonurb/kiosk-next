import { useEffect, useState } from 'react';
import cx from 'classnames';

const pollutionClasses = (aqi: number) => cx(
	'p-2 cursor-pointer bg-gray-100 active:shadow-inner active:bg-gray-200 w-full h-full overflow-auto',
	/* Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor */
	/* Colors: green-500, green-400, yellow-500, yellow-400, red-500 */
	{
		'bg-green-500': aqi === 1,
		'bg-green-400': aqi === 2,
		'bg-yellow-500': aqi === 3,
		'bg-yellow-400': aqi === 4,
		'bg-red-500': aqi === 5,
	},
);

const getAirQualityLabel = (aqi: number) => {
	switch (aqi) {
		case 1:
			return 'Good';
		case 2:
			return 'Fair';
		case 3:
			return 'Moderate';
		case 4:
			return 'Poor';
		case 5:
			return 'Very Poor';
		default:
			return 'Unknown';
	}
};

export default function Pollution() {
	const [data, setData] = useState<any>({
		isLoading: true,
	});

	const fetchPollution = async () => {
		try {
			const res = await fetch('/api/pollution');
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
		fetchPollution();
		const interval = setInterval(() => {
			fetchPollution();
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
				fetchPollution();
			}}
			className={pollutionClasses(data.list[0].main.aqi)}
		>
			<h2 className="text-l">Air Quality</h2>
			<p className="text-4xl mb-2">{getAirQualityLabel(data.list[0].main.aqi)}</p>
			<table className="table-auto w-full">
				<tbody className="w-full">
					<tr>
						<td className="p-0 text-xs">CO</td>
						<td className="p-0 text-xs">{data.list[0].components.co}</td>
					</tr>
					<tr>
						<td className="p-0 text-xs">NO</td>
						<td className="p-0 text-xs">{data.list[0].components.no}</td>
					</tr>
					<tr>
						<td className="p-0 text-xs">NO2</td>
						<td className="p-0 text-xs">{data.list[0].components.no2}</td>
					</tr>
					<tr>
						<td className="p-0 text-xs">O3</td>
						<td className="p-0 text-xs">{data.list[0].components.o3}</td>
					</tr>
					<tr>
						<td className="p-0 text-xs">SO2</td>
						<td className="p-0 text-xs">{data.list[0].components.so2}</td>
					</tr>
					<tr>
						<td className="p-0 text-xs">PM2.5</td>
						<td className="p-0 text-xs">{data.list[0].components.pm2_5}</td>
					</tr>
					<tr>
						<td className="p-0 text-xs">PM10</td>
						<td className="p-0 text-xs">{data.list[0].components.pm10}</td>
					</tr>
					<tr>
						<td className="p-0 text-xs">NH3</td>
						<td className="p-0 text-xs">{data.list[0].components.nh3}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
