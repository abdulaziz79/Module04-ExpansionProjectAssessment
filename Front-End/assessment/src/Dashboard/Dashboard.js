import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


import AddProduct from "../AddProduct/AddProduct";
// import UpdateRegime from "../../components/UpdateRegime/UpdateRegime";


export default function Dashboard() {


  const [item, setItem] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isUpdateRegimeOpen, setIsUpdateRegimeOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description:"",
    price:"",
    category:"",
    supplier:""
  });

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/read`
      );
      if (response) {
        const transformedData = response.data.map((item, index) => ({
          id: item.id, 
          title:item.title,
          description: item.description,
          price:item.price,
          category:item.category,
          supplier:item.supplier
     
        }));
        setItem(transformedData);
        setIsLoading(false);
      } else {
        // console.log('no data available')
        setItem([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
// console.log(item)
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(
        `${process.env.REACT_APP_PATH}product/add`,
        formDataToSend
      );

      setItem((prevItems) => [...prevItems, response.data.data]);


      setFormData({
        title: "",
        description: "",
        // image: null
      });
   

      // console.log("DATAAA" + response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();

  }, []);

  const columns = [
    // { field: 'id', headerName: 'id', width: 80 },
    { field: "title", headerName: "Title", width: 140 },

    {
      field: "description",
      headerName: "Description",
      width: 140,
      renderCell: (params) => (
        <div className={styles.description}>{params.row.description}</div>
      ),
    },
    { field: "category", headerName: "Category", width: 140 },
    { field: "price", headerName: "Price", width: 140 },
    {
      field: 'Action',
    headerName: 'Actions',
    width: 140,
    renderCell: (params) => (
      <div>
        <button
          className={`${styles.btn} ${styles}`}
          style={{
            marginRight: "0.5rem",
            fontFamily: "bold",
            fontSize: "16px",
            "&:hover": { color: "green" },
          }}
          onClick={() => handleEditt(params.row.id)}
        >
          Edit
        </button>

          <button
            className={styles.btn}
            style={{ fontFamily: "bold", fontSize: "16px" }}
            onClick={() => handleDeletee(params.row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEditt = (rowId) => {
    console.log(`Edit clicked for item with ID: ${rowId}`);
    setIsUpdateRegimeOpen(true)
    const selectedRow= item.find((row)=>row.id===rowId)
    setItem(selectedRow)
  };

  const handleDeletee = async (id) => {
    try {
      console.log("Deleting item with ID:", id);
      const response = await axios.delete(
        `${process.env.REACT_APP_PATH}regime/delete`,
        {
          data: { id: id },
        }
      );
      if (response.data.message === "Deleted Successfully") {
        setItem((prevItems) => prevItems.filter((item) => item.id !== id));
        console.log("Regime plan deleted successfully");

      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };




  
 
 
  const handleAdd = (e) => {
    e.preventDefault();
    setIsAddProductOpen(true);
  };

  const handleUpdates = (e) => {
    console.log("clickedd");
    e.preventDefault();
    setIsUpdateRegimeOpen(true);
  };
  const handlecancel = (e) => {
    e.preventDefault();
    setIsAddProductOpen(false);
  };
  const emptyRow = { id: -1, name: "Loading..." };

  const rowsWithEmptyRow = isloading ? [emptyRow] : item;

  return (
    <div className={styles.body}>
    <div
      style={{
        width: "90%",
        float: "left",
        margin: "auto",
        height: "70vh",
        width:"80%",
        marginBottom: "7rem",
        marginBottom: "10rem",
        // backgroundColor:"black",
        padding:"30px"
      }}
    >
      <h1 style={{ fontSize: 45, fontWeight: "bold", marginBottom: 30 }}>
       Products
      </h1>
      <button
        className={styles.btnAdd}
        style={{
          color: "white",
          marginBottom: "1rem",
          width: "7rem",
          height: "2.5rem",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
        onClick={handleAdd}
      >
        Add Plan
      </button>
      <DataGrid
        // getRowId={getRowId}
        rows={rowsWithEmptyRow}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
          color: "black",
          // border:"none",
          paddingTop: "1rem",
          border: "1px solid black",
          borderRadius: "17px",
          "& .MuiDataGrid-root": {
            backgroundColor: "black",
          },
          "& .MuiDataGrid-columnHeader": {
            // Background color of column headers
            color: "black",
            fontFamily: "Outfit",
            fontSize: "19px",
            // Text color of column headers
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ccc", // Border between cells
            color: "black",
            fontSize: "17px",
            // Text color of cells
          },
          "& .MuiTablePagination-root": {
            color: "black", // Text color of pagination
          },
          "& .MuiDataGrid-toolbar": {
            color: "black",
            backgroundColor: "black", // Background color of the toolbar
          },
          "& .MuiDataGrid-toolbarContainer": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "black",
            // color: 'blue',
          },
          "& .MuiButtonBase-root": {
            color: "black", // Text color for buttons in the toolbar
          },
          "& .MuiPaginationItem-icon": {
            color: "black", // Color of pagination icons
          },
          "& .MuiSvgIcon-root": {
            color: "black",
          },
          "& .MuiDataGrid-row , & .MuiDataGrid-cell": {
            maxHeight: "80px !important",
            height: "80px !important",
          },
        }}
      />
      {isAddProductOpen && (
        <AddProduct
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsAddProductOpen(false)}
          handleSubmit={handleSubmit}
        />
      )}
 

    </div>
    </div>
  );
}

const CustomToolbar = () => {
  return (
    <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
  );
};