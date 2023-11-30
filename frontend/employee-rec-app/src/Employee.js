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

  const openModal = (isUpdate) => {
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
                      }}
                    ></i>
                    <i className="bi bi-trash"></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {showModal && (
        <div
          className="modal fade show"
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
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="employeeName">Employee Department</label>
                      <select className="form-control" id="employeeDepartment">
                        {departments &&
                          departments.map((dept) => {
                            return (
                              <option key={dept.id} id={dept.id}>
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
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <img
                      src="../../../Photos/github.png"
                      className="rounded float-right"
                      alt="..."
                    />
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
                <button type="button" className="btn btn-primary">
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
