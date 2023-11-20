import React, { useEffect, useState } from "react";
import { variables } from "./Variables";

const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await fetch(variables.API_URL + "department", {
        method: "GET",
      });
      if (res.ok) {
        let resBody = await res.json();
        setDepartments(resBody);
      }
    })();
  }, []);

  return (
    <>
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
                  <i class="bi bi-pencil-square"></i>
                  <i class="bi bi-trash"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Department;
