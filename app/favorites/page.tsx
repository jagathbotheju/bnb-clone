import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import Container from "../components/Container";
import Heading from "../components/Heading";
import FavoriteClient from "./FavoriteClient";

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    <Container>
      <div className="flex text-center mt-20 h-full items-center">
        <Heading
          title="No favorites found"
          subtitle="Looks like you have no favorite listings"
          center
        />
      </div>
    </Container>;
  }

  return <FavoriteClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
