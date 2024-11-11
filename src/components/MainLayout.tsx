import NavBar from "./NavBar";

interface mainLayoutProps {
    nav: string;
    children: React.ReactNode;
}

const MainLayout: React.FC<mainLayoutProps> = ({children, nav}) => {
    return (
        <div>
            <NavBar name={nav} />
            {children}
        </div>
    )
}
export default MainLayout;