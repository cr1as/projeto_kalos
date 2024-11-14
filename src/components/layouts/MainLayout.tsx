import NavBar from "./NavBar";

interface mainLayoutProps {
    nav: string;
    children: React.ReactNode;
}

const MainLayout: React.FC<mainLayoutProps> = ({children, nav}) => {
    return (
        <div>
            <nav className="sticky top-0">
                <NavBar name={nav}/>
            </nav>
            <div>
            {children}
            </div>
        </div>
    )
}
export default MainLayout;