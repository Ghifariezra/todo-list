import { useState, useCallback } from "react";
import { NotebookPen, Menu, X } from "lucide-react";
import { ListLink } from "@/components/common/navbar/list-nav";
import { Link } from "react-router-dom";

const LinkPath = [
	{
		name: "Riwayat Catatan",
		href: "/riwayat",
	},
];

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const toggleMenu = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);


	return (
		<>
			<Link to="/" className="flex items-center gap-2 place-content-start">
				<NotebookPen className="size-6  rounded-md" />
				<h1 className="font-bold text-xl">Notebook</h1>
			</Link>

			<ul className="hidden sm:flex items-center gap-4 font-medium place-content-end">
				{LinkPath.map((link) => (
					<ListLink key={link.name} href={link.href} className="cursor-pointer hover:text-blue-500 duration-800 ease-in-out">
						{link.name}
					</ListLink>
				))}
			</ul>

			<div className="flex place-content-end">
				<div onClick={toggleMenu} className="sm:hidden block w-fit cursor-pointer">
					{open ? <X className="size-6" /> : <Menu className="size-6" />}
				</div>
			</div>

			{open && (
				<ul className="flex sm:hidden flex-col items-center gap-4 font-medium col-span-2 place-content-center">
					{LinkPath.map((link) => (
						<ListLink key={link.name} href={link.href} className="cursor-pointer hover:text-blue-500 duration-800 ease-in-out">
							{link.name}
						</ListLink>
					))}
				</ul>
			)}
		</>
	);
}
