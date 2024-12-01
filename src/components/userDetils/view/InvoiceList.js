// ** React Imports
import { useState, useEffect } from "react";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  ExternalLink,
  Printer,
  FileText,
  File,
  Clipboard,
  Copy,
} from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

// ** Store & Actions
// import { getData } from '@src/views/apps/invoice/store'
import { useDispatch, useSelector } from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomSpinner from "../../common/animation/CustomSpiner";

const InvoiceList = ({ data }) => {
  // ** Store Vars
  const dispatch = useDispatch();
  // const store = useSelector(state => state.invoice)

  // ** States
  const [value] = useState("");
  const [rowsPerPage] = useState(6);
  const [currentPage] = useState(1);
  const [statusValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [Test, setTest] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ]);

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            sortServer
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={data}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            noDataComponent={
              <>
                {!data ? (
                  <CustomSpinner
                    style={"text-primary"}
                    style2={{ marginTop: "100px", marginBottom: "100px" }}
                    color={""}
                  />
                ) : (
                  <h2 style={{ marginTop: "100px", marginBottom: "100px" }}>
                    رزروی وجود ندارد
                  </h2>
                )}
              </>
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;
