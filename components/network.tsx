import { useEffect, useState } from 'react';

export default function Network() {
	const [data, setData] = useState<any>({
		isLoading: true,
	});

	const fetchNetwork = async () => {
		try {
			const res = await fetch('/api/network');
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

	// update every 1 minutes
	useEffect(() => {
		fetchNetwork();
		const interval = setInterval(() => {
			fetchNetwork();
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
				fetchNetwork();
			}}
			className="p-2 cursor-pointer bg-gray-100 active:shadow-inner active:bg-gray-200 w-full h-full overflow-auto"
		>
			<h2 className="text-xl">Network</h2>
			<div className="w-full">
				<table className="table-auto w-full">
					<tbody className="w-full">
						{data.map((device: any) => (
							<tr key={device.ip}>
								<td className="p-0 text-xs">{device.hostname}</td>
								<td className="p-0 text-xs">{device.ip}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
