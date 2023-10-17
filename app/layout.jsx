import NavBar from "@/components/NavBar";
import "../styles/globals.css";
import { exo2, orbitron } from "@/app/fonts";

export const metadata = {
    title: {
        default: "Indie Gamer",
        template: "%s | Indie Gamer",
    },
    description: "Only the best games, review for you",
};

export default function RootLayout({ children }) {
    return (
        <html lang={"en"} className={`${exo2.variable} ${orbitron.variable}`}>
            <body className={"bg-orange-50 flex flex-col px-4 py-2 min-h-screen"}>
                <header>
                    <NavBar />
                </header>
                <main className={"py-3 grow"}>{children}</main>
                <footer className={"text-center text-xs border-t py-3 text-slate-500"}>
                    Game data and images{" "}
                    <a href={"https://rawg.io/"} target={"_blank"} className={"text-orange-800 hover:underline"}>
                        RAWG
                    </a>
                </footer>
            </body>
        </html>
    );
}
