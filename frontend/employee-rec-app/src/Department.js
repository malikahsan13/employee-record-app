import React, { useEffect, useState } from "react";
import { variables } from "./Variables";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    modal_title: "",
    department_id: 0,
    department_name: "",
  });

  const fetchAllDepartment = async () => {
    let res = await fetch(variables.API_URL + "department", {
      method: "GET",
    });
    if (res.ok) {
      let resBody = await res.json();
      setDepartments(resBody);
    }
  };

  useEffect(() => {
    fetchAllDepartment();
  }, []);

  const addDepartment = async () => {
    fetch(variables.API_URL + "department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: modalData.department_name }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        closeModal();
        fetchAllDepartment();
      })
      .catch((err) => alert("Error adding data"));
  };

  const updateDepartment = () => {
    fetch(variables.API_URL + "department", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: modalData.department_id,
        name: modalData.department_name,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        closeModal();
        fetchAllDepartment();
      })
      .catch((err) => alert(err));
  };

  const deleteDepartment = (id) => {
    fetch(variables.API_URL + "department/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        fetchAllDepartment();
        closeModal();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const openModal = (isUpdate = false) => {
    setShowModal(true);
    if (isUpdate) {
      setModalData({ ...modalData, modal_title: "Update Department" });
    } else {
      setModalData({
        ...modalData,
        modal_title: "Add Department",
        department_id: 0,
        department_name: "",
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          openModal();
        }}
      >
        Add Department
      </button>

      <table className="table table-stripped">
        <thead>
          <tr>
            <th scope="col">Department ID</th>
            <th scope="col">Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => {
            return (
              <tr key={dept.id}>
                <td>{dept.id}</td>
                <td>{dept.name}</td>
                <td>
                  <i
                    className="bi bi-pencil-square"
                    onClick={() => {
                      openModal(true);
                      setModalData({
                        ...modalData,
                        department_id: dept.id,
                        department_name: dept.name,
                      });
                    }}
                  ></i>
                  <i
                    className="bi bi-trash"
                    onClick={() => {
                      deleteDepartment(dept.id);
                    }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <div
          className="modal fade show"
          id="departmentModal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          // aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {modalData.modal_title}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="departmentName">Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="departmentName"
                    placeholder="Enter Department Name"
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        department_name: e.target.value,
                      })
                    }
                    value={modalData.department_name}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (modalData.department_id > 0) {
                      updateDepartment();
                    } else {
                      addDepartment();
                    }
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Department;
