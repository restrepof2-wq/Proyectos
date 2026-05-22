import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Upload, 
  Users, 
  ShoppingCart, 
  Settings, 
  CheckCircle, 
  BarChart3, 
  Download, 
  Plus, 
  Search, 
  FileText, 
  ArrowRight, 
  X, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Building,
  HelpCircle,
  Shield,
  Zap
} from 'lucide-react';

// PRODUCT PRESETS WITH STUNNING ICONS
const INITIAL_PRODUCTS = [
  { 
    id: 'p1', 
    title: 'Prensa Hidráulica H-600', 
    category: 'Maquinaria Industrial', 
    sku: 'MACH-PH600', 
    price: 45000, 
    moq: 1, 
    icon: '⚙️', 
    description: 'Prensa industrial de alta capacidad para forja y moldeado metálico de alta precisión. Estructura robusta de aleación y panel PLC automatizado.' 
  },
  { 
    id: 'p2', 
    title: 'Brazo Robotizado KUKA-X3', 
    category: 'Sistemas de Automatización', 
    sku: 'AUTO-KUX3', 
    price: 32000, 
    moq: 1, 
    icon: '🤖', 
    description: 'Brazo mecánico articulado de 6 ejes de alta precisión para ensamblaje rápido, soldadura y empaque automatizado.' 
  },
  { 
    id: 'p3', 
    title: 'Sensores IoT de Alta Precisión', 
    category: 'Sistemas de Automatización', 
    sku: 'AUTO-SEN9', 
    price: 150, 
    moq: 100, 
    icon: '📡', 
    description: 'Módulos sensores inalámbricos industriales para control térmico, presión e integridad estructural en tiempo real con soporte LoRaWAN.' 
  },
  { 
    id: 'p4', 
    title: 'Resina de Copoliéster Premium', 
    category: 'Materia Prima Premium', 
    sku: 'MAT-RCP88', 
    price: 85, 
    moq: 50, 
    icon: '🧪', 
    description: 'Polímero biodegradable de alta transparencia y resistencia al impacto. Especialmente certificado para empaques médicos y alimenticios.' 
  },
  { 
    id: 'p5', 
    title: 'Acero Aleado Estructural HZ', 
    category: 'Materia Prima Premium', 
    sku: 'MAT-AAE02', 
    price: 1200, 
    moq: 5, 
    icon: '🏗️', 
    description: 'Vigas estructurales de acero templado al cromo-molibdeno para alta carga sísmica. Estándar ASTM-A514 certificado.' 
  },
  { 
    id: 'p6', 
    title: 'Consultoría de Integración ERP', 
    category: 'Soporte & Consultoría', 
    sku: 'SERV-ERP01', 
    price: 150, 
    moq: 40, 
    icon: '💼', 
    description: 'Servicio profesional de diagnóstico, diseño e implementación para integrar su catálogo digital directamente con SAP o Dynamics 365.' 
  }
];

