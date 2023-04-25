import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
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

  const reservations = await getReservations({
    userId: currentUser.id,
  });
  if (!reservations) {
    return (
      <div className="p-10 m-10 bg-red-300 rounded">
        <h2 className="text-2xl font-semibold">No Reservations Found...</h2>
      </div>
    );
  }

  return (
    <div>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </div>
  );
};

export default TripsPage;
