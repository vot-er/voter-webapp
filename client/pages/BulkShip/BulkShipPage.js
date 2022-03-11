import React, { useState } from "react";
import { bulkShip } from "../../actions/kitActions";
import { SubmitButton } from "../../components";

function BulkShipPage() {
  const [codes, setCodes] = useState([]);
  const [results, setResults] = useState([]);

  const getCodes = () => codes.replace(/[ ]*,[ ]*|[ ]+/g, "").split(/\n/g);

  const handleChange = (val) => {
    setCodes(val.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedCodes = getCodes();
    const result = await bulkShip(cleanedCodes);
    setResults(result);
    return result;
  };

  const renderResults = () => {
    if (results.length < 1) return null;
    return (
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Kit</th>
            <th>Status</th>
            <th>Failure Reason</th>
          </tr>
        </thead>
        <tbody>
          {results.map((key, n) => {
            return createRow(key, n);
          })}
        </tbody>
      </table>
    );
  };

  const createRow = (key, n) => {
    return (
      <tr key={n}>
        <td>{key.code}</td>
        <td>{key.kitId}</td>
        <td>{key.status}</td>
        <td>{key.failureReason}</td>
      </tr>
    );
  };

  return (
    <div className="fill fill-height flex-column bulk-update-page">
      <h1>Bulk Ship Kits</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={codes}
          style={{ width: 500, height: 400 }}
          onChange={handleChange}
          placeholder="Add a list of line separated codes to mark unshipped kits as shipped."
        />
        <SubmitButton
          className="btn btn-primary signup-button"
          isSubmitting={false}
          value="Bulk Update"
        />
      </form>
      {renderResults()}
    </div>
  );
}
export default BulkShipPage;
