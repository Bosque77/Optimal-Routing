import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";


const RoutePage = () => {
    return (
        <div className="bg-slate-100 flex h-full">
          <Alert />
          <div className="w-64 bg-slate-50">
            <SideNav />
          </div>

      
        </div>
      );

}

export default RoutePage;