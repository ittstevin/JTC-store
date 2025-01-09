import Container from "@/app/components/Container";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import UserSupportComponent from "@/app/components/support/UserSupportComponent";
import AdminSupportComponent from "./AdminSupportComponent";

const SupportPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Access denied" />;
  }

  return (
    <div className="p-8">
      <Container>
        {currentUser.role === "ADMIN" ? <AdminSupportComponent /> : <UserSupportComponent />}
      </Container>
    </div>
  );
};

export default SupportPage;
