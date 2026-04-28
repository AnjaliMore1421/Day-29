// Redux hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// async action
import { fetchPatients } from "../redux/slices/patientsSlice";

export default function Patients() {
  const dispatch = useDispatch();

  // get state from Redux store
  const { list, loading } = useSelector((state) => state.patients);

  // fetch API on page load
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <div>
      <h2>Patients List (Redux Toolkit + API)</h2>

      {/* loading state */}
      {loading && <p>Loading patients...</p>}

      {/* table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {list.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
