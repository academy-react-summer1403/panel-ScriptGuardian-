// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";

const PaymentShowScreenModal = ({
  isOpenModal,
  toggleAcceptModal,
  paymentInvoiceImage,
  groupName,
}) => {
  return (
    <Modal
      isOpen={isOpenModal}
      toggle={toggleAcceptModal}
      className="modal-dialog-centered "
    >
      <div
        style={{
          width: "414px",
          height: "50px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginInline: "auto",
        }}
      >
        <div
          style={{
            background: "",
          }}
        >
          نام گروه:{groupName}
        </div>

        <div
          style={{
            width: "",
          }}
        >
          X
        </div>
      </div>

      <ModalBody className="text-center">
        <img
          src={paymentInvoiceImage}
          alt="Payment Invoice"
          className="img-fluid rounded shadow"
          style={{
            width: "90%",
            height: "90%",
            objectFit: "contain",
            marginBottom: "30px",
          }}
        />
      </ModalBody>
    </Modal>
  );
};

export default PaymentShowScreenModal;
