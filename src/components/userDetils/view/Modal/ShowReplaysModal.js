import StateManagedSelect from "react-select";
import {
  Button,
  Card,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { selectThemeColors } from "@utils";
import { Check, ChevronDown, X } from "react-feather";
import { useFormik } from "formik";
import { useUpdateUser } from "../../../../core/services/api/Admin/handelChangeProfileUser";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { columnsForReplayComment } from "./comp/columns";

const ShowReplaysModal = ({ show, setShow, data, refetch }) => {
  return (
    <>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="invoice-list-wrapper">
            <Card>
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  sortServer
                  columns={columnsForReplayComment(refetch)}
                  responsive={true}
                  // onSort={handleSort}
                  data={data}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable overflow-visible"
                  defaultSortField="invoiceId"
                />
              </div>
            </Card>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ShowReplaysModal;
