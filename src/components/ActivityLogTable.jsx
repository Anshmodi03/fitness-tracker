import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Unique icons for pagination
import { InputText } from "primereact/inputtext"; // InputText for editable fields
import metsData from "../data/mets.json"; // Import METs data
import "./ActivityLogTable.css"; // Importing custom CSS

const ActivityLogTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [data, setData] = useState(metsData);
  const [editingRow, setEditingRow] = useState(null);
  const [localData, setLocalData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null); // State for the toast message
  const [showPopup, setShowPopup] = useState(false); // State to show/hide the popup
  const [newEntry, setNewEntry] = useState({
    activity: "",
    motion: "",
    met: "",
  }); // State for new entry

  // Calculate the data for the current page
  const currentData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle editing
  const handleEdit = (index) => {
    setEditingRow(index);
    setLocalData({ ...currentData[index] });
  };

  // Save changes
  const handleSave = (index) => {
    const updatedData = [...data];
    updatedData[currentPage * itemsPerPage + index] = { ...localData };
    setData(updatedData);
    setEditingRow(null);
    setToastMessage("Changes saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle adding new entry
  const handleAddNewEntry = () => {
    setData([newEntry, ...data]);
    setShowPopup(false); // Close the popup
    setToastMessage("New entry added successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle navigation
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < data.length)
      setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // Current date based on page
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - currentPage);

  return (
    <div className="activity-log-table-container">
      {/* Toast message */}
      {toastMessage && <div className="toast-message">{toastMessage}</div>}

      {/* Add New Entry Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="add-new-entry-button"
      >
        Add New Entry
      </button>

      {/* Popup for Adding New Entry */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <h3>Add New Entry</h3>
            <div>
              <label>Activity:</label>
              <InputText
                value={newEntry.activity}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, activity: e.target.value })
                }
              />
            </div>
            <div>
              <label>Motion:</label>
              <InputText
                value={newEntry.motion}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, motion: e.target.value })
                }
              />
            </div>
            <div>
              <label>MET:</label>
              <InputText
                value={newEntry.met}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, met: e.target.value })
                }
              />
            </div>
            <button onClick={handleAddNewEntry}>Save New Entry</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="navigation-buttons">
        <div className="pagination-icon-left" onClick={handlePreviousPage}>
          <FaChevronLeft />
        </div>

        <div className="date-section">{currentDate.toDateString()}</div>

        <div className="pagination-icon-right" onClick={handleNextPage}>
          <FaChevronRight />
        </div>
      </div>

      {/* Data Table */}
      <div className="activity-log-table">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Motion</th>
              <th>MET</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, index) => (
              <tr key={index}>
                <td>
                  {editingRow === index ? (
                    <InputText
                      value={localData?.activity}
                      onChange={(e) =>
                        setLocalData({ ...localData, activity: e.target.value })
                      }
                    />
                  ) : (
                    entry.activity
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <InputText
                      value={localData?.motion}
                      onChange={(e) =>
                        setLocalData({ ...localData, motion: e.target.value })
                      }
                    />
                  ) : (
                    entry.motion
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <InputText
                      value={localData?.met}
                      type="number"
                      onChange={(e) =>
                        setLocalData({ ...localData, met: e.target.value })
                      }
                    />
                  ) : (
                    entry.met
                  )}
                </td>
                <td>
                  {editingRow === index ? (
                    <div
                      className="save-icon"
                      onClick={() => handleSave(index)}
                    >
                      <i className="fa-solid fa-floppy-disk"></i>{" "}
                      {/* FontAwesome save icon */}
                    </div>
                  ) : (
                    <div
                      className="edit-icon"
                      onClick={() => handleEdit(index)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogTable;