// INITIAL LEAD DATABASE FOR REASONABLE STATS
const INITIAL_LEADS = [
  { 
    id: 'l1', 
    clientName: 'Carlos Mendoza', 
    company: 'Industrias del Norte S.A.', 
    email: 'carlos.m@indnorte.com', 
    phone: '+52 81 1234 5678', 
    project: 'Automatización de la línea de ensamblaje principal en planta Monterrey.', 
    value: 32000, 
    date: '2026-05-18', 
    status: 'EN PROCESO', 
    urgency: 'Alta', 
    product: 'Brazo Robotizado KUKA-X3' 
  },
  { 
    id: 'l2', 
    clientName: 'Sofia Rossi', 
    company: 'EuroComponentes S.L.', 
    email: 's.rossi@eurocomp.es', 
    phone: '+34 91 765 4321', 
    project: 'Suministro de sensores IoT para control térmico de reactores.', 
    value: 15000, 
    date: '2026-05-19', 
    status: 'NUEVO', 
    urgency: 'Alta', 
    product: 'Sensores IoT de Alta Precisión' 
  },
  { 
    id: 'l3', 
    clientName: 'Alejandro Ruiz', 
    company: 'Materiales Avanzados Latam', 
    email: 'aruiz@matlatam.co', 
    phone: '+57 300 987 6543', 
    project: 'Compra piloto de resina de copoliéster para empaques biodegradables.', 
    value: 4250, 
    date: '2026-05-20', 
    status: 'COTIZADO', 
    urgency: 'Media', 
    product: 'Resina de Copoliéster Premium' 
  },
  { 
    id: 'l4', 
    clientName: 'Marta Gómez', 
    company: 'Construcciones Alfa', 
    email: 'mgomez@alfa-const.mx', 
    phone: '+52 55 8765 4321', 
    project: 'Suministro de vigas de acero estructural para nueva nave en Toluca.', 
    value: 24000, 
    date: '2026-05-21', 
    status: 'GANADO', 
    urgency: 'Baja', 
    product: 'Acero Aleado Estructural HZ' 
  }
];

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('propuesta'); // 'propuesta', 'catalogo', 'admin'
  const [adminSubTab, setAdminSubTab] = useState('leads'); // 'leads', 'cargar', 'analitica'
  
  // Database States
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('b2b_products');
    return local ? JSON.parse(local) : INITIAL_PRODUCTS;
  });
  const [leads, setLeads] = useState(() => {
    const local = localStorage.getItem('b2b_leads');
    return local ? JSON.parse(local) : INITIAL_LEADS;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('b2b_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('b2b_leads', JSON.stringify(leads));
  }, [leads]);

  // Lead Generation state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    volume: '1',
    urgency: 'Media',
    project: ''
  });

  // Public Catalog Filters
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('All');

  // Product Add state (Admin)
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Maquinaria Industrial',
    sku: '',
    price: '',
    moq: '1',
    icon: '📦',
    description: ''
  });

  // ROI Calculator states
  const [visits, setVisits] = useState(2500);
  const [conversion, setConversion] = useState(2.0);
  const [closeRate, setCloseRate] = useState(15);
  const [avgTicket, setAvgTicket] = useState(12000);

  // Proposal Signature States
  const [proposalSigned, setProposalSigned] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [signerCompany, setSignerCompany] = useState('');
  const [showSignatureToast, setShowSignatureToast] = useState(false);

  // General Notification System
  const [toastText, setToastText] = useState(null);

  const showToast = (text) => {
    setToastText(text);
    setTimeout(() => setToastText(null), 4000);
  };

  // ROI Calculations
  const leadsPerMonth = Math.round((visits * conversion) / 100);
  const salesPerMonth = Math.round(((leadsPerMonth * closeRate) / 100) * 10) / 10;
  const monthlyRevenue = Math.round(salesPerMonth * avgTicket);
  const annualRevenue = monthlyRevenue * 12;
  const costPhase1 = 12500;
  const paybackMonths = monthlyRevenue > 0 ? Math.round((costPhase1 / monthlyRevenue) * 10) / 10 : 0;

  // Lead Status Change handler
  const handleStatusChange = (leadId, newStatus) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: newStatus };
      }
      return lead;
    }));
    showToast(`Estado del Lead actualizado a "${newStatus}"`);
  };

  // Lead Delete handler
  const handleDeleteLead = (leadId) => {
    if (confirm('¿Está seguro de eliminar este prospecto?')) {
      setLeads(prev => prev.filter(lead => lead.id !== leadId));
      showToast('Lead eliminado exitosamente');
    }
  };

  // Form submission for quotes (Leads generated by customer)
  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.company || !leadForm.email) {
      alert('Por favor complete los campos obligatorios.');
      return;
    }

    const estimatedValue = selectedProduct ? (selectedProduct.price * parseInt(leadForm.volume || 1)) : 0;

    const newLead = {
      id: 'l_' + Date.now(),
      clientName: leadForm.name,
      company: leadForm.company,
      email: leadForm.email,
      phone: leadForm.phone,
      project: leadForm.project || `Interés en adquirir el producto comercial: ${selectedProduct ? selectedProduct.title : 'Sin especificar'}`,
      value: estimatedValue,
      date: new Date().toISOString().split('T')[0],
      status: 'NUEVO',
      urgency: leadForm.urgency,
      product: selectedProduct ? selectedProduct.title : 'General'
    };

    setLeads(prev => [newLead, ...prev]);
    setShowQuoteModal(false);
    
    // Clear form
    setLeadForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      volume: '1',
      urgency: 'Media',
      project: ''
    });

    // Custom success trigger
    showToast(`¡Solicitud enviada! Se ha registrado un lead de $${estimatedValue.toLocaleString()} USD en el CRM.`);
  };

  // Form submission for products (Admin uploading catalog)
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.sku || !newProduct.price) {
      alert('Por favor complete los campos obligatorios del producto.');
      return;
    }

    const p = {
      id: 'p_' + Date.now(),
      title: newProduct.title,
      category: newProduct.category,
      sku: newProduct.sku.toUpperCase(),
      price: parseFloat(newProduct.price),
      moq: parseInt(newProduct.moq || 1),
      icon: newProduct.icon,
      description: newProduct.description || 'Sin descripción detallada por el momento.'
    };

    setProducts(prev => [...prev, p]);
    showToast(`Producto "${p.title}" cargado con éxito al catálogo público.`);

    // Reset Form
    setNewProduct({
      title: '',
      category: 'Maquinaria Industrial',
      sku: '',
      price: '',
      moq: '1',
      icon: '📦',
      description: ''
    });
    
    // Auto shift to leads list to let them see
    setAdminSubTab('leads');
  };

  // Simulated CSV Export
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Cliente,Empresa,Email,Telefono,Producto,Valor Estimado (USD),Fecha,Estado,Urgencia\n";
    
    leads.forEach(lead => {
      csvContent += `"${lead.id}","${lead.clientName}","${lead.company}","${lead.email}","${lead.phone}","${lead.product}",${lead.value},"${lead.date}","${lead.status}","${lead.urgency}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `B2B_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exportación CSV generada y descargada");
  };

  // Handle Strategic Proposal Approval
  const handleApproveProposal = (e) => {
    e.preventDefault();
    if (!signerName || !signerCompany) {
      alert("Por favor ingrese su nombre y empresa para firmar.");
      return;
    }
    setProposalSigned(true);
    setShowSignatureToast(true);
    showToast("🎉 ¡Propuesta estratégica firmada y aprobada con éxito!");
  };

  // Compute CRM stats
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'NUEVO').length;
  const inProgressLeadsCount = leads.filter(l => l.status === 'EN PROCESO' || l.status === 'COTIZADO').length;
  const wonLeadsCount = leads.filter(l => l.status === 'GANADO').length;
  const lostLeadsCount = leads.filter(l => l.status === 'PERDIDO').length;
  
  const pipelineValue = leads.reduce((acc, lead) => {
    if (lead.status !== 'PERDIDO') return acc + lead.value;
    return acc;
  }, 0);

  const wonPipelineValue = leads.filter(l => l.status === 'GANADO').reduce((acc, lead) => acc + lead.value, 0);

  const conversionRate = totalLeadsCount > 0 ? Math.round((wonLeadsCount / totalLeadsCount) * 100) : 0;

  // Filtered Products for Catalog
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(catalogSearch.toLowerCase()) || 
                          p.sku.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                          p.description.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchesCategory = catalogCategory === 'All' || p.category === catalogCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Banner */}
      {toastText && (
        <div className="toast-notification">
          <Sparkles size={18} color="var(--accent-secondary)" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Premium Navbar */}
      <header 
        style={{ 
          borderBottom: '1px solid var(--border-glow)', 
          background: 'rgba(8, 12, 20, 0.8)', 
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          position: 'sticky', 
          top: 0, 
          zIndex: 100 
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              className="flex-center logo-icon animate-fade-in"
              style={{ 
                height: '42px', 
                width: '42px', 
                borderRadius: '12px', 
                color: '#fff',
                fontSize: '1.4rem',
                fontWeight: 'bold'
              }}
            >
              🚀
            </div>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 40%, var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                NexoB2B
              </h1>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.12em', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
                Consultoría & Soluciones Digitales
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glow)' }}>
            <button
              onClick={() => setActiveTab('propuesta')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: activeTab === 'propuesta' ? '#fff' : 'var(--text-secondary)',
                background: activeTab === 'propuesta' ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: activeTab === 'propuesta' ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Briefcase size={16} color={activeTab === 'propuesta' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
              Estrategia Comercial
            </button>

            <button
              onClick={() => setActiveTab('catalogo')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: activeTab === 'catalogo' ? '#fff' : 'var(--text-secondary)',
                background: activeTab === 'catalogo' ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: activeTab === 'catalogo' ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              <ShoppingCart size={16} color={activeTab === 'catalogo' ? 'var(--accent-secondary)' : 'var(--text-muted)'} />
              Catálogo Público (Demo)
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: activeTab === 'admin' ? '#fff' : 'var(--text-secondary)',
                background: activeTab === 'admin' ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: activeTab === 'admin' ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              <LayoutDashboard size={16} color={activeTab === 'admin' ? 'var(--color-success)' : 'var(--text-muted)'} />
              Administrador CRM
            </button>
          </nav>

        </div>
      </header>

      {/* Main Body */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '32px 24px' }} className="animate-fade-in-up">
        
        {/* PITCH / PROPOSAL TAB */}
        {activeTab === 'propuesta' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* HERO SECTION */}
            <div className="glass-panel text-center animate-fade-in" style={{ padding: '60px 40px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.04) 0%, rgba(6, 182, 212, 0.04) 100%)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex-center" style={{ marginBottom: '20px' }}>
                <span className="tag tag-success" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  <Sparkles size={12} style={{ marginRight: '6px' }} /> PROPUESTA ESTRATÉGICA CORPORATIVA
                </span>
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: '1.15' }}>
                Transformación Digital B2B:<br />
                <span style={{ background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Catálogo Inteligente & Gestión de Prospectos
                </span>
              </h2>
              <p style={{ maxWidth: '780px', margin: '0 auto 32px auto', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Diseño e implementación de un ecosistema comercial digital moderno. Permita a sus compradores corporativos descubrir su portafolio sin fricciones, al mismo tiempo que automatiza la captura, valuación y seguimiento de leads calificados para su equipo de ventas.
              </p>
              
              <div className="flex-center" style={{ gap: '16px' }}>
                <button onClick={() => setActiveTab('catalogo')} className="btn btn-primary" style={{ padding: '14px 28px' }}>
                  Probar Prototipo Paso 1 <ArrowRight size={16} />
                </button>
                <a href="#roi" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
                  Ver Proyección de ROI
                </a>
              </div>
            </div>

            {/* THREE STRATEGIC PILLARS */}
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '20px', textAlign: 'center', fontWeight: 700 }}>
                Pilares Fundamentales de la Solución
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                
                <div className="glass-panel" style={{ padding: '28px' }}>
                  <div style={{ height: '48px', width: '48px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifySelf: 'start', justifyContent: 'center', marginBottom: '20px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                    <ShoppingCart size={22} color="var(--accent-secondary)" />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '12px' }}>1. Catálogo de Auto-Servicio B2B</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Un portal público fluido que muestra su oferta con especificaciones completas, filtrado por categorías, código SKU y volumen mínimo de compra (MOQ). Aumenta la visibilidad orgánica en Google y facilita la decisión de compra.
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '28px' }}>
                  <div style={{ height: '48px', width: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifySelf: 'start', justifyContent: 'center', marginBottom: '20px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <Users size={22} color="var(--accent-primary)" />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '12px' }}>2. Captura Activa de Leads</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Formularios contextuales "Solicitar Cotización" por cada producto. Capturan datos vitales del prospecto: volumen requerido, presupuesto, urgencia del proyecto y detalles de contacto, eliminando correos de ida y vuelta.
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '28px' }}>
                  <div style={{ height: '48px', width: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifySelf: 'start', justifyContent: 'center', marginBottom: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <LayoutDashboard size={22} color="var(--color-success)" />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '12px' }}>3. CRM & Gestión de Trazabilidad</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Panel privado comercial con estadísticas en tiempo real del pipeline financiero de ventas, estados del prospecto (Nuevo, Cotizado, Cerrado) y exportación directa a formatos de base de datos comerciales.
                  </p>
                </div>

              </div>
            </div>

            {/* ROADMAP & PHASES OF ACCELERATION */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <span className="tag tag-success" style={{ marginBottom: '8px' }}>HOJA DE RUTA</span>
                  <h3 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 800 }}>Fases de Implementación Tecnológica</h3>
                </div>
                <button onClick={() => { setActiveTab('catalogo'); showToast('Accediste al prototipo del Paso 1'); }} className="btn btn-primary">
                  Probar Prototipo del Paso 1 <Sparkles size={16} />
                </button>
              </div>

              <div className="timeline">
                
                <div className="timeline-item active">
                  <div className="timeline-marker"></div>
                  <div className="glass-panel" style={{ background: 'rgba(15, 23, 42, 0.3)', borderLeft: '3px solid var(--accent-secondary)' }}>
                    <div className="flex-between" style={{ flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>Paso 1: Portal de Catálogo y Gestión de Leads Activa</h4>
                      <span className="tag tag-success" style={{ fontWeight: 'bold' }}>Fase Actual (Prototipada)</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                      Creación del sitio web corporativo con el catálogo digital autogestionado, formulario de solicitud automatizado por producto para recolección de leads, y panel interno CRM comercial con base de datos en tiempo real y métricas financieras clave.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> <strong>Duración:</strong> 4 a 6 semanas</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Settings size={14} /> <strong>Hitos:</strong> Carga de Inventario, CRM Integrado, Exportación</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} color="var(--color-success)" /> <strong>Inversión:</strong> $12,500 USD (Pago único)</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker" style={{ borderColor: 'rgba(255,255,255,0.1)', boxShadow: 'none' }}></div>
                  <div className="glass-panel" style={{ background: 'rgba(15, 23, 42, 0.1)' }}>
                    <div className="flex-between" style={{ flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)' }}>Paso 2: Portal de Compradores & Cotizaciones Avanzadas (B2B E-commerce)</h4>
                      <span className="tag" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>Fase Futura</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
                      Desarrollo de cuentas de clientes corporativos para ver precios personalizados según contrato, automatización de cotizaciones complejas en PDF basadas en volumen de compra, y pasarela de pago para depósitos o líneas de crédito de pre-pago.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> <strong>Duración:</strong> 8 semanas</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Settings size={14} /> <strong>Hitos:</strong> Portal Clientes, Cotizador PDF, Cuentas</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker" style={{ borderColor: 'rgba(255,255,255,0.1)', boxShadow: 'none' }}></div>
                  <div className="glass-panel" style={{ background: 'rgba(15, 23, 42, 0.1)' }}>
                    <div className="flex-between" style={{ flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)' }}>Paso 3: Integración de Sistemas (ERP) & IA de Demanda B2B</h4>
                      <span className="tag" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>Fase Avanzada</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
                      Integración total bidireccional con el ERP de su empresa (SAP, Oracle o Dynamics) para sincronizar stock en tiempo real y facturación automatizada. Inclusión de un motor de Inteligencia Artificial para pronóstico de demanda de insumos.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> <strong>Duración:</strong> 10 a 12 semanas</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Settings size={14} /> <strong>Hitos:</strong> API ERP, Pronósticos IA, Automatización</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ROI INTERACTIVE CALCULATOR */}
            <div id="roi" className="glass-panel" style={{ padding: '32px', background: 'linear-gradient(135deg, rgba(8, 12, 20, 0.6) 0%, rgba(139, 92, 246, 0.03) 100%)' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <span className="tag tag-success" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-secondary)', border: '1px solid rgba(6, 182, 212, 0.2)', marginBottom: '10px' }}>CALCULADORA DE NEGOCIOS B2B</span>
                <h3 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 800 }}>Simulador de Retorno de Inversión Comercial</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '6px' }}>
                  Ajuste los valores previstos para proyectar la rentabilidad del portal de catálogo y captador de leads del Paso 1.
                </p>
              </div>

              <div className="dashboard-grid">
                
                {/* Sliders Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  <div className="slider-group">
                    <div className="slider-header">
                      <span className="form-label" style={{ fontSize: '0.75rem' }}>Visitas Mensuales al Portal</span>
                      <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>{visits.toLocaleString()} visitas</span>
                    </div>
                    <input 
                      type="range" 
                      min="500" 
                      max="10000" 
                      step="100"
                      value={visits}
                      onChange={(e) => setVisits(parseInt(e.target.value))}
                      className="slider-input" 
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span>500</span>
                      <span>5,000</span>
                      <span>10,000</span>
                    </div>
                  </div>

                  <div className="slider-group">
                    <div className="slider-header">
                      <span className="form-label" style={{ fontSize: '0.75rem' }}>Tasa de Conversión a Leads</span>
                      <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>{conversion.toFixed(1)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="10.0" 
                      step="0.1"
                      value={conversion}
                      onChange={(e) => setConversion(parseFloat(e.target.value))}
                      className="slider-input" 
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span>0.5%</span>
                      <span>5.0%</span>
                      <span>10.0%</span>
                    </div>
                  </div>

                  <div className="slider-group">
                    <div className="slider-header">
                      <span className="form-label" style={{ fontSize: '0.75rem' }}>Tasa de Cierre de Leads B2B</span>
                      <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>{closeRate}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="50" 
                      step="1"
                      value={closeRate}
                      onChange={(e) => setCloseRate(parseInt(e.target.value))}
                      className="slider-input" 
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span>5%</span>
                      <span>25%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  <div className="slider-group">
                    <div className="slider-header">
                      <span className="form-label" style={{ fontSize: '0.75rem' }}>Ticket Promedio de Venta (USD)</span>
                      <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>${avgTicket.toLocaleString()} USD</span>
                    </div>
                    <input 
                      type="range" 
                      min="1000" 
                      max="50000" 
                      step="500"
                      value={avgTicket}
                      onChange={(e) => setAvgTicket(parseInt(e.target.value))}
                      className="slider-input" 
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span>$1,000</span>
                      <span>$25,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>

                </div>

                {/* Results Area */}
                <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-glow)', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>Leads / Mes</span>
                      <span style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800 }}>{leadsPerMonth}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>Ventas / Mes</span>
                      <span style={{ fontSize: '1.5rem', color: 'var(--accent-secondary)', fontWeight: 800 }}>{salesPerMonth}</span>
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />

                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>Facturación Adicional Mensual</span>
                    <span style={{ fontSize: '1.8rem', color: 'var(--text-success)', fontWeight: 800 }}>${monthlyRevenue.toLocaleString()} USD</span>
                  </div>

                  <div className="flex-between">
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Facturación Anual</span>
                      <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>${annualRevenue.toLocaleString()} USD</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Retorno de Inversión</span>
                      <span className="tag tag-success" style={{ fontWeight: 'bold' }}>
                        {paybackMonths <= 0.1 ? 'Inmediato' : `${paybackMonths} Meses`}
                      </span>
                    </div>
                  </div>

                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${Math.min(100, Math.max(10, paybackMonths * 10))}%`, background: 'linear-gradient(90deg, var(--color-success), var(--accent-secondary))' }}></div>
                  </div>

                </div>

              </div>
            </div>

            {/* CORPORATE AGREEMENT & SIGNATURE */}
            <div className="glass-panel" style={{ padding: '32px', border: '1px solid rgba(139, 92, 246, 0.2)', background: 'linear-gradient(135deg, rgba(8, 12, 20, 0.8) 0%, rgba(139, 92, 246, 0.02) 100%)' }}>
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ height: '40px', width: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <Shield size={20} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>Aprobación de la Propuesta</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Firme digitalmente para formalizar el inicio del Paso 1.</p>
                  </div>
                </div>
                {proposalSigned && (
                  <span className="tag tag-success" style={{ fontSize: '0.85rem', padding: '6px 16px', animation: 'pulseGlow 2s infinite' }}>
                    ✓ PROPUESTA FIRMADA & APROBADA
                  </span>
                )}
              </div>

              {!proposalSigned ? (
                <form onSubmit={handleApproveProposal} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Nombre del Firmante Autorizado</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Ej. Ing. Juan Pérez" 
                        value={signerName}
                        onChange={(e) => setSignerName(e.target.value)}
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Empresa Corporativa</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Ej. Industrias Metalúrgicas S.A." 
                        value={signerCompany}
                        onChange={(e) => setSignerCompany(e.target.value)}
                        className="form-input" 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                      Aprobar e Iniciar Fase 1 <Sparkles size={16} />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center" style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                    <CheckCircle size={32} color="var(--color-success)" />
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>¡Contrato Formalizado Digitalmente!</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: '1.6' }}>
                    Propuesta estratégica aprobada por <strong>{signerName}</strong> en representación de <strong>{signerCompany}</strong> el día de hoy.
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Código de Registro Único: B2B-CONTRATO-{Date.now().toString().slice(-6)}-PROD
                  </p>
                  <button onClick={() => { setProposalSigned(false); setSignerName(''); setSignerCompany(''); }} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px', marginTop: '10px' }}>
                    Firmar de Nuevo / Editar Datos
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

        {/* CUSTOMER PORTAL / PUBLIC CATALOG TAB */}
        {activeTab === 'catalogo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* PUBLIC HEADER */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', borderBottom: '2px solid rgba(6, 182, 212, 0.2)' }}>
              <div>
                <span className="tag" style={{ background: 'rgba(6, 182, 212, 0.08)', color: 'var(--accent-secondary)', fontWeight: 'bold', marginBottom: '6px' }}>VISTA DEL COMPRADOR (DEMO)</span>
                <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Portal de Suministros NexoB2B</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Catálogo de insumos industriales, equipos pesados y servicios especializados corporativos.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Prototipo del Paso 1:</span>
                <button onClick={() => { setActiveTab('admin'); setAdminSubTab('leads'); }} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 16px', borderColor: 'var(--color-success)' }}>
                  Ir a Panel CRM de Vendedor <LayoutDashboard size={14} style={{ marginLeft: '6px' }} />
                </button>
              </div>
            </div>

            {/* SEARCH AND FILTERS */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
              
              {/* Category selector */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['All', 'Maquinaria Industrial', 'Sistemas de Automatización', 'Materia Prima Premium', 'Soporte & Consultoría'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCatalogCategory(cat)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      background: catalogCategory === cat ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.03)',
                      color: catalogCategory === cat ? '#000' : 'var(--text-secondary)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {cat === 'All' ? 'Ver Todos' : cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', maxWidth: '300px', width: '100%' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Buscar código SKU o palabra..." 
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="form-input" 
                  style={{ paddingLeft: '38px', fontSize: '0.82rem' }}
                />
              </div>

            </div>

            {/* CATALOG GRID */}
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map(prod => (
                  <div key={prod.id} className="product-card">
                    <div className="product-image-placeholder">
                      <div className="product-image-icon">{prod.icon}</div>
                      <span style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '0.65rem', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                        {prod.sku}
                      </span>
                      <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.68rem', background: 'rgba(255,255,255,0.08)', padding: '4px 8px', borderRadius: '4px', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}>
                        {prod.category}
                      </span>
                    </div>

                    <div className="product-details">
                      <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '8px' }}>{prod.title}</h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4', minHeight: '56px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {prod.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex-between" style={{ marginBottom: '12px', fontSize: '0.82rem' }}>
                          <div>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>PRECIO B2B REFERENCIAL</span>
                            <strong style={{ color: 'var(--text-success)', fontSize: '1rem' }}>${prod.price.toLocaleString()} USD</strong>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>PEDIDO MÍNIMO (MOQ)</span>
                            <span style={{ color: '#fff', fontWeight: 600 }}>{prod.moq} {prod.category === 'Materia Prima Premium' ? 'Unid.' : 'Unidad(es)'}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setSelectedProduct(prod);
                            setLeadForm(prev => ({ ...prev, volume: prod.moq.toString() }));
                            setShowQuoteModal(true);
                          }}
                          className="btn btn-primary" 
                          style={{ width: '100%', padding: '10px', fontSize: '0.82rem' }}
                        >
                          Solicitar Cotización <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel text-center" style={{ padding: '40px' }}>
                <HelpCircle size={36} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                <h4 style={{ color: '#fff' }}>No se encontraron productos</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Intente modificando los filtros o buscando palabras clave generales.
                </p>
              </div>
            )}

            {/* INFO ALERT BOX */}
            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(6, 182, 212, 0.02)', border: '1px dashed rgba(6, 182, 212, 0.2)' }}>
              <Zap size={24} color="var(--accent-secondary)" />
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <strong>Simulador de Negocio:</strong> Al dar click en "Solicitar Cotización" y enviar el formulario de un producto, usted simulará el comportamiento de un cliente interesado. Los datos del prospecto se registrarán automáticamente en el CRM del Panel de Administración.
              </p>
            </div>

          </div>
        )}

        {/* ADMIN WORKSPACE / CRM SYSTEM TAB */}
        {activeTab === 'admin' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* ADMIN HEADER */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', borderBottom: '2px solid rgba(16, 185, 129, 0.2)' }}>
              <div>
                <span className="tag tag-success" style={{ fontWeight: 'bold', marginBottom: '6px' }}>PORTAL INTERNO: VENDEDOR & CRM</span>
                <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Panel de Control Comercial</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Gestione prospectos (leads) del portal web corporativo, controle catálogo de insumos y visualice pipeline.
                </p>
              </div>
              
              {/* Admin Sub-navigation */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setAdminSubTab('leads')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    background: adminSubTab === 'leads' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.02)',
                    color: adminSubTab === 'leads' ? 'var(--text-success)' : 'var(--text-secondary)',
                    border: '1px solid ' + (adminSubTab === 'leads' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)'),
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  Gestión de Leads ({totalLeadsCount})
                </button>
                <button 
                  onClick={() => setAdminSubTab('cargar')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    background: adminSubTab === 'cargar' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.02)',
                    color: adminSubTab === 'cargar' ? 'var(--text-success)' : 'var(--text-secondary)',
                    border: '1px solid ' + (adminSubTab === 'cargar' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)'),
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Plus size={14} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} />
                  Cargar Catálogo
                </button>
                <button 
                  onClick={() => setAdminSubTab('analitica')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    background: adminSubTab === 'analitica' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.02)',
                    color: adminSubTab === 'analitica' ? 'var(--text-success)' : 'var(--text-secondary)',
                    border: '1px solid ' + (adminSubTab === 'analitica' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)'),
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  Analíticas ROI
                </button>
              </div>
            </div>

            {/* KPI METRIC CARDS */}
            <div className="stat-grid">
              
              <div className="stat-card">
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Pipeline Estimado B2B</span>
                <strong style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800, margin: '4px 0' }}>
                  ${pipelineValue.toLocaleString()} USD
                </strong>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Monto de leads activos y ganados</span>
              </div>

              <div className="stat-card">
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Conversión Comercial</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--text-success)', fontWeight: 800, margin: '4px 0' }}>
                  {conversionRate}%
                </strong>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Porcentaje de Leads Cerrados</span>
              </div>

              <div className="stat-card">
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Pipeline Ganado</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--accent-secondary)', fontWeight: 800, margin: '4px 0' }}>
                  ${wonPipelineValue.toLocaleString()} USD
                </strong>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Ingreso consolidado simulado</span>
              </div>

              <div className="stat-card">
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Nuevos Leads</span>
                <strong style={{ fontSize: '1.4rem', color: '#fbbf24', fontWeight: 800, margin: '4px 0' }}>
                  {newLeadsCount} / {totalLeadsCount}
                </strong>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Leads en espera de primer contacto</span>
              </div>

            </div>

            {/* SUBTAB CONTENT: LEADS LIST DATABASE */}
            {adminSubTab === 'leads' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div className="flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>Embudo y Trazabilidad de Prospectos</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleExportCSV} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.78rem' }}>
                      <Download size={14} /> Exportar a CSV
                    </button>
                  </div>
                </div>

                {leads.length > 0 ? (
                  <div className="table-container">
                    <table className="crm-table">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Cliente & Empresa</th>
                          <th>Producto Solicitado</th>
                          <th>Pipeline Estimado</th>
                          <th>Urgencia</th>
                          <th>Estado del Lead</th>
                          <th style={{ textAlign: 'right' }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map(lead => (
                          <tr key={lead.id}>
                            <td style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}><Clock size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> {lead.date}</span>
                            </td>
                            <td>
                              <strong style={{ color: '#fff', display: 'block' }}>{lead.clientName}</strong>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{lead.company} // {lead.email}</span>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--accent-secondary)' }}>{lead.product}</span>
                            </td>
                            <td>
                              <strong style={{ color: 'var(--text-success)' }}>${lead.value.toLocaleString()} USD</strong>
                            </td>
                            <td>
                              <span className="tag" style={{
                                padding: '3px 8px',
                                fontSize: '0.68rem',
                                background: lead.urgency === 'Alta' ? 'rgba(244,63,94,0.1)' : lead.urgency === 'Media' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)',
                                color: lead.urgency === 'Alta' ? 'var(--text-danger)' : lead.urgency === 'Media' ? 'var(--color-warning)' : 'var(--text-secondary)',
                                border: '1px solid ' + (lead.urgency === 'Alta' ? 'rgba(244,63,94,0.15)' : lead.urgency === 'Media' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)')
                              }}>
                                {lead.urgency}
                              </span>
                            </td>
                            <td>
                              <select 
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                style={{
                                  background: lead.status === 'NUEVO' ? 'rgba(6, 182, 212, 0.08)' : 
                                              lead.status === 'GANADO' ? 'rgba(16, 185, 129, 0.08)' :
                                              lead.status === 'PERDIDO' ? 'rgba(244, 63, 94, 0.08)' : 
                                              'rgba(245, 158, 11, 0.08)',
                                  color: lead.status === 'NUEVO' ? '#22d3ee' : 
                                         lead.status === 'GANADO' ? '#34d399' :
                                         lead.status === 'PERDIDO' ? '#fb7185' : 
                                         '#fbbf24',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                  borderRadius: '6px',
                                  fontSize: '0.78rem',
                                  fontWeight: 600,
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                  outline: 'none'
                                }}
                              >
                                <option value="NUEVO" style={{ background: '#0d1321', color: '#22d3ee' }}>NUEVO</option>
                                <option value="EN PROCESO" style={{ background: '#0d1321', color: '#fbbf24' }}>EN PROCESO</option>
                                <option value="COTIZADO" style={{ background: '#0d1321', color: '#c084fc' }}>COTIZADO</option>
                                <option value="GANADO" style={{ background: '#0d1321', color: '#34d399' }}>GANADO</option>
                                <option value="PERDIDO" style={{ background: '#0d1321', color: '#fb7185' }}>PERDIDO</option>
                              </select>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button 
                                onClick={() => handleDeleteLead(lead.id)}
                                style={{ color: 'var(--text-danger)', fontSize: '0.75rem', opacity: 0.8, cursor: 'pointer' }}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="glass-panel text-center" style={{ padding: '60px' }}>
                    <Users size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
                    <h4 style={{ color: '#fff' }}>No hay Leads registrados aún</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '400px', margin: '8px auto' }}>
                      Vaya a la pestaña "Catálogo Público" y realice solicitudes de cotización sobre los productos para simular prospectos comerciales en tiempo real.
                    </p>
                  </div>
                )}

              </div>
            )}

            {/* SUBTAB CONTENT: UPLOAD PRODUCT TO CATALOG */}
            {adminSubTab === 'cargar' && (
              <div className="glass-panel" style={{ padding: '32px', background: 'rgba(8,12,20,0.6)' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>Simulador de Carga de Productos</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Añada nuevos insumos o equipos industriales. Al guardar, se renderizarán instantáneamente en la interfaz de Catálogo Público.
                  </p>
                </div>

                <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Nombre Comercial del Insumo / Equipo</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ej. Reactor Químico Inoxidable RX-200" 
                        value={newProduct.title}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
                        className="form-input" 
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Código SKU de Inventario</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ej. INSU-RX200" 
                        value={newProduct.sku}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, sku: e.target.value }))}
                        className="form-input" 
                      />
                    </div>

                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                    
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Categoría del Portafolio B2B</label>
                      <select 
                        value={newProduct.category}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                        className="form-input"
                        style={{ height: '47px', background: 'rgba(15,23,42,0.8)', cursor: 'pointer' }}
                      >
                        <option value="Maquinaria Industrial">Maquinaria Industrial</option>
                        <option value="Sistemas de Automatización">Sistemas de Automatización</option>
                        <option value="Materia Prima Premium">Materia Prima Premium</option>
                        <option value="Soporte & Consultoría">Soporte & Consultoría</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Precio Unitario Referencial (USD)</label>
                      <input 
                        type="number" 
                        required
                        min="1"
                        placeholder="Ej. 18500" 
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                        className="form-input" 
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Volumen Mínimo (MOQ)</label>
                      <input 
                        type="number" 
                        required
                        min="1"
                        placeholder="Ej. 1" 
                        value={newProduct.moq}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, moq: e.target.value }))}
                        className="form-input" 
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Icono Representativo Preset</label>
                      <select
                        value={newProduct.icon}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, icon: e.target.value }))}
                        className="form-input"
                        style={{ height: '47px', background: 'rgba(15,23,42,0.8)', cursor: 'pointer' }}
                      >
                        <option value="⚙️">⚙️ Engranaje (Maquinaria)</option>
                        <option value="🤖">🤖 Robot (Automatización)</option>
                        <option value="🧪">🧪 Tubo Ensayo (Química/Material)</option>
                        <option value="🏗️">🏗️ Grúa (Estructuras)</option>
                        <option value="🔌">🔌 Conector (Eléctrico)</option>
                        <option value="🔋">🔋 Batería (Energía)</option>
                        <option value="💼">💼 Maletín (Servicios)</option>
                        <option value="📦">📦 Caja Genérica (Insumo)</option>
                      </select>
                    </div>

                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Descripción Técnica para Compradores Corporativos</label>
                    <textarea 
                      rows="3"
                      placeholder="Indique las especificaciones, materiales, certificaciones de calidad y condiciones operativas del producto." 
                      value={newProduct.description}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                      className="form-input" 
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                    <button 
                      type="button" 
                      onClick={() => setAdminSubTab('leads')} 
                      className="btn btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--color-success), #059669)' }}>
                      Subir y Publicar Insumo <Upload size={16} />
                    </button>
                  </div>

                </form>

              </div>
            )}

            {/* SUBTAB CONTENT: ROI ANALYTICS DASHBOARD */}
            {adminSubTab === 'analitica' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* PIPELINE BREAKDOWN VISUAL METERS */}
                <div className="dashboard-grid">
                  
                  <div className="glass-panel" style={{ padding: '28px' }}>
                    <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BarChart3 size={16} color="var(--accent-secondary)" /> Repartición del Pipeline por Categoría
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      
                      {[
                        { cat: 'Maquinaria Industrial', val: leads.filter(l => l.product.includes('Prensa') || l.product.includes('Reactor') || l.product.includes('Robots')).reduce((acc, l) => acc + l.value, 0) },
                        { cat: 'Sistemas de Automatización', val: leads.filter(l => l.product.includes('Brazo') || l.product.includes('Sensor')).reduce((acc, l) => acc + l.value, 0) },
                        { cat: 'Materia Prima Premium', val: leads.filter(l => l.product.includes('Resina') || l.product.includes('Acero')).reduce((acc, l) => acc + l.value, 0) },
                        { cat: 'Soporte & Consultoría', val: leads.filter(l => l.product.includes('ERP') || l.product.includes('Consultoría')).reduce((acc, l) => acc + l.value, 0) }
                      ].map(item => {
                        const percent = pipelineValue > 0 ? Math.round((item.val / pipelineValue) * 100) : 0;
                        return (
                          <div key={item.cat}>
                            <div className="flex-between" style={{ fontSize: '0.8rem', marginBottom: '6px' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>{item.cat}</span>
                              <strong style={{ color: '#fff' }}>${item.val.toLocaleString()} USD ({percent}%)</strong>
                            </div>
                            <div className="progress-bar-container" style={{ height: '6px' }}>
                              <div className="progress-bar-fill" style={{ width: `${percent}%`, background: 'var(--accent-secondary)' }}></div>
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '28px' }}>
                    <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="var(--color-success)" /> Trazabilidad de Estados comerciales
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      
                      {[
                        { label: 'Nuevos Prospectos (Sin Contacto)', count: newLeadsCount, color: '#22d3ee', styleClass: 'status-nuevo' },
                        { label: 'En Negociación Comercial', count: leads.filter(l => l.status === 'EN PROCESO').length, color: '#fbbf24', styleClass: 'status-proceso' },
                        { label: 'Cotización Entregada', count: leads.filter(l => l.status === 'COTIZADO').length, color: '#c084fc', styleClass: 'status-cotizado' },
                        { label: 'Oportunidades Ganadas (Cierre)', count: wonLeadsCount, color: '#34d399', styleClass: 'status-ganado' },
                        { label: 'Perdidas', count: lostLeadsCount, color: '#fb7185', styleClass: 'status-perdido' }
                      ].map(statusItem => {
                        const percent = totalLeadsCount > 0 ? Math.round((statusItem.count / totalLeadsCount) * 100) : 0;
                        return (
                          <div key={statusItem.label}>
                            <div className="flex-between" style={{ fontSize: '0.8rem', marginBottom: '6px' }}>
                              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusItem.color }}></span>
                                {statusItem.label}
                              </span>
                              <strong style={{ color: '#fff' }}>{statusItem.count} leads ({percent}%)</strong>
                            </div>
                            <div className="progress-bar-container" style={{ height: '6px' }}>
                              <div className="progress-bar-fill" style={{ width: `${percent}%`, background: statusItem.color }}></div>
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>

                </div>

                {/* SIMULATED ROI SUMMARY BASED ON ACTUAL LEADS */}
                <div className="glass-panel" style={{ padding: '28px', background: 'rgba(16, 185, 129, 0.02)', border: '1px dashed var(--color-success)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ height: '46px', width: '46px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={20} color="var(--color-success)" />
                      </div>
                      <div>
                        <h4 style={{ color: '#fff', fontSize: '1.05rem' }}>Efectividad Comercial Realizada</h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Métricas acumuladas del pipeline comercial en vivo del prototipo.</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      <div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>VALOR MEDIO LEAD</span>
                        <strong style={{ color: '#fff' }}>
                          ${totalLeadsCount > 0 ? Math.round(pipelineValue / totalLeadsCount).toLocaleString() : 0} USD
                        </strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>RETORNO FASE 1 ($12,500)</span>
                        <strong style={{ color: 'var(--text-success)' }}>
                          {wonPipelineValue > 12500 ? `Superado (${Math.round((wonPipelineValue / 12500) * 100)}%)` : 'En progreso'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* LEAD REQUEST QUOTE MODAL */}
      {showQuoteModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <X 
              className="modal-close" 
              onClick={() => setShowQuoteModal(false)} 
            />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ fontSize: '2rem' }}>{selectedProduct.icon}</div>
              <div>
                <span className="tag" style={{ background: 'rgba(6, 182, 212, 0.08)', color: 'var(--accent-secondary)', fontSize: '0.68rem', marginBottom: '4px' }}>
                  SOLICITUD B2B DE: {selectedProduct.sku}
                </span>
                <h4 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>{selectedProduct.title}</h4>
              </div>
            </div>

            <hr style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px' }} />

            <form onSubmit={handleQuoteSubmit}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Nombre del Solicitante *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. Juan Pérez" 
                    value={leadForm.name}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Empresa Corporativa *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. Industrias Metalúrgicas S.A." 
                    value={leadForm.company}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, company: e.target.value }))}
                    className="form-input" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Correo Electrónico Corporativo *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="jperez@empresa.com" 
                    value={leadForm.email}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Teléfono de Contacto</label>
                  <input 
                    type="text" 
                    placeholder="+52 55 1234 5678" 
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="form-input" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Volumen Requerido (MOQ: {selectedProduct.moq})</label>
                  <input 
                    type="number" 
                    required 
                    min={selectedProduct.moq}
                    value={leadForm.volume}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, volume: e.target.value }))}
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Urgencia del Suministro</label>
                  <select 
                    value={leadForm.urgency}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, urgency: e.target.value }))}
                    className="form-input"
                    style={{ background: 'rgba(15,23,42,0.8)', cursor: 'pointer' }}
                  >
                    <option value="Alta">Alta (Menos de 2 semanas)</option>
                    <option value="Media">Media (2 a 4 semanas)</option>
                    <option value="Baja">Baja (Más de 1 mes)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Detalles del Proyecto / Requerimientos Técnicos</label>
                <textarea 
                  rows="3" 
                  placeholder="Describa brevemente en qué consiste su proyecto o si requiere alguna especificación técnica particular..." 
                  value={leadForm.project}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, project: e.target.value }))}
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowQuoteModal(false)} 
                  className="btn btn-secondary"
                  style={{ padding: '10px 20px' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '10px 24px' }}
                >
                  Enviar Cotización <ArrowRight size={14} />
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-glow)', padding: '24px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p>© 2026 NexoB2B. Propuesta comercial interactiva. Desarrollado con React, Glassmorphism y CSS Premium.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Fase 1: Catálogo & Leads</span>
            <span>Fase 2: Portal Clientes</span>
            <span>Fase 3: Integración ERP</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
