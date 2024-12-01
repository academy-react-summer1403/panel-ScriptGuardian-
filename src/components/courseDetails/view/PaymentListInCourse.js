// ** React Imports
import { useState, useEffect } from "react";

// ** Table Columns
import { columns, PayColInCoursePage } from "./columns";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomSpinner from "../../common/animation/CustomSpiner";

const PaymentListInCourse = ({ data, id }) => {
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const filteredData = data?.filter((item) => item.courseId === id);

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            sortServer
            columns={PayColInCoursePage}
            responsive={true}
            onSort={handleSort}
            data={filteredData}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            noDataComponent={
              <>
                {!filteredData ? (
                  <CustomSpinner
                    style={"text-primary"}
                    style2={{ marginTop: "100px", marginBottom: "100px" }}
                    color={""}
                  />
                ) : (
                  <h2 style={{ marginTop: "100px", marginBottom: "100px" }}>
                    پرداختی وجود ندارد{" "}
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

export default PaymentListInCourse;
