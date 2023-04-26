import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservations";
import Container from "../components/Container";
import Heading from "../components/Heading";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <div className="p-10 m-10 bg-red-300 rounded">
        <h2 className="text-2xl font-semibold">
          Not Authorized, Please Log In
        </h2>
      </div>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });
  if (listings.length === 0) {
    return (
      <div className="mt-20">
        <Container>
          <Heading
            title="No Properties Found"
            subtitle="Looks like you have no properties!"
          />
        </Container>
      </div>
    );
  }

  return (
    <div>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </div>
  );
};

export default PropertiesPage;
