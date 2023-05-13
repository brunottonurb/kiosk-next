import { useEffect, useState } from 'react';
import cx from 'classnames';

export default function BVG() {
	const [data, setData] = useState<any>({
		isLoading: true,
	});

	const fetchDepartures = async () => {
		try {
			const res = await fetch('/api/bvg');
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

	// update every 30 seconds
	useEffect(() => {
		fetchDepartures();
		const interval = setInterval(() => {
			fetchDepartures();
		}, 1000 * 30);
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
				fetchDepartures();
			}}
			className="w-full h-full overflow-auto"
		>
			<h2 className="text-l">{process.env.BVG_STOP_LABEL}</h2>
			<table className="table-auto w-full">
				<thead className="sticky top-0 bg-white">
					<tr>
						<th className="text-left px-2 py-2">Linie</th>
						<th className="text-left px-2 py-2">Ziel</th>
						<th className="text-left px-2 py-2">Abfahrt von</th>
						<th className="text-left px-2 py-2">Abfahrt in</th>
					</tr>
				</thead>
				<tbody className="w-full bg-black text-orange-500">
					{data.map((departure: any) => {
						if (!departure.plannedWhen) {
							return null;
						}

						let timeRemaining: string | number = Math.floor(
							(new Date(departure.plannedWhen).getTime() - new Date().getTime()) / 1000 / 60
						);

						if (timeRemaining <= 0) {
							timeRemaining = 'Jetzt';
						} else {
							timeRemaining = String(timeRemaining);
						}

						return {
							...departure,
							timeRemaining,
						};
					}).sort((a: any, b: any) => {
						if (a.timeRemaining === 'Jetzt') {
							return -1;
						} else if (b.timeRemaining === 'Jetzt') {
							return 1;
						} else {
							return a.timeRemaining - b.timeRemaining;
						}
					}).map((departure: any) => {
						return (
							<tr key={departure.tripId}>
								<td className="px-2 py-2">{departure.line.name}</td>
								<td className="px-2 py-2">{departure.direction}</td>
								<td className="px-2 py-2">{departure.stop.name}</td>
								<td className="px-2 py-2">{departure.timeRemaining}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
