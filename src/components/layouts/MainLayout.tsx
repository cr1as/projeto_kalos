import NavBar from "./NavBar";

interface mainLayoutProps {
  nav: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<mainLayoutProps> = ({ children, nav }) => {
  return (
    <div>
      <div>
        <NavBar nome={nav} />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};
export default MainLayout;
