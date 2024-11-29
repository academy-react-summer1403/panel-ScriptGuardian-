// ** React Imports
import { useState, useEffect } from "react";

// ** Table Columns
import {
  columns,
  columns2,
  columns3ForComment,
  columns4ForPayMent,
  columns6ForWhosPayAndWhosNotPayed,
} from "./columns";

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
  User,
  Check,
  X,
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

// ** Store & Actions
// import { getData } from '@src/views/apps/invoice/store'
import { useDispatch, useSelector } from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const InvoiceList3 = ({ dataDonePay, active, toggleTab, notDonePays }) => {
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <div className="invoice-list-wrapper">
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Check className="font-medium-3 me-50" />
            <span className="fw-bold">به اتمام رسیده</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <X className="font-medium-3 me-50" />
            <span className="fw-bold">تمام نشده</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <Card>
            <div className="invoice-list-dataTable react-dataTable">
              <DataTable
                noHeader
                sortServer
                columns={columns6ForWhosPayAndWhosNotPayed}
                responsive={true}
                onSort={handleSort}
                data={dataDonePay}
                sortIcon={<ChevronDown />}
                className="react-dataTable"
                defaultSortField="invoiceId"
              />
            </div>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          <Card>
            <div className="invoice-list-dataTable react-dataTable">
              <DataTable
                noHeader
                sortServer
                columns={columns6ForWhosPayAndWhosNotPayed}
                responsive={true}
                onSort={handleSort}
                data={notDonePays}
                sortIcon={<ChevronDown />}
                className="react-dataTable"
                defaultSortField="invoiceId"
              />
            </div>
          </Card>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default InvoiceList3;
