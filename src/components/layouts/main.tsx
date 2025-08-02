import Header from "@/components/common/header";
import Navbar from "@/components/common/navbar/navbar";
import { Outlet } from "react-router-dom";

export default function Main() {
    return (
        <div className="min-h-screen text-blue-600 transition-all">
            <Header>
                <Navbar />
            </Header>
            <Outlet />
        </div>
    );
}