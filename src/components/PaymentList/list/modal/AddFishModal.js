// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { convertIsoToJalali } from "../../../../core/utils/dateUtils";
import {
  useAcceptUserPayment,
  useDeleteUserPayment,
} from "../../../../core/services/api/Admin/handelUsers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AddFishModal = ({
  isOpenModal,
  toggleAcceptModal,
  detailsPayment,
  isPending,
}) => {
  const queryClient = useQueryClient();

  return (
    <Modal
      isOpen={isOpenModal}
      toggle={toggleAcceptModal}
      className="modal-dialog-centered modal-sm"
    >
      <ModalHeader toggle={toggleAcceptModal} className="bg-primary text-white">
        <h5 className="modal-title text-white">آپلود فیش پرداخت</h5>
      </ModalHeader>
      <ModalBody className="text-center py-4"></ModalBody>
    </Modal>
  );
};

export default AddFishModal;
