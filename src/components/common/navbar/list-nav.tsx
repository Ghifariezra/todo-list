import { memo } from "react";
import { Link } from "react-router-dom";

export const ListLink = memo(function ListLink({ children, className, href, onClick }: React.PropsWithChildren<{ className?: string; href?: string, onClick?: () => void }>) {
	return (
		<li onClick={onClick} className={className}>
			<Link to={href || ""}>{children}</Link>
		</li> 
	);
});
