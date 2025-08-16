"use client"

import { useState, useEffect } from "react"
import DashboardContent from "./Dashboard"
import AnalyticsDashboard from "./Analytics"
import CustomerDashboard from "./CustomerManagement"
import ImagePreviewModal from "./../components/ImagePreviewModal"
import Setting from "./SettingsPage"
import Notification from "./../components/Notifiction"
import EmployeeManagement from "./EmpManage"
import {
  Home,
  Package,
  Users,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  DollarSign,
  ShoppingCart,
  Activity,
  Leaf,
  Star,
  Filter,
  Award,
  Globe,
  Building2,
  BadgeIcon as IdCard,
  TrendingUpIcon as TrendingUpDown,
} from "lucide-react"
import { supabase } from "./../../SupaBase/supa"
import { useNavigate } from "react-router-dom"
import "./../styles/Home.css"
import AdminAuthModal from "./../components/passwordConfirmation"

const AdminDashboard = () => {
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [products, setProducts] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [passwdpop, setPasswdpop] = useState(false)
  const [productMode, setProductMode] = useState("add")
  const [newProduct, setNewProduct] = useState({
    name: "",
    serial_no: "",
    description: "",
    manufactureDate: "",
    exp_date: "",
    ingredients: "",
    price: "",
    priceUnit: "USD",
    size: "",
    shipment: "",
    accreditations: "",
    companyName: "",
    noquantity: "",
  })
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedAccreditationImages, setUploadedAccreditationImages] = useState([])
  const [uploadedCompanyLogo, setUploadedCompanyLogo] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [stats, setStats] = useState([])

  const [commonCustomers, setCommonCustomers] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    logo: null,
  })

  const salesData = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 2000, revenue: 9800 },
    { month: "Apr", sales: 2780, revenue: 3908 },
    { month: "May", sales: 1890, revenue: 4800 },
    { month: "Jun", sales: 2390, revenue: 3800 },
  ]

  const categoryData = [
    { name: "Premium", value: 35, color: "#10b981" },
    { name: "Classic", value: 45, color: "#059669" },
    { name: "Organic", value: 20, color: "#047857" },
  ]

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from("dashboard_stats")
          .select("total_revenue, total_orders, no_products, customer_rating, no_feedbacks")
          .single()

        if (error) throw error

        setStats([
          {
            title: "Total Revenue",
            value: data.total_revenue || "$0",
            change: "+0%",
            icon: DollarSign,
            color: "emerald",
          },
          {
            title: "Total Orders",
            value: data.total_orders?.toString() || "0",
            change: "+0%",
            icon: ShoppingCart,
            color: "blue",
          },
          {
            title: "Active Products",
            value: data.no_products?.toString() || "0",
            change: "+0%",
            icon: Package,
            color: "purple",
          },
          {
            title: "Customer Rating",
            value: data.customer_rating?.toString() || "0.0",
            change: "+0.0",
            icon: Star,
            color: "yellow",
          },
          {
            title: "Total Feedbacks",
            value: data.no_feedbacks?.toString() || "0",
            change: "+0%",
            icon: TrendingUpDown,
            color: "red",
          },
        ])
      } catch (error) {
        setStats([
          { title: "Total Revenue", value: "$0", change: "+0%", icon: DollarSign, color: "emerald" },
          { title: "Total Orders", value: "0", change: "+0%", icon: ShoppingCart, color: "blue" },
          { title: "Active Products", value: "0", change: "+0%", icon: Package, color: "purple" },
          { title: "Customer Rating", value: "0.0", change: "+0.0", icon: Star, color: "yellow" },
          { title: "Total Feedbacks", value: "0", change: "+0%", icon: Activity, color: "gray" },
        ])
      }
    }

    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select(
            "product_id, name, serial_no, description, manufacturedate, exp_date, incredients, price, size, shipment, datetimeofAdd, status, no_Items, Sell, price_unit",
          )

        if (error) throw error

        const formattedProducts = data.map((product) => ({
          id: product.product_id,
          name: product.name,
          serial_no: product.serial_no,
          description: product.description || "No description",
          manufactureDate: product.manufacturedate,
          exp_date: product.exp_date,
          ingredients: product.incredients || "No ingredients listed",
          price: product.price,
          size: product.size,
          shipment: product.shipment || "No shipment info",
          datetimeofAdd: product.datetimeofAdd,
          status: product.status,
          noquantity: product.no_items?.toString() || "0",
          sell: product.Sell || "0",
          priceUnit: product.price_unit || "USD",
          rating: "4.5",
        }))

        setProducts(formattedProducts)
        console.log("Products loaded:", formattedProducts.length)
      } catch (error) {
        console.error("Error fetching products:", error.message)
        setProducts([])
      }
    }

    fetchStats()
    fetchProducts()
  }, [])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "products", label: "Products", icon: Package },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "customers", label: "Customers", icon: Users },
    { id: "employees", label: "Employees", icon: IdCard },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleAuthResult = (isValid) => {
    if (isValid) {
      removeProduct(selectedProductId)
    } else {
      console.log("Access denied")
    }
    setPasswdpop(false)
    setSelectedProductId("")
  }

  const addProduct = async () => {
    if (
      newProduct.name &&
      newProduct.serial_no &&
      newProduct.price &&
      newProduct.size &&
      newProduct.manufactureDate &&
      newProduct.exp_date
    ) {
      const product = {
        name: newProduct.name,
        serial_no: Number.parseInt(newProduct.serial_no),
        description: newProduct.description,
        manufactureDate: newProduct.manufactureDate,
        exp_date: newProduct.exp_date,
        ingredients: newProduct.ingredients,
        price: Number.parseFloat(newProduct.price),
        size: Number.parseFloat(newProduct.size),
        shipment: newProduct.shipment,
        datetimeofAdd: new Date().toISOString(),
        status: true,
        quantity: newProduct.noquantity?.toString() || "",
        sell: "0",
      }

      try {
        const { data, error } = await supabase.from("products").insert([product]).select().single()

        if (error) throw error

        setProducts([
          ...products,
          {
            ...product,
            id: data.product_id,
            priceUnit: "USD",
            images: [],
            accreditationImages: [],
            companyLogo: null,
            commonCustomers: [],
            sales: 0,
            rating: 4.5,
            stock: 0,
          },
        ])
        setNewProduct({
          name: "",
          serial_no: "",
          description: "",
          manufactureDate: "",
          exp_date: "",
          ingredients: "",
          price: "",
          priceUnit: "INR",
          size: "",
          shipment: "",
          noquantity: "",
          accreditations: "",
          companyName: "",
        })
        setUploadedImages([])
        setUploadedAccreditationImages([])
        setUploadedCompanyLogo(null)
        setCommonCustomers([])
        setShowAddProduct(false)
      } catch (error) {
        console.error("Error adding product:", error.message)
        alert("Failed to add product. Please try again.")
      }
    }
  }

  const handleProductEdit = async (id) => {
    setSelectedProductId(id)
    const { data, error } = await supabase.from("products").select("*").eq("product_id", id).single()

    if (error) {
      console.error("Error fetching product:", error)
      return
    }

    setNewProduct({
      name: data.name || "",
      serial_no: data.serial_no || "",
      description: data.description || "",
      manufactureDate: data.manufacturedate || data.manufactureDate || "",
      exp_date: data.exp_date || "",
      ingredients: data.incredients || data.ingredients || "",
      price: data.price || "",
      priceUnit: data.price_unit || "USD",
      size: data.size || "",
      shipment: data.shipment || "",
      accreditations: data.accreditations || "",
      noquantity: data.quantity?.toString() || data.no_items?.toString() || "",
      sell: data.sell || data.Sell || "",
      companyName: data.company && data.company.length > 0 ? data.company[0] : "",
    })
    console.log(data.quantity)

    // Show the modal
    setShowAddProduct(true)
  }

  const removeProduct = async (id) => {
    try {
      console.log("Attempting to delete ID:", id)
      const { data, error } = await supabase.from("products").delete().eq("product_id", id)

      if (error) {
        console.error("Supabase error:", error)
        return
      }

      console.log("Deleted data:", data)

      setProducts((prev) => prev.filter((product) => product.id !== id))
    } catch (error) {
      console.error("Unexpected error:", error.message)
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          preview: event.target.result,
          name: file.name,
        }
        setUploadedImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })

    e.target.value = ""
  }

  const onDeleteClick = (id) => {
    setSelectedProductId(id)
    setPasswdpop(true)
  }

  const handleAccreditationImageUpload = (e) => {
    const files = Array.from(e.target.files)

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          preview: event.target.result,
          name: file.name,
        }
        setUploadedAccreditationImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })

    e.target.value = ""
  }

  const handleCompanyLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          preview: event.target.result,
          name: file.name,
        }
        setUploadedCompanyLogo(newImage)
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ""
  }

  const handleCustomerLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setNewCustomer({
          ...newCustomer,
          logo: {
            id: Date.now() + Math.random(),
            file: file,
            preview: event.target.result,
            name: file.name,
          },
        })
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ""
  }

  const addCustomer = () => {
    if (newCustomer.name && newCustomer.logo) {
      const customer = {
        id: Date.now() + Math.random(),
        name: newCustomer.name,
        logo: newCustomer.logo,
      }
      setCommonCustomers([...commonCustomers, customer])
      setNewCustomer({ name: "", logo: null })
      setShowAddCustomer(false)
    }
  }

  const handleUpdateProduct = async () => {
    if (productMode === "update") {
      if (
        !newProduct.name ||
        !newProduct.serial_no ||
        !newProduct.manufactureDate ||
        !newProduct.exp_date ||
        !newProduct.price ||
        !newProduct.size
      ) {
        alert("Please fill in all required fields before updating.")
        return
      }

      const { data, error } = await supabase
        .from("products")
        .update({
          name: newProduct.name,
          serial_no: newProduct.serial_no,
          description: newProduct.description || null,
          manufacturedate: newProduct.manufactureDate,
          exp_date: newProduct.exp_date,
          incredients: newProduct.ingredients || null,
          price: newProduct.price,
          size: newProduct.size,
          shipment: newProduct.shipment || null,
          datetimeofAdd: new Date().toISOString(),
          status: true,
          customer_ids: [],
          quantity: newProduct.noquantity,
          sell: newProduct.sell || 0,
          price_unit: newProduct.priceUnit,
        })
        .eq("product_id", selectedProductId)
        .select()

      if (error) {
        console.error("Error updating product:", error)
        alert("Failed to update product. Please try again.")
      } else {
        console.log("Product updated:", data)
        alert("Product updated successfully!")
        setShowAddProduct(false)
        const fetchProductsAgain = async () => {
          try {
            const { data, error } = await supabase
              .from("products")
              .select(
                "product_id, name, serial_no, description, manufacturedate, exp_date, incredients, price, size, shipment, datetimeofAdd, status, quantity, no_items, Sell, price_unit",
              )

            if (error) throw error

            const formattedProducts = data.map((product) => ({
              id: product.product_id,
              name: product.name,
              serial_no: product.serial_no,
              description: product.description || "No description",
              manufactureDate: product.manufacturedate,
              exp_date: product.exp_date,
              ingredients: product.incredients || "No ingredients listed",
              price: product.price,
              size: product.size,
              shipment: product.shipment || "No shipment info",
              datetimeofAdd: product.datetimeofAdd,
              status: product.status,
              noquantity: product.no_items?.toString() || product.no_items?.toString() || "0",
              sell: product.Sell,
              priceUnit: product.price_unit,
              rating: 4.5,
            }))

            setProducts(formattedProducts)
          } catch (error) {
            console.error("Error fetching products:", error.message)
            setProducts([])
          }
        }

        fetchProductsAgain()
      }
      setSelectedProductId("")
    }
  }

  const removeCustomer = (customerId) => {
    setCommonCustomers(commonCustomers.filter((customer) => customer.id !== customerId))
  }

  const removeCompanyLogo = () => {
    setUploadedCompanyLogo(null)
  }

  const removeImage = (imageId) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const removeAccreditationImage = (imageId) => {
    setUploadedAccreditationImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const renderDashboard = () => (
    <div className="coco-dashboard-content-area">
      <DashboardContent stats={stats} salesData={salesData} categoryData={categoryData} />
    </div>
  )

  const renderProducts = () => (
    <div className="coco-dashboard-products-content">
      <div className="coco-dashboard-products-header">
        <h2>Product Management</h2>
        <div className="coco-dashboard-products-actions">
          <button className="coco-dashboard-filter-btn">
            <Filter size={16} />
            Filter
          </button>
          <button
            className="coco-dashboard-add-btn"
            onClick={() => {
              setNewProduct({
                name: "",
                serial_no: "",
                description: "",
                manufactureDate: "",
                exp_date: "",
                ingredients: "",
                price: "",
                priceUnit: "USD",
                size: "",
                shipment: "",
                noquantity: "",
                accreditations: "",
                companyName: "",
              })
              setUploadedImages([])
              setUploadedAccreditationImages([])
              setUploadedCompanyLogo(null)
              setCommonCustomers([])
              setShowAddProduct(true)
              setProductMode("add")
            }}
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      <div className="coco-dashboard-products-grid">
        {products.map((product) => (
          <div key={product.id} className="coco-dashboard-product-card">
            <div className="coco-dashboard-product-image">
              <div className="coco-dashboard-product-placeholder">
                <Package size={32} />
              </div>
              <div className="coco-dashboard-product-actions">
                <button
                  className="coco-dashboard-product-action coco-dashboard-edit"
                  onClick={() => {
                    setProductMode("update")
                    handleProductEdit(product.id)
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="coco-dashboard-product-action coco-dashboard-delete"
                  onClick={() => onDeleteClick(product.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="coco-dashboard-product-info">
              <h4>{product.name}</h4>
              <div className="coco-dashboard-product-stats">
                <span className="coco-dashboard-product-price">${product.price}</span>
                <span className="coco-dashboard-product-stock">Stock: {product.noquantity}</span>
              </div>
              <div className="coco-dashboard-product-meta">
                <span className="coco-dashboard-product-sales">Sales: {product.sell}</span>
                <span className="coco-dashboard-product-rating">
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddProduct && (
        <div className="coco-dashboard-modal-overlay">
          <div className="coco-dashboard-modal">
            <div className="coco-dashboard-modal-header">
              <h3>{productMode === "update" ? "Update Product" : "Add New Product"}</h3>
              <button className="coco-dashboard-modal-close" onClick={() => setShowAddProduct(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="coco-dashboard-modal-content">
              <div className="coco-dashboard-form-row-2"></div>
              <div className="coco-dashboard-form-row-2">
                <div className="coco-dashboard-form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="coco-dashboard-form-group">
                  <label>Serial Number *</label>
                  <input
                    type="number"
                    value={newProduct.serial_no}
                    onChange={(e) => setNewProduct({ ...newProduct, serial_no: e.target.value })}
                    placeholder="Enter serial number"
                    required
                  />
                </div>
              </div>

              <div className="coco-dashboard-form-group coco-dashboard-form-group-full">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>

              <div className="coco-dashboard-form-row-3">
                <div className="coco-dashboard-form-group">
                  <label>Manufacture Date *</label>
                  <input
                    type="date"
                    value={newProduct.manufactureDate}
                    onChange={(e) => setNewProduct({ ...newProduct, manufactureDate: e.target.value })}
                    required
                  />
                </div>
                <div className="coco-dashboard-form-group">
                  <label>Expiry Date *</label>
                  <input
                    type="date"
                    value={newProduct.exp_date}
                    onChange={(e) => setNewProduct({ ...newProduct, exp_date: e.target.value })}
                    required
                  />
                </div>
                <div className="coco-dashboard-form-group">
                  <label>Price *</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select
                      value={newProduct.priceUnit}
                      onChange={(e) => setNewProduct({ ...newProduct, priceUnit: e.target.value })}
                      style={{
                        width: "100px",
                        height: "48px",
                        padding: "12px 8px",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                        borderRadius: "8px",
                        fontSize: "14px",
                        background: "rgba(255, 255, 255, 0.8)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="AED">AED (د.إ)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="CAD">CAD (C$)</option>
                      <option value="AUD">AUD (A$)</option>
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0.00"
                      required
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
              </div>

              <div className="coco-dashboard-form-row-2">
                <div className="coco-dashboard-form-group">
                  <label>Size (ml/g) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.size}
                    onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                    placeholder="Enter size"
                    required
                  />
                </div>
                <div className="coco-dashboard-form-group">
                  <label>Number of Availability *</label>
                  <input
                    type="number"
                    step="1"
                    value={newProduct.noquantity}
                    onChange={(e) => setNewProduct({ ...newProduct, noquantity: e.target.value })}
                    placeholder="Enter Quantity"
                    required
                  />
                </div>
                <div className="coco-dashboard-form-group">
                  <label>Shipment Details</label>
                  <textarea
                    value={newProduct.shipment}
                    onChange={(e) => setNewProduct({ ...newProduct, shipment: e.target.value })}
                    placeholder="Enter detailed shipment information, delivery instructions, packaging details, etc."
                    rows="3"
                  />
                </div>
              </div>

              <div className="coco-dashboard-form-group coco-dashboard-form-group-full">
                <label>Ingredients</label>
                <textarea
                  value={newProduct.ingredients}
                  onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })}
                  placeholder="Enter ingredients (comma separated)"
                  rows="2"
                />
              </div>

              <div className="coco-dashboard-form-group coco-dashboard-form-group-full">
                <label>
                  <Award size={16} style={{ display: "inline", marginRight: "8px" }} />
                  Accreditations & Certifications
                </label>
                <textarea
                  value={newProduct.accreditations}
                  onChange={(e) => setNewProduct({ ...newProduct, accreditations: e.target.value })}
                  placeholder="Enter certifications, awards, quality standards (e.g., ISO 9001, HACCP, Organic Certified, FDA Approved, etc.)"
                  rows="3"
                />
              </div>

              <div className="coco-dashboard-form-group coco-dashboard-form-group-full">
                <label>
                  <Globe size={16} style={{ display: "inline", marginRight: "8px" }} />
                  Common Customers
                </label>
                <div className="coco-dashboard-file-upload-container">
                  <button
                    type="button"
                    className="coco-dashboard-file-upload-btn"
                    onClick={() => setShowAddCustomer(true)}
                  >
                    <Plus size={20} />
                    Add Customer
                  </button>
                </div>
                <p className="coco-dashboard-file-hint">Add common customers with their company names and logos</p>
              </div>

              {commonCustomers.length > 0 && (
                <div className="coco-dashboard-image-preview-container coco-dashboard-form-group-full">
                  <label>Common Customers ({commonCustomers.length})</label>
                  <div className="coco-dashboard-image-preview-grid">
                    {commonCustomers.map((customer) => (
                      <div key={customer.id} className="coco-dashboard-image-preview-item coco-dashboard-customer-item">
                        <img
                          src={customer.logo.preview || "/placeholder.svg"}
                          alt={customer.name}
                          onClick={() => setSelectedImage(customer.logo)}
                          style={{ cursor: "pointer" }}
                        />
                        <button
                          type="button"
                          className="coco-dashboard-image-remove"
                          onClick={() => removeCustomer(customer.id)}
                        >
                          <X size={16} />
                        </button>
                        <span className="coco-dashboard-image-name">{customer.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="coco-dashboard-form-group coco-dashboard-form-group-full">
                <label>Product Images</label>
                <div className="coco-dashboard-file-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="coco-dashboard-file-input-hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="coco-dashboard-file-upload-btn">
                    <Plus size={20} />
                    Choose Product Images
                  </label>
                </div>
                <p className="coco-dashboard-file-hint">Upload product photos, packaging images, etc.</p>
              </div>

              {/* Product Image Preview */}
              {uploadedImages.length > 0 && (
                <div className="coco-dashboard-image-preview-container coco-dashboard-form-group-full">
                  <label>Product Images ({uploadedImages.length})</label>
                  <div className="coco-dashboard-image-preview-grid">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="coco-dashboard-image-preview-item">
                        <img
                          src={image.preview || "/placeholder.svg"}
                          alt={image.name}
                          onClick={() => setSelectedImage(image)}
                          style={{ cursor: "pointer" }}
                        />
                        <button
                          type="button"
                          className="coco-dashboard-image-remove"
                          onClick={() => removeImage(image.id)}
                        >
                          <X size={16} />
                        </button>
                        <span className="coco-dashboard-image-name">{image.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="coco-dashboard-form-group coco-dashboard-form-group-full">
                <label>
                  <Award size={16} style={{ display: "inline", marginRight: "8px" }} />
                  Accreditation Certificates & Awards
                </label>
                <div className="coco-dashboard-file-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAccreditationImageUpload}
                    className="coco-dashboard-file-input-hidden"
                    id="accreditation-upload"
                  />
                  <label htmlFor="accreditation-upload" className="coco-dashboard-file-upload-btn">
                    <Award size={20} />
                    Choose Certificates
                  </label>
                </div>
                <p className="coco-dashboard-file-hint">Upload certificates, awards, quality standards documents</p>
              </div>

              {uploadedAccreditationImages.length > 0 && (
                <div className="coco-dashboard-image-preview-container coco-dashboard-form-group-full">
                  <label>Accreditation Images ({uploadedAccreditationImages.length})</label>
                  <div className="coco-dashboard-image-preview-grid">
                    {uploadedAccreditationImages.map((image) => (
                      <div key={image.id} className="coco-dashboard-image-preview-item">
                        <img
                          src={image.preview || "/placeholder.svg"}
                          alt={image.name}
                          onClick={() => setSelectedImage(image)}
                          style={{ cursor: "pointer" }}
                        />
                        <button
                          type="button"
                          className="coco-dashboard-image-remove"
                          onClick={() => removeAccreditationImage(image.id)}
                        >
                          <X size={16} />
                        </button>
                        <span className="coco-dashboard-image-name">{image.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ImagePreviewModal image={selectedImage} onClose={() => setSelectedImage(null)} />
            </div>
            <div className="coco-dashboard-modal-actions">
              <button className="coco-dashboard-btn-secondary" onClick={() => setShowAddProduct(false)}>
                Cancel
              </button>
              <button
                className="coco-dashboard-btn-primary"
                onClick={productMode === "add" ? () => addProduct() : () => handleUpdateProduct()}
              >
                {productMode === "add" ? "Add Product" : "Update Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminAuthModal isOpen={passwdpop} onClose={() => setPasswdpop(false)} onAuthResult={handleAuthResult} />

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="coco-dashboard-modal-overlay">
          <div className="coco-dashboard-modal" style={{ maxWidth: "500px" }}>
            <div className="coco-dashboard-modal-header">
              <h3>Add Customer</h3>
              <button className="coco-dashboard-modal-close" onClick={() => setShowAddCustomer(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="coco-dashboard-modal-content">
              <div className="coco-dashboard-form-group">
                <label>Customer Company Name *</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="Enter customer company name"
                  required
                />
              </div>

              <div className="coco-dashboard-form-group">
                <label>Customer Logo *</label>
                <div className="coco-dashboard-file-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomerLogoUpload}
                    className="coco-dashboard-file-input-hidden"
                    id="customer-logo-upload-modal"
                  />
                  <label htmlFor="customer-logo-upload-modal" className="coco-dashboard-file-upload-btn">
                    <Building2 size={20} />
                    Choose Customer Logo
                  </label>
                </div>
                <p className="coco-dashboard-file-hint">Upload customer company logo</p>
              </div>

              {/* Customer Logo Preview */}
              {newCustomer.logo && (
                <div className="coco-dashboard-image-preview-container">
                  <label>Customer Logo Preview</label>
                  <div className="coco-dashboard-image-preview-grid" style={{ gridTemplateColumns: "120px" }}>
                    <div className="coco-dashboard-image-preview-item">
                      <img
                        src={newCustomer.logo.preview || "/placeholder.svg"}
                        alt={newCustomer.logo.name}
                        onClick={() => setSelectedImage(newCustomer.logo)}
                        style={{ cursor: "pointer" }}
                      />
                      <button
                        type="button"
                        className="coco-dashboard-image-remove"
                        onClick={() => setNewCustomer({ ...newCustomer, logo: null })}
                      >
                        <X size={16} />
                      </button>
                      <span className="coco-dashboard-image-name">{newCustomer.logo.name}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="coco-dashboard-modal-actions">
              <button className="coco-dashboard-btn-secondary" onClick={() => setShowAddCustomer(false)}>
                Cancel
              </button>
              <button
                className="coco-dashboard-btn-primary"
                onClick={addCustomer}
                disabled={!newCustomer.name || !newCustomer.logo}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderAnalytics = () => (
    <div className="coco-dashboard-analytics-content">
      <AnalyticsDashboard salesData={salesData} />
    </div>
  )

  const renderCustomers = () => (
    <div className="coco-dashboard-customers-content">
      <CustomerDashboard />
    </div>
  )

  const renderEmployees = () => {
    return <EmployeeManagement />
  }

  const renderSettings = () => {
    return <Setting />
  }

  const renderNotification = () => {
    return <Notification visible={true} />
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      localStorage.removeItem("rememberedUsername")
      localStorage.removeItem("rememberedPassword")
      navigate("/auth")
    } catch (error) {
      console.error("Logout error:", error)
      alert("Logout failed. Please try again.")
    }
  }

  return (
    <div className="coco-admin-dashboard">
      {/* Background Elements */}
      <div className="coco-dashboard-background-elements">
        <div className="coco-dashboard-floating-element coco-dashboard-element-1"></div>
        <div className="coco-dashboard-floating-element coco-dashboard-element-2"></div>
        <div className="coco-dashboard-floating-element coco-dashboard-element-3"></div>
        <div className="coco-dashboard-floating-element coco-dashboard-element-4"></div>
        <div className="coco-dashboard-leaf coco-dashboard-leaf-1">
          <Leaf size={24} />
        </div>
        <div className="coco-dashboard-leaf coco-dashboard-leaf-2">
          <Leaf size={32} />
        </div>
        <div className="coco-dashboard-leaf coco-dashboard-leaf-3">
          <Leaf size={20} />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`coco-dashboard-sidebar ${sidebarOpen ? "coco-dashboard-sidebar-open" : "coco-dashboard-sidebar-closed"}`}
      >
        <div className="coco-dashboard-sidebar-header">
          <div className="coco-dashboard-logo">
            <div className="coco-dashboard-logo-circle">
              <Leaf size={24} />
            </div>
            {sidebarOpen && (
              <div className="coco-dashboard-logo-text">
                <h2>Coco Admin</h2>
                <p>Virgin Oil Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <nav className="coco-dashboard-sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`coco-dashboard-nav-item ${activeSection === item.id ? "coco-dashboard-nav-active" : ""}`}
              onClick={() => {
                setActiveSection(item.id)
                setSidebarOpen(false)
              }}
            >
              <item.icon size={24} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="coco-dashboard-sidebar-footer">
          <button className="coco-dashboard-nav-item coco-dashboard-logout" onClick={handleLogout}>
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="coco-dashboard-mobile-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="coco-dashboard-main-content">
        {/* Header */}
        <header className="coco-dashboard-header">
          <div className="coco-dashboard-header-left">
            <button className="coco-dashboard-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <div className="coco-dashboard-search-bar">
              <Search size={16} />
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div className="coco-dashboard-header-right">
            <button className="coco-dashboard-notification-btn">
              <Bell size={20} onClick={() => renderNotification()} />
              <span className="coco-dashboard-notification-badge">3</span>
            </button>
            <div className="coco-dashboard-user-profile">
              <div className="coco-dashboard-user-avatar">
                <Users size={16} />
              </div>
              <div className="coco-dashboard-user-info">
                <span>Admin User</span>
                <small>Administrator</small>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="coco-dashboard-content">
          {activeSection === "dashboard" && renderDashboard()}
          {activeSection === "products" && renderProducts()}
          {activeSection === "analytics" && renderAnalytics()}
          {activeSection === "customers" && renderCustomers()}
          {activeSection === "employees" && renderEmployees()}
          {activeSection === "settings" && renderSettings()}
          {showNotification && renderNotification()}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard