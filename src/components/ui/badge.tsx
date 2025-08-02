import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/lib/variants/badge";

function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<"span"> & { asChild?: boolean; variant?: "default" | "secondary" | "destructive" | "outline" }) {
	const Comp = asChild ? Slot : "span";

	return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
