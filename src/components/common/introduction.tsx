export default function Introduction({title, src}: {title?: string, src?: string}) {
    return (
		<div className="flex flex-col items-center text-center">
			<h1 className="block w-full font-bold sm:text-2xl">{title || "Belum Ada Jadwal yang Tersimpan"}</h1>
			<div className="max-w-md">
				<img className="object-cover" src={src || "/confused.png"} alt={src ? "confused" : title} loading="lazy" />
			</div>
		</div>
	);
}