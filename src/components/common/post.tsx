import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ListLink } from "@/components/common/navbar/list-nav";
import { FormAdd } from "@/components/common/card/form/form-post";
import { useNavigate } from "react-router-dom";

const LinkPath = [
	{
		name: "Add Note",
		color: "bg-green-600 hover:bg-green-700",
	},
];

export default function Post({ refetch }: { refetch: () => void }) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [openForm, setOpenForm] = useState<string | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	const toggleMenu = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const toggleMenu2 = useCallback(() => {
		setOpen2((prev) => !prev);
	}, []);

	const toggleForm = useCallback((name: string) => {
		setOpenForm(name);
	}, []);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			// Check if the click was outside the menu and close it
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);

	return (
		<>
			{open2 && openForm === "Add Note" && <FormAdd refetch={refetch} />}
			<div ref={ref} className="fixed bottom-4 right-4 group w-[60px]">
				<Button onClick={toggleMenu} aria-label={open ? "Tutup menu" : "Buka menu"} className="cursor-pointer bg-blue-600 group-hover:!bg-blue-700 duration-800 ease-in-out w-full">
					{open ? <X className="size-6" /> : <Plus className="size-6" />}
				</Button>
				{open && (
					<div className="absolute bottom-12 right-0 rounded-md bg-white border shadow-sm p-4 w-40">
						<ul className="flex flex-col items-center gap-2 text-sm">
							{LinkPath.map((link) => (
								<ListLink
									key={link.name}
									onClick={() => {
										// Check if the user is logged in
										const token = localStorage.getItem("token");
										if (!token) {
											navigate("/login");
										}

										// If the user is logged in, open the form
										toggleMenu2();
										toggleForm(link.name);
									}}
									className={`cursor-pointer transition duration-300 ease-in-out w-full ${link.color} text-white rounded-sm p-2`}
								>
									{link.name}
								</ListLink>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
