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

const PaymentDetailsModal = ({
  isOpenModal,
  toggleAcceptModal,
  detailsPayment,
  isPending,
}) => {
  const queryClient = useQueryClient();

  const { mutate: Accept, isPending: acceptPending } = useAcceptUserPayment();
  const { mutate: Delete, isPending: deletePending } = useDeleteUserPayment();
  const handelAccept = (id) => {
    const newData = new FormData();
    newData.append("PaymentId", id);
    Accept(newData, {
      onSuccess: (data) => {
        if (data.success) {
          queryClient.invalidateQueries("GetUsersPaymentDetails");
          toast.success("تایید پرداخت با موفقیت انجام شد");
          toast.success(data.message);
          toggleAcceptModal();
        } else {
          toast.error("خطا در تایید پرداخت");
        }
      },
    });
  };

  const handelDelete = (id) => {
    const newData = new FormData();
    newData.append("PaymentId", id);
    Delete(newData, {
      onSuccess: (data) => {
        if (data.success) {
          queryClient.invalidateQueries("GetUsersPaymentDetails");
          toast.success("حذف پرداخت با موفقیت انجام شد");
          toast.success(data.message);
          toggleAcceptModal();
        } else {
          toast.error("خطا در حذف پرداخت");
        }
      },
    });
  };
  return (
    <Modal
      isOpen={isOpenModal}
      toggle={toggleAcceptModal}
      className="modal-dialog-centered"
      style={{ maxWidth: "800px", width: "100%" }}
    >
      <ModalHeader toggle={toggleAcceptModal} className="bg-primary text-white">
        <h5 className="modal-title text-white">جزئیات پرداخت</h5>
      </ModalHeader>
      <ModalBody className="text-center py-4">
        {/* تصویر بالای مودال */}
        {detailsPayment?.paymentInvoiceImage ? (
          <div className="mb-3">
            <img
              src={detailsPayment?.paymentInvoiceImage}
              alt="Invoice"
              style={{ width: "90%", marginBottom: "1rem" }}
              className="rounded-lg shadow-md"
            />
          </div>
        ) : (
          <p>تصویری بارگذاری نشده</p>
        )}

        {/* اطلاعات در ردیف */}
        <div
          className="d-flex justify-content-between mb-3"
          style={{ width: "90%", margin: "0 auto" }}
        >
          <div className="d-flex">
            <p className="font-weight-bold">نام دانشجو:</p>
            <p>{detailsPayment?.studentName}</p>
          </div>
          <div className="d-flex">
            <p className="font-weight-bold">نام دوره:</p>
            <p>{detailsPayment?.title}</p>
          </div>
        </div>

        <div
          className="d-flex justify-content-between mb-3"
          style={{ width: "90%", margin: "0 auto" }}
        >
          <div className="d-flex">
            <p className="font-weight-bold">مقدار پرداختی:</p>
            <p>{detailsPayment?.paid}</p>
          </div>
          <div className="d-flex">
            <p className="font-weight-bold">مقدار باقیمانده:</p>
            <p>{detailsPayment?.currentRemainder}</p>
          </div>
        </div>

        <div
          className="d-flex justify-content-between mb-3"
          style={{ width: "90%", margin: "0 auto" }}
        >
          <div className="d-flex">
            <p className="font-weight-bold">وضعیت پذیرش:</p>
            <p>{detailsPayment?.accept ? "پذیرفته شده" : "پذیرفته نشده"}</p>
          </div>
          <div className="d-flex">
            <p className="font-weight-bold">نام گروه دوره:</p>
            <p>{detailsPayment?.groupName}</p>
          </div>
        </div>

        <div className="">
          <div
            className="mb-3"
            style={{ width: "90%", margin: "0 auto", display: "flex" }}
          >
            <p className="font-weight-bold">تاریخ پرداخت:</p>
            <p>
              {detailsPayment?.peymentDate
                ? convertIsoToJalali(detailsPayment?.peymentDate)
                : "اطلاعات موجود نیست"}
            </p>
          </div>
        </div>
        {/* دکمه‌های پذیرش و رد */}

        {detailsPayment?.detailsPayment ? (
          ""
        ) : (
          <>
            {detailsPayment?.paymentInvoiceImage ? (
              <div className="d-flex justify-content-around mt-4">
                <Button
                  color="success"
                  onClick={() => {
                    handelAccept(detailsPayment?.id);
                  }}
                  style={{ width: "45%" }}
                >
                  پذیرش
                </Button>
                <Button
                  color="danger"
                  style={{ width: "45%" }}
                  onClick={() => {
                    handelDelete(detailsPayment?.id);
                  }}
                >
                  رد(حذف)
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-around mt-4">
                <h2>
                  به دلیل آپلود نکردن فیش پرداخت توسط کاربر امکان حذف یا تایید
                  نیست
                </h2>
              </div>
            )}
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export default PaymentDetailsModal;
