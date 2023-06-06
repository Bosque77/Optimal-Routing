import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";
import BillingDetails from "./BillingDetails"
import BillingHistory from "./BillingHistory";
import PaymentSection from "./PaymentSection";
import AccountSettings from "./AccountSettings";
import UserManagement from "./UserManagement";
import TierCard from "./TierCard";

const AccountPage = () => {
    return (
        <div className="flex min-h-screen bg-background-dumpster text-black-dumpster overflow-y-auto">
            <Alert />
            <div className="w-64 bg-slate-50">
                <SideNav />
            </div>
            <div className="mx-auto flex flex-col w-2/3 py-8 px-6">
                <h1 className="text-4xl mb-8">Billing & Account</h1>
                <BillingDetails />
                <div className="my-6">
                  <TierCard />
                </div>
                <BillingHistory />
                <PaymentSection />
                <AccountSettings />
                <UserManagement />
            </div>
        </div>
    )
}

export default AccountPage;
