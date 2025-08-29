import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/utils.js";
import { getAllProducts } from "../services/productService.js"; // Refactored Code

const PAGE_LIMIT = 5;

function Home() {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser") || "");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { products, totalPages } = await getAllProducts(page, PAGE_LIMIT);
        setProducts(products);
        setTotalPages(totalPages);
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logout Successful");
    setTimeout(() => navigate("/login"), 1000);
  };

  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div id="home-page">
      <div id="top-bar">
        <span id="user-name">Welcome {loggedInUser}</span>
        <button id="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div id="products-container">
        <h2>Products</h2>
        <table id="products-table">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{(page - 1) * PAGE_LIMIT + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No Products found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
