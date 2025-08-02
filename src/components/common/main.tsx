export default function Main({ children, id }: React.PropsWithChildren<{ id?: string }>) {
    return <main id={id} className="flex-1 bg-white p-4">{children}</main>;
}