export default function Introduction({title}: {title?: string}) {
    return (
		<div className="flex flex-col items-center text-center">
			<h1 className="block w-full font-bold sm:text-2xl">{title || "Belum Ada Jadwal yang Tersimpan"}</h1>
			<div className="max-w-md">
				<img className="object-cover" src="/confused.png" alt="Wajah bingung emoticon" loading="lazy" />
			</div>
		</div>
	);
}