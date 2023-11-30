import React, { useEffect, useState } from "react";
import { variables } from "./Variables";

const Employee = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    modal_title: "",
    emp_id: 0,
    emp_name: "",
    emp_dept_id: 0,
    emp_date_of_joining: "",
    emp_profile_pic: "github.png",
  });

  const fetchAllEmployees = async () => {
    fetch(variables.API_URL + "employee", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setEmployees(result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const fetchAllDepartment = async () => {
    fetch(variables.API_URL + "department", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setDepartments(result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchAllEmployees();
    fetchAllDepartment();
  }, []);

  const openModal = (isUpdate = false) => {
    if (isUpdate) {
      setModalData({ ...modalData, modal_title: "Update Employee" });
    } else {
      setModalData({ ...modalData, modal_title: "Add Employee" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addEmployee = async () => {
    fetch(variables.API_URL + "employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: modalData.emp_name,
        dept_id: modalData.emp_dept_id,
        date_of_joining: modalData.emp_date_of_joining,
        profile_photo: modalData.emp_profile_pic,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        fetchAllEmployees();
        closeModal();
      })
      .catch((err) => alert(err));
  };

  const updateEmployee = async () => {
    fetch(variables.API_URL + "employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: modalData.emp_id,
        name: modalData.emp_name,
        dept_id: modalData.emp_dept_id,
        date_of_joining: modalData.emp_date_of_joining,
        profile_photo: modalData.emp_profile_pic,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        fetchAllEmployees();
        closeModal();
      })
      .catch((err) => alert(err));
  };

  const deleteEmp = async (emp_id) => {
    fetch(variables.API_URL + "employee/" + emp_id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        fetchAllEmployees();
      })
      .catch((err) => alert(err));
  };

  const uploadProfilePic = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.PHOTO_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setModalData({ ...modalData, emp_profile_pic: result });
        //console.log(result);
      })
      .catch((err) => console.log(err));
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
        Add Employee
      </button>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Department</th>
            <th scope="col">Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((emp) => {
              return (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.dept_id}</td>
                  <td>{emp.date_of_joining}</td>
                  <td>
                    <i
                      className="bi bi-pencil-square"
                      onClick={() => {
                        openModal(true);
                        setModalData({
                          ...modalData,
                          emp_id: emp.id,
                          emp_name: emp.name,
                          emp_dept_id: emp.dept_id,
                          emp_date_of_joining: emp.date_of_joining,
                          emp_profile_pic: emp.profile_photo,
                        });
                      }}
                    ></i>
                    <i
                      className="bi bi-trash"
                      onClick={() => {
                        deleteEmp(emp.id);
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
          className="modal fade show modal-lg"
          id="employeeModal"
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
                <div className="row">
                  <div className="col-lg-8">
                    <div className="form-group">
                      <label htmlFor="employeeName">Employee Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="employeeName"
                        placeholder="Enter Employee Name"
                        onChange={(e) => {
                          setModalData({
                            ...modalData,
                            emp_name: e.target.value,
                          });
                        }}
                        value={modalData.emp_name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="employeeName">Employee Department</label>
                      <select
                        className="form-control"
                        id="employeeDepartment"
                        value={modalData.emp_dept_id || ""}
                        onChange={(e) => {
                          setModalData({
                            ...modalData,
                            emp_dept_id: e.target.value,
                          });
                        }}
                      >
                        {departments &&
                          departments.map((dept) => {
                            return (
                              <option
                                key={dept.id}
                                // value={dept.id}
                                value={dept.id}
                              >
                                {dept.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="employeeDateofJoining">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="employeeDateofJoining"
                        placeholder="Enter Employee Joining Date"
                        onChange={(e) => {
                          setModalData({
                            ...modalData,
                            emp_date_of_joining: e.target.value,
                          });
                        }}
                        value={
                          modalData.emp_date_of_joining
                            ? new Date(modalData.emp_date_of_joining)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div>
                      <img
                        width="250px"
                        height="200px"
                        src={
                          variables.IMG_URL + "/" + modalData.emp_profile_pic
                        }
                        className="rounded float-right"
                        alt="Profile Picture"
                      />
                    </div>
                    <div>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="profile_pic"
                          onChange={(e) => {
                            uploadProfilePic(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
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
                    if (modalData.emp_id > 0) {
                      updateEmployee();
                    } else {
                      addEmployee();
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

export default Employee;
