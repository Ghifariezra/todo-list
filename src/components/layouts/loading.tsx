import { memo } from "react";

export const Loading = memo(function Loading() {
	return (
		<div className="min-h-svh flex items-center justify-center">
			<span className="loading loading-infinity loading-xs bg-blue-600"></span>
			<span className="loading loading-infinity loading-sm bg-blue-600"></span>
			<span className="loading loading-infinity loading-md bg-blue-600"></span>
			<span className="loading loading-infinity loading-lg bg-blue-600"></span>
			<span className="loading loading-infinity loading-xl bg-blue-600"></span>
		</div>
	);
});