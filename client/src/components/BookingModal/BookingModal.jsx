import React, { useContext } from "react";
import { MantineProvider, Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useState } from "react";
import { useMutation } from "react-query";
import UserDetailContext from "../../../../client/src/components/context/UserDetailContext";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);

  const {
    userDetails: { token }, setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("Booking Successful", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          data: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: (response) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <MantineProvider>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title="Select a date of visit"
        centered
      >
        <div className="flexColCenter">
          <DatePicker value={value} onChange={setValue} minDate={new Date()} />
          <Button disabled={!value || isLoading} onClick={() => mutate()}>
            Book A Visit
          </Button>
        </div>
      </Modal>
    </MantineProvider>
  );
};

export default BookingModal;
