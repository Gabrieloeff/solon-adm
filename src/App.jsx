import './App.css'
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Menu, X, Phone, Mail, MapPin, ArrowRight, CheckCircle, Users, TrendingUp, Shield, GraduationCap } from 'lucide-react'
import { Dialog } from '@headlessui/react'

// Importar assets
import iconeDashboard from './assets/icone_dashboard.png'
import iconeCaptacao from './assets/icone_captacao_recursos.png'
import iconeCompliance from './assets/icone_compliance.png'
import iconeCapacitacao from './assets/icone_capacitacao.png'
import imagemReuniao1 from './assets/imagem_reuniao_1.jpg'
import imagemReuniao2 from './assets/imagem_reuniao_2.jpg'
import imagemReuniao6 from './assets/imagem_reuniao_6.jpg'
import imagemTecnologia1 from './assets/imagem_tecnologia_1.png'
import logo from './assets/logo_solon.png' 
import logoSolon from './assets/solon.png';

function App() {
   const API_BASE = import.meta.env.DEV
    ? (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000')
    : '';
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const res = await fetch(`${API_BASE}/api/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data?.ok) {
      alert("Mensagem enviada com sucesso!");
      setForm({ nome: "", email: "", mensagem: "" });
    } else {
      console.error("Resposta do servidor:", res.status, data);
      alert("Erro ao enviar mensagem.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro de conexão com o servidor.");
  }
};


  const services = [
      {
    icon: iconeDashboard,
    title: "Plataforma Recursos Inteligentes",
    description: "Única plataforma própria para gestão completa de recursos públicos com dashboards em tempo real.",
    features: ["Gestão centralizada", "Relatórios automáticos", "Integração de dados"],
    imageLink: {
      src: logoSolon, // caminho da imagem
      href: "https://www.recursosinteligentes.com.br" // link de redirecionamento
    }
  },
    {
      icon: iconeCaptacao,
      title: "Captação de Recursos",
      description: "Identificação, elaboração e acompanhamento de propostas para maximizar captação de recursos.",
      features: ["Elaboração de propostas", "Identificação de fontes", "Acompanhamento da execução"]
    },
    {
      icon: iconeCompliance,
      title: "Compliance e Segurança",
      description: "Garantia de conformidade com toda legislação vigente e transparência total nos processos.",
      features: ["Conformidade legal", "Prestação de contas", "Segurança jurídica"]
    },
    {
      icon: iconeCapacitacao,
      title: "Capacitação de Servidores",
      description: "Treinamentos especializados em gestão pública, liderança e uso de tecnologias.",
      features: ["Treinamentos presenciais", "Cursos online", "Workshops especializados"]
    }
  ]

  const stats = [
    { number: "50+", label: "Prefeituras Atendidas" },
    { number: "R$ 200Mi+", label: "Recursos Captados" },
    { number: "+1 Mi", label: "População atendida" },
    { number: "10+", label: "Anos de Experiência" }
  ]

  const clients = [
    { name: "Prefeitura de Rancho Queimado", url: "hhttps://soloncloud.web.app/transparency/ranchoqueimado/dashboard" },
    { name: "Prefeitura de Balneário Arroio do Silva", url: "https://soloncloud.web.app/transparency/balnarroiodosilva/dashboard" },
    { name: "Prefeitura de Videira", url: "hhttps://soloncloud.web.app/transparency/videira/dashboard" },
    { name: "Prefeitura de Garopaba", url: "https://soloncloud.web.app/transparency/garopaba/dashboard" },
    { name: "Prefeitura de Tijucas", url: "https://soloncloud.web.app/transparency/tijucas/dashboard" },
    { name: "Prefeitura de Ilhota", url: "https://soloncloud.web.app/transparency/ilhota/dashboardr" },
    { name: "Prefeitura de Ponte Alta do Norte", url: "https://soloncloud.web.app/transparency/pontealtadonorte/dashboard" },
    { name: "Prefeitura de Angelina", url: "https://soloncloud.web.app/transparency/angelina/dashboard" },
    { name: "Prefeitura de Petrolândia", url: "https://soloncloud.web.app/transparency/petrolandia/dashboard" },
    { name: "Prefeitura de Taió", url: "https://soloncloud.web.app/transparency/Taió/dashboard" },
    { name: "Prefeitura de Rio Do Oeste", url: "https://soloncloud.web.app/transparency/riodooeste/dashboard" },
    { name: "Prefeitura de Pescaria Brava", url: "https://soloncloud.web.app/transparency/pescariabrava/dashboard" },
    { name: "Prefeitura de Major Gercino", url: "https://soloncloud.web.app/transparency/majorgercino/dashboard" },
    { name: "Prefeitura de Santo Amaro da Imperatriz", url: "https://soloncloud.web.app/transparency/SantoAmarodaImperatriz/dashboard" },
    { name: "Prefeitura de Paulo Lopes", url: "https://soloncloud.web.app/transparency/paulolopes/dashboard" },
    { name: "Prefeitura de São João do Itaperiú", url: "https://soloncloud.web.app/transparency/saojoaodoitaperiu/dashboard" },
    { name: "Prefeitura de Antônio Carlos", url: "https://soloncloud.web.app/transparency/antoniocarlos/dashboard" },
    { name: "Prefeitura de Palma Sola", url: "https://soloncloud.web.app/transparency/palmasola/dashboard" },
      ]

  const testimonials = [
    {
      name: "Cleci Veronezi",
      role: "Prefeita de Rancho Queimado",
      content: "A Solon transformou nossa gestão com tecnologia e expertise. Conseguimos captar recursos que não imaginávamos ser possível.",
      image: imagemReuniao1
    },
        {
      name: "Dida Oliveira",
      role: "Prefeito de Ilhota",
      content: "A assessoria nos trouxe segurança e tranquilidade para seguir trabalhando pela cidade.",
      image: imagemReuniao2
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
             <img
             src={logo}
             alt="Logo da Solon Recursos Inteligentes"
       className="h-10"
        />
     </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-green-600 transition-colors">Início</a>
              <a href="#servicos" className="text-gray-700 hover:text-green-600 transition-colors">Serviços</a>
              <a href="#sobre" className="text-gray-700 hover:text-green-600 transition-colors">Sobre</a>
              <a href="#clientes" className="text-gray-700 hover:text-green-600 transition-colors">Clientes</a>
              <a href="#contato" className="text-gray-700 hover:text-green-600 transition-colors">Contato</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="https://soloncloud.web.app/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
               Acesso ao Sistema
               </Button>
             </a>

              <a href="#lead-form">
              <Button className="bg-green-600 hover:bg-green-700">
             Solicitar Consultoria
            </Button>
            </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#inicio" className="text-gray-700 hover:text-green-600">Início</a>
                <a href="#servicos" className="text-gray-700 hover:text-green-600">Serviços</a>
                <a href="#sobre" className="text-gray-700 hover:text-green-600">Sobre</a>
                <a href="#clientes" className="text-gray-700 hover:text-green-600">Clientes</a>
                <a href="#contato" className="text-gray-700 hover:text-green-600">Contato</a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="outline" className="border-green-600 text-green-600">
                    Acesso ao Sistema
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Solicitar Consultoria
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative bg-gradient-to-br from-green-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
                Assessoria e consultoria em captação de recursos
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Transformamos a{' '}
                <span className="text-green-600">Gestão Pública</span>{' '}
                com Tecnologia e Expertise
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A única empresa de assessoria e consultoria em captação com plataforma própria para 
                gestão dos recursos públicos. Eficiência, transparência e 
                conformidade legal são os nossos compromisssos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => setIsVideoOpen(true)}>
                Conheça Nossa Plataforma
               <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <a href="#lead-form">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                 Solicite uma Consultoria
                </Button>
             </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src={imagemTecnologia1} 
                alt="Tecnologia em Gestão Pública" 
                className="rounded-2xl shadow-2xl"
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções completas para gestão de recursos públicos, da captação à prestação de contas, 
              com tecnologia própria e expertise comprovada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
  <div className="flex justify-between items-start">
    <div className="flex-1">
      <CardHeader>
        <div className="w-16 h-16 mb-4">
          <img src={service.icon} alt={service.title} className="w-full h-full object-contain" />
        </div>
        <CardTitle className="text-xl text-gray-900 mb-4">{service.title}</CardTitle>
        <CardDescription className="text-gray-600 mb-4">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </div>

    {/* Imagem com link à direita */}
    {service.imageLink && (
      <a
        href={service.imageLink.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 flex-shrink-0 ml-8 mr-8"
      >
        <img
          src={service.imageLink.src}
          alt="Link externo"
          className="rounded-lg w-full h-full object-contain hover:opacity-25 transition-opacity"
        />
      </a>
    )}
  </div>
</Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Inovação e Expertise a Serviço da Gestão Pública
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Somos a única empresa especializada em assessoria para captação de recursos 
                que utiliza uma plataforma própria e exclusiva. Nossa metodologia de trabalho que envolve tecnologia garante 
                transparência, eficiência e controle absoluto em todas as etapas.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Plataforma Exclusiva</h3>
                    <p className="text-gray-600">Única no mercado, desenvolvida especificamente para gestão de captação de recursos públicos.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Equipe Especializada</h3>
                    <p className="text-gray-600">Profissionais experientes com longa tragetória na administração pública.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Resultados Comprovados</h3>
                    <p className="text-gray-600">Mais de R$ 200 milhões em recursos captados para nossos clientes.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={imagemReuniao6} 
                alt="Equipe Solon" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clientes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Prefeituras que Confiam na Solon
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 50 municípios transformaram sua gestão com nossa tecnologia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
      <a
          key={index}
           href={client.url}
           target="_blank"
          rel="noopener noreferrer"
           className="block"
            >
           <Card className="text-center p-6 hover:shadow-lg transition-shadow">
           <CardContent className="p-0">
           <div className="w-16 h-16 bg-[#dff5db] rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-8 w-8 text-[#4fad32]" />
            </div>
        <h3 className="font-semibold text-gray-900 text-sm">{client.name}</h3>
      </CardContent>
    </Card>
  </a>
))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que Nossos Clientes Dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Pronto para Transformar sua Gestão?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Entre em contato conosco e descubra como podemos ajudar sua prefeitura
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-white font-semibold mb-2">Telefone</h3>
              <p className="text-green-100">(48) 98801-9834</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-white font-semibold mb-2">E-mail</h3>
              <p className="text-green-100">adm@solon-adm.com</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-white font-semibold mb-2">Localização</h3>
              <p className="text-green-100">Santa Catarina, Brasil</p>
            </div>
          </div>

          
        </div>
      </section>
      
{/* Lead Form Section */}
<section id="lead-form" className="py-20 bg-gray-100">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Solicite uma Consultoria Personalizada
      </h2>
      <p className="text-xl text-gray-600">
        Preencha o formulário abaixo e nossa equipe entrará em contato com você.
      </p>
    </div>

    <form
  className="grid gap-6 bg-white p-8 rounded-xl shadow-md"
  onSubmit={handleSubmit}
>
  <div className="grid md:grid-cols-2 gap-6">
    <input
      type="text"
      name="nome"
      placeholder="Nome completo"
      className="border border-gray-300 p-3 rounded-lg w-full"
      required
      value={form.nome}
      onChange={handleChange}
    />
    <input
      type="email"
      name="email"
      placeholder="E-mail"
      className="border border-gray-300 p-3 rounded-lg w-full"
      required
      value={form.email}
      onChange={handleChange}
    />
  </div>

  <textarea
    name="mensagem"
    placeholder="Escreva sua mensagem..."
    className="border border-gray-300 p-3 rounded-lg w-full h-32"
    required
    value={form.mensagem}
    onChange={handleChange}
  />

  <Button type="submit" className="bg-green-600 hover:bg-green-700">
    Enviar
  </Button>
</form>

  </div>
</section>



      {/* Footer */}
         <footer className="bg-gray-100 text-gray-800 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 items-center">
            <div>
              <img src={logo} alt="Logo Solon" className="h-10 mx-auto mb-4" />
              <p className="text-gray-600 mb-4 text-center">
                Apoio administrativo para uma gestão pública mais eficiente e transparente.
              </p>
            </div>
           
          </div>
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Solon - Apoio Administrativo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

       
         {isVideoOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
         <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg">
           <div className="relative pt-[56.25%]"> {/* 16:9 ratio */}
         <iframe
          src="https://www.youtube.com/embed/yDGjKwypEsw"
          title="Conheça nossa plataforma"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-t-lg"
        ></iframe>
      </div>
      <button
        onClick={() => setIsVideoOpen(false)}
        className="absolute top-2 right-2 text-gray-800 bg-white p-1 rounded-full shadow hover:bg-gray-100"
      >
        ×
      </button>
    </div>
  </div>
)}
    
    </div>
    
  )
}

export default App

