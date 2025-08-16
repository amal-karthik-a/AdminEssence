import React, { useEffect, useState } from "react";
import { supabase } from "../../SupaBase/supa";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);

      // 1. Get the currently logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // 2. Get all employees
      const { data, error } = await supabase
        .from("profiles")
        .select("pro_id, is_admin, email, emp_id");

      if (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
        return;
      }

      setEmployees(data);

      // 3. Check if the current user is admin
      const currentUser = data.find((emp) => emp.email === user.email);
      if (currentUser && currentUser.is_admin) {
        setIsCurrentUserAdmin(true);
      }

      setLoading(false);
    };

    fetchEmployees();
  }, []);

  const openPopup = (employee) => setSelectedEmployee(employee);
  const closePopup = () => setSelectedEmployee(null);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">Loading employees...</p>
      </div>
    );
  }

  const employeeList = employees.filter((e) => !e.is_admin);
  const adminList = employees.filter((e) => e.is_admin);

  const renderCards = (list) =>
    list.map((employee) => (
      <div
        key={employee.pro_id}
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
      >
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            {employee.email.split("@")[0]}
          </h4>
          <p className="text-gray-600">
            {employee.is_admin ? "Admin" : "Employee"}
          </p>
          <span className="text-sm text-gray-500">{employee.email}</span>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => openPopup(employee)}
          >
            View Details
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Remove
          </button>
        </div>
      </div>
    ));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Employee Management</h3>
        <p className="text-gray-600">
          Manage your team members and their information
        </p>
      </div>

      {/* Employees Section */}
      <div className="mb-10">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Employees</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderCards(employeeList)}
        </div>
      </div>

      {/* Admin Section (only if current user is admin) */}
      {isCurrentUserAdmin && (
        <div>
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Admins</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderCards(adminList)}
          </div>
        </div>
      )}

      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Employee Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-gray-900">{selectedEmployee.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <p className="mt-1 text-gray-900">{selectedEmployee.emp_id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Admin Status
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedEmployee.is_admin ? "Admin" : "Non-Admin"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile ID
                </label>
                <p className="mt-1 text-gray-900">{selectedEmployee.pro_id}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
