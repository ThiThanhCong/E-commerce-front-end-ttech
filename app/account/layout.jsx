import Header from "../../components/Header";
import Navigator from "../../components/Navigator";

export default function LoginLayout({ children }) {
  return (
    <>
      <div className="h-[70px]"></div>

      <div>
        <Header />
      </div>
      <div>
        <Navigator />
      </div>

      {children}
    </>
  );
}
