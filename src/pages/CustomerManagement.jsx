import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Users, Plus, Building2, Eye, Edit, Trash2, User } from "lucide-react"
import { supabase } from "../../SupaBase/supa"

const CustomerManagement = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .select(`
          cust_id,
          name,
          dob,
          createdTimestamp,
          phno,
          RecoveryMail,
          email
        `)

      if (error) throw error

      setCustomers(data || [])
    } catch (error) {
      console.error("Error fetching customers:", error.message)
      setCustomers([])
    }
  }

  const handleEditCustomer = (custId) => {
    console.log("Edit customer:", custId)
    // navigate(`/edit-customer/${custId}`) // Optional
  }

  const handleDeleteCustomer = async (custId) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return
    try {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("cust_id", custId)
      if (error) throw error
      setCustomers(customers.filter(c => c.cust_id !== custId))
    } catch (error) {
      console.error("Error deleting customer:", error.message)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return (
    <div className="coco-dashboard-customers-content">
      <div className="coco-dashboard-customers-header">
        <h2>Customer Management</h2>
      </div>

      <div className="coco-dashboard-products-grid">
        {customers.map((cust) => (
          <div key={cust.cust_id} className="coco-dashboard-product-card">
            <div className="coco-dashboard-product-image">
              <div className="coco-dashboard-product-placeholder">
                <User size={32} />
              </div>
              <div className="coco-dashboard-product-actions">
                <button
                  className="coco-dashboard-product-action coco-dashboard-edit"
                  onClick={() => handleEditCustomer(cust.cust_id)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="coco-dashboard-product-action coco-dashboard-delete"
                  onClick={() => handleDeleteCustomer(cust.cust_id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="coco-dashboard-product-info">
              <h4>{cust.name}</h4>
              <div className="coco-dashboard-product-stats">
                <span className="coco-dashboard-product-price">📧 {cust.email}</span>
                <span className="coco-dashboard-product-stock">📱 {cust.phno}</span>
              </div>
              <div className="coco-dashboard-product-meta">
                <span className="coco-dashboard-product-sales">
                  DOB: {cust.dob}
                </span>
                <span className="coco-dashboard-product-rating">
                  Joined: {new Date(cust.createdTimestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerManagement
