import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import Datasets from "@/comps/RootAdmin/Datasets";
import { useAppSelector } from "@/hooks/useStoreTypes";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const DatasetsPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <Layout>
      <DashboardContainer>
        <Datasets />
      </DashboardContainer>
    </Layout>
  );
};

export default DatasetsPage;
