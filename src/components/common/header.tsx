export default function Header({ children }: React.PropsWithChildren) {
	return <header className="grid grid-cols-2 bg-white drop-shadow-sm p-4 gap-4 sm:gap-0 sticky top-0">{children}</header>;
}
