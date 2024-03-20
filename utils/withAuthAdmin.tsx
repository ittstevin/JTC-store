import { useRouter } from "next/router";
import NullData from "@/app/components/NullData";
import getCurrentUser from "@/actions/getCurrentUser";
import { useEffect } from "react";

const withAuthAdmin = (WrappedComponent: React.FC<SummaryProps>) => {
  const WithAuthAdmin: React.FC<SummaryProps> = (props) => {
    const currentUser = getCurrentUser(); // You need to implement getCurrentUser() function

    const router = useRouter();

    useEffect(() => {
      if (!currentUser || currentUser.role !== "ADMIN") {
        router.push("/"); // Redirect to home or any other page
      }
    }, [currentUser, router]);

    if (!currentUser || currentUser.role !== "ADMIN") {
      return <NullData title="Access denied" />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthAdmin;
};

export default withAuthAdmin;
