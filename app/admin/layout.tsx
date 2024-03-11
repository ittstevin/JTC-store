import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "JTC Admin",
  description: "JTC Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
