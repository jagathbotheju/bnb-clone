import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <Container>
        <div className="mt-20 text-center">
          <Heading center title="Unauthorized Access" subtitle="Please Login" />
        </div>
      </Container>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (!reservations) {
    return (
      <Container>
        <div className="mt-20 text-center">
          <Heading
            center
            title="No reservations found"
            subtitle="Looks like you have no reservations on your properties"
          />
        </div>
      </Container>
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPage;
