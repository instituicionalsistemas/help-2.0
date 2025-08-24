import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Company, Vehicle, TeamMember, Notification, UserRole, MaterialRequest, Reminder, AdminUser, AdminNotification, LogEntry, LogType } from '../types';

// MOCK DATA
const initialCompanies: Company[] = [
  { 
    id: 'comp1', name: 'Auto Vendas Master', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1553440569-224b86d94444?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    monthlySalesGoal: 10, monthlyAdBudget: 30000, cnpj: '12.345.678/0001-99', email: 'contato@autovendasmaster.com', phone: '(11) 5555-1234', 
    instagram: '@autovendasmaster', ownerName: 'Paulo Moura', ownerPhone: '(11) 98888-7777', marketingDriveUrl: 'https://drive.google.com/drive/folders/12345ABCDE',
    visibleFields: ['modelYear', 'mileage', 'fuelType', 'transmission', 'standardItems', 'fabricationYear', 'revisions', 'documentStatus', 'history']
  },
  { id: 'comp2', name: 'Carros Prime', isActive: false, logoUrl: 'https://picsum.photos/seed/comp2/40/40', monthlySalesGoal: 8 },
  { id: 'comp3', name: 'Velocidade & Cia', isActive: true, logoUrl: 'https://picsum.photos/seed/comp3/40/40', monthlySalesGoal: 12 },
];

const realisticModels = [
    { brand: 'Chevrolet', model: 'Onix', category: 'Hatch' },
    { brand: 'Hyundai', model: 'HB20', category: 'Hatch' },
    { brand: 'Fiat', model: 'Pulse', category: 'SUV' },
    { brand: 'Toyota', model: 'Corolla', category: 'Sedan' },
    { brand: 'Ford', model: 'Ranger', category: 'Caminhonete' },
    { brand: 'Jeep', model: 'Renegade', category: 'SUV' },
    { brand: 'Fiat', model: 'Toro', category: 'Caminhonete' },
    { brand: 'Volkswagen', model: 'Gol', category: 'Hatch' },
    { brand: 'Honda', model: 'Civic', category: 'Sedan' },
    { brand: 'Chevrolet', model: 'Tracker', category: 'SUV' },
    { brand: 'Porsche', model: '911', category: 'Esportivo' },
    { brand: 'Renault', model: 'Kwid', category: 'Hatch' },
    { brand: 'Fiat', model: 'Strada', category: 'Caminhonete' },
    { brand: 'Mercedes-Benz', model: 'Sprinter', category: 'Van' },
    { brand: 'Ferrari', model: '488 GTB', category: 'Esportivo' },
];


const generateFictitiousSales = (): Vehicle[] => {
    const vehicles: Vehicle[] = [];
    const salespeople = ['sp1', 'sp2', 'owner1'];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
        const daysInStock = Math.floor(Math.random() * 145) + 5; // 5 to 150 days
        const saleDate = new Date(today);
        saleDate.setDate(today.getDate() - Math.floor(Math.random() * 90)); // Sold in the last 90 days

        const entryDate = new Date(saleDate);
        entryDate.setDate(saleDate.getDate() - daysInStock);
        
        const purchasePrice = Math.floor(Math.random() * 150000) + 40000;
        const profitMargin = (Math.random() * 0.15) + 0.08; // 8% to 23%
        const announcedPrice = Math.ceil((purchasePrice * (1 + profitMargin)) / 1000) * 1000;
        const discount = Math.random() > 0.6 ? Math.floor(Math.random() * 5) * 1000 : 0;
        
        const selectedModel = realisticModels[Math.floor(Math.random() * realisticModels.length)];

        vehicles.push({
            id: `sold_v${i}`,
            companyId: 'comp1',
            brand: selectedModel.brand,
            model: selectedModel.model,
            category: selectedModel.category,
            color: ['Preto', 'Branco', 'Prata', 'Vermelho', 'Azul'][Math.floor(Math.random() * 5)],
            plate: `SLD${i.toString().padStart(3, '0')}`,
            purchasePrice,
            announcedPrice,
            discount,
            maintenance: [],
            entryDate: entryDate.toISOString(),
            dailyCost: Math.floor(Math.random() * 20) + 10,
            saleGoalDays: 45,
            adCost: Math.floor(Math.random() * 10) + 5,
            salespersonId: salespeople[Math.floor(Math.random() * salespeople.length)],
            status: 'sold',
            saleDate: saleDate.toISOString(),
            isAdActive: false,
        });
    }
    return vehicles;
}

const fictitiousSoldVehicles = generateFictitiousSales();


const initialVehicles: Vehicle[] = [
  // 1. Chevrolet Onix Plus
  {
    id: 'v1', companyId: 'comp1', brand: 'Chevrolet', model: 'Onix Plus', category: 'Sedan', color: 'Prata',
    plate: 'RST1A23', purchasePrice: 78000, announcedPrice: 89900, discount: 1900, maintenance: [],
    entryDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 18, saleGoalDays: 45, adCost: 12,
    salespersonId: 'sp1', imageUrl: 'https://images.unsplash.com/photo-1601036322439-59988e33c28c?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'Sedan compacto líder de vendas. Econômico, tecnológico e com ótimo espaço interno. Versão Premier com todos os opcionais.',
    ipvaCost: 1600, ipvaDueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), isPriority: false, isAdActive: true,
    modelYear: 2023, fabricationYear: 2022, mileage: 15000, fuelType: 'Flex', transmission: 'Automático', standardItems: 'Ar-condicionado, Vidros Elétricos, OnStar', history: 'Único dono, sem sinistros.'
  },
  // 2. Hyundai HB20
  {
    id: 'v2', companyId: 'comp1', brand: 'Hyundai', model: 'HB20', category: 'Hatch', color: 'Branco',
    plate: 'HYU2B45', purchasePrice: 72000, announcedPrice: 82500, discount: 0, maintenance: [],
    entryDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 15, saleGoalDays: 30, adCost: 10,
    salespersonId: 'sp2', imageUrl: 'https://images.unsplash.com/photo-1629581514935-690324317a3a?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'Design arrojado e moderno. Carro completo com central multimídia, câmera de ré e motor 1.0 Turbo.',
    ipvaCost: 1500, ipvaDueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), isPriority: true, isAdActive: false,
    modelYear: 2022, fabricationYear: 2022, mileage: 28000, fuelType: 'Flex', transmission: 'Automático', standardItems: 'BlueMedia, Rodas de liga, Sensor de estacionamento', revisions: 'Todas as revisões na concessionária.'
  },
  // 3. Fiat Strada
  {
    id: 'v3', companyId: 'comp1', brand: 'Fiat', model: 'Strada', category: 'Caminhonete', color: 'Vermelho',
    plate: 'FIA3C67', purchasePrice: 95000, announcedPrice: 109900, discount: 2000, maintenance: [],
    entryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 22, saleGoalDays: 60, adCost: 18,
    imageUrl: 'https://images.unsplash.com/photo-1621431233878-c8959eb4033e?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'A picape mais vendida do Brasil. Robusta, versátil e ideal para trabalho e lazer. Versão Volcano com câmbio automático.',
    ipvaCost: 1900, ipvaDueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), isPriority: false, isAdActive: true,
    modelYear: 2023, fabricationYear: 2023, mileage: 8000, fuelType: 'Flex', transmission: 'Automático', standardItems: 'Capota marítima, Multimídia 7", Faróis de LED', additionalAccessories: 'Estribos laterais', doors: 2, traction: 'Dianteira'
  },
  // 4. Volkswagen T-Cross
  {
    id: 'v4', companyId: 'comp1', brand: 'Volkswagen', model: 'T-Cross', category: 'SUV', color: 'Cinza',
    plate: 'VWT4D89', purchasePrice: 110000, announcedPrice: 128000, discount: 0, maintenance: [],
    entryDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 25, saleGoalDays: 45, adCost: 20,
    salespersonId: 'owner1', imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'SUVW com excelente espaço interno, porta-malas generoso e motor TSI. Segurança e tecnologia de ponta.',
    isPriority: false, isAdActive: true,
    modelYear: 2021, fabricationYear: 2021, mileage: 45000, fuelType: 'Flex', transmission: 'Automático', standardItems: 'Painel digital, VW Play, Teto solar', documentStatus: 'Licenciado 2024'
  },
  // 5. Jeep Compass
  {
    id: 'v5', companyId: 'comp1', brand: 'Jeep', model: 'Compass', category: 'SUV', color: 'Preto',
    plate: 'JEP5E12', purchasePrice: 145000, announcedPrice: 165000, discount: 5000, maintenance: [],
    entryDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 30, saleGoalDays: 45, adCost: 25,
    salespersonId: 'sp1', imageUrl: 'https://images.unsplash.com/photo-1610398433293-c2d1b7a9f8f2?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'Sofisticação e aventura em um só carro. Versão Longitude 4x4 Diesel com teto solar panorâmico.',
    ipvaCost: 3500, ipvaDueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), isPriority: true, isAdActive: true,
    modelYear: 2020, fabricationYear: 2020, mileage: 62000, fuelType: 'Diesel', transmission: 'Automático', traction: '4x4', standardItems: 'Bancos de couro, Teto solar, Park Assist', history: 'Veículo de não fumante'
  },
  // 6. Hyundai Creta
  {
    id: 'v6', companyId: 'comp1', brand: 'Hyundai', model: 'Creta', category: 'SUV', color: 'Azul',
    plate: 'CRE6F34', purchasePrice: 115000, announcedPrice: 132000, discount: 2000, maintenance: [],
    entryDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 26, saleGoalDays: 45, adCost: 22,
    imageUrl: 'https://images.unsplash.com/photo-1631295988255-6593a155c8c9?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'SUV com design único, teto solar e o pacote de segurança SmartSense. Conforto e tecnologia para toda a família.',
    isPriority: false, isAdActive: false,
    modelYear: 2023, fabricationYear: 2022, mileage: 12000, fuelType: 'Flex', transmission: 'Automático', standardItems: 'Teto solar panorâmico, Câmera 360, SmartSense', revisions: 'Revisão de 10.000km feita'
  },
  // 7. Chevrolet Tracker
  {
    id: 'v7', companyId: 'comp1', brand: 'Chevrolet', model: 'Tracker', category: 'SUV', color: 'Branco',
    plate: 'TRK7G56', purchasePrice: 108000, announcedPrice: 125000, discount: 0, maintenance: [],
    entryDate: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 24, saleGoalDays: 30, adCost: 19,
    salespersonId: 'sp2', imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b4c0b395?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'SUV turbo com 6 airbags, Wi-Fi nativo e teto solar panorâmico. Ótimo custo-benefício.',
    ipvaCost: 2800, ipvaDueDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000).toISOString(), isPriority: false, isAdActive: true,
    modelYear: 2022, fabricationYear: 2021, mileage: 31000, fuelType: 'Flex', transmission: 'Automático', standardItems: 'Wi-Fi nativo, Teto solar panorâmico, Alerta de colisão frontal', documentStatus: 'Quitado'
  },
  // 8. Toyota Corolla Cross
  {
    id: 'v8', companyId: 'comp1', brand: 'Toyota', model: 'Corolla Cross', category: 'SUV', color: 'Cinza',
    plate: 'TCC8H78', purchasePrice: 155000, announcedPrice: 175000, discount: 0, maintenance: [],
    entryDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 32, saleGoalDays: 60, adCost: 28,
    imageUrl: 'https://images.unsplash.com/photo-1635492193233-a8c6c9a334b0?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'A confiabilidade Corolla em versão SUV. Híbrido, super econômico e com pacote de segurança Toyota Safety Sense.',
    isPriority: false, isAdActive: true,
    modelYear: 2022, fabricationYear: 2022, mileage: 22000, fuelType: 'Híbrido', transmission: 'CVT', standardItems: 'Toyota Safety Sense, Teto solar, Ar dual-zone', history: 'Garantia de fábrica vigente'
  },
  // 9. Fiat Toro
  {
    id: 'v9', companyId: 'comp1', brand: 'Fiat', model: 'Toro', category: 'Caminhonete', color: 'Vinho',
    plate: 'TOR9I90', purchasePrice: 130000, announcedPrice: 149000, discount: 4000, maintenance: [],
    entryDate: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 28, saleGoalDays: 45, adCost: 24,
    salespersonId: 'owner1', imageUrl: 'https://images.unsplash.com/photo-1633596924373-3036495c3a37?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'Design premiado e muita versatilidade. Caçamba inteligente e motor Turbo Flex. Perfeita para quem busca mais que uma picape.',
    ipvaCost: 3100, ipvaDueDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), isPriority: true, isAdActive: true,
    modelYear: 2021, fabricationYear: 2021, mileage: 55000, fuelType: 'Flex', transmission: 'Automático', standardItems: 'Multimídia vertical, Capota rígida, Faróis Full LED', additionalAccessories: 'Santo antônio'
  },
  // 10. Volkswagen Nivus
  {
    id: 'v10', companyId: 'comp1', brand: 'Volkswagen', model: 'Nivus', category: 'SUV', color: 'Vermelho',
    plate: 'NIV1J23', purchasePrice: 105000, announcedPrice: 121000, discount: 1000, maintenance: [],
    entryDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 23, saleGoalDays: 30, adCost: 18,
    imageUrl: 'https://images.unsplash.com/photo-1607764522432-5c323ef45a27?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'SUV Coupé com design inovador e central multimídia VW Play. Esportividade e tecnologia em um só carro.',
    isPriority: false, isAdActive: true,
    modelYear: 2023, fabricationYear: 2022, mileage: 18000, fuelType: 'Flex', transmission: 'Automático', standardItems: 'VW Play, ACC, Painel digital', revisions: 'Revisões em dia'
  },
  // 11. Honda HR-V
  {
    id: 'v11', companyId: 'comp1', brand: 'Honda', model: 'HR-V', category: 'SUV', color: 'Prata',
    plate: 'HRV2K45', purchasePrice: 125000, announcedPrice: 142000, discount: 0, maintenance: [],
    entryDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 27, saleGoalDays: 45, adCost: 23,
    salespersonId: 'sp1', imageUrl: 'https://images.unsplash.com/photo-1651912836248-237c08a5091a?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'Nova geração com mais espaço, design sofisticado e o pacote de segurança Honda SENSING.',
    isPriority: false, isAdActive: true,
    modelYear: 2023, fabricationYear: 2023, mileage: 9500, fuelType: 'Flex', transmission: 'CVT', standardItems: 'Honda SENSING, Magic Seat, Multimídia 8"', history: 'Única dona'
  },
  // 12. Toyota Hilux
  {
    id: 'v12', companyId: 'comp1', brand: 'Toyota', model: 'Hilux', category: 'Caminhonete', color: 'Branco',
    plate: 'HIL3L67', purchasePrice: 220000, announcedPrice: 245000, discount: 0, maintenance: [],
    entryDate: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 40, saleGoalDays: 60, adCost: 35,
    imageUrl: 'https://images.unsplash.com/photo-1627443490989-08d7c433a23a?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'Lendária picape média. Sinônimo de robustez e durabilidade. Versão SRX 4x4 Diesel pronta para qualquer desafio.',
    isPriority: false, isAdActive: true,
    modelYear: 2020, fabricationYear: 2020, mileage: 80000, fuelType: 'Diesel', transmission: 'Automático', traction: '4x4', standardItems: 'Bancos de couro, Multimídia com GPS, Protetor de caçamba', documentStatus: 'IPVA 2024 pago'
  },
  // 13. Fiat Pulse
  {
    id: 'v13', companyId: 'comp1', brand: 'Fiat', model: 'Pulse', category: 'SUV', color: 'Azul',
    plate: 'PUL4M89', purchasePrice: 98000, announcedPrice: 112000, discount: 2000, maintenance: [],
    entryDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 21, saleGoalDays: 30, adCost: 17,
    salespersonId: 'sp2', imageUrl: 'https://images.unsplash.com/photo-1664032333796-0a0c2a2e1d8a?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'O primeiro SUV da Fiat no Brasil. Conectado, seguro e com motor turbo para uma performance surpreendente.',
    ipvaCost: 2100, ipvaDueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), isPriority: true, isAdActive: false,
    modelYear: 2023, fabricationYear: 2022, mileage: 25000, fuelType: 'Flex', transmission: 'Automático', standardItems: 'Fiat Connect Me, Carregador sem fio, Roda 17"', revisions: 'Garantia de fábrica'
  },
  // 14. Renault Kwid
  {
    id: 'v14', companyId: 'comp1', brand: 'Renault', model: 'Kwid', category: 'Hatch', color: 'Laranja',
    plate: 'KWD5N12', purchasePrice: 55000, announcedPrice: 65000, discount: 1000, maintenance: [],
    entryDate: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 12, saleGoalDays: 30, adCost: 8,
    imageUrl: 'https://images.unsplash.com/photo-1617069359037-124b613f1911?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'O SUV dos compactos. Econômico, ágil e com a maior altura do solo da categoria. Ideal para a cidade.',
    isPriority: false, isAdActive: true,
    modelYear: 2022, fabricationYear: 2022, mileage: 16000, fuelType: 'Flex', transmission: 'Manual', standardItems: 'Média Evolution, Direção elétrica, 4 airbags', history: 'Baixo KM'
  },
  // 15. Toyota Yaris
  {
    id: 'v15', companyId: 'comp1', brand: 'Toyota', model: 'Yaris', category: 'Hatch', color: 'Vermelho',
    plate: 'YAR6O34', purchasePrice: 85000, announcedPrice: 97000, discount: 0, maintenance: [],
    entryDate: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(), dailyCost: 20, saleGoalDays: 45, adCost: 15,
    salespersonId: 'owner1', imageUrl: 'https://images.unsplash.com/photo-1599421498111-ad70942dfa83?q=80&w=800&auto=format&fit=crop',
    status: 'available', description: 'Confiabilidade Toyota com design moderno. Câmbio CVT, 7 airbags e controle de estabilidade.',
    ipvaCost: 1950, ipvaDueDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), isPriority: true, isAdActive: true,
    modelYear: 2021, fabricationYear: 2020, mileage: 48000, fuelType: 'Flex', transmission: 'CVT', standardItems: 'Teto solar, 7 airbags, Chave presencial', documentStatus: 'Tudo em dia'
  },
  ...fictitiousSoldVehicles,
];

const initialTeamMembers: TeamMember[] = [
    { id: 'owner1', companyId: 'comp1', name: 'Paulo Moura', email: 'triad3@triad3.io', phone: '(11) 98888-7777', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', monthlySalesGoal: 0, role: 'Gestor' },
    { id: 'sp1', companyId: 'comp1', name: 'Carlos Silva', email: 'carlos@autovendas.com', phone: '(11) 98765-4321', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop', monthlySalesGoal: 5, role: 'Vendedor' },
    { id: 'sp2', companyId: 'comp1', name: 'Ana Pereira', email: 'ana@autovendas.com', phone: '(11) 91234-5678', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop', monthlySalesGoal: 3, role: 'Vendedor' },
    { id: 'tm1', companyId: 'comp1', name: 'Fernanda Lima', email: 'trafego@triad3.io', phone: '(11) 95555-4444', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', monthlySalesGoal: 0, role: 'Gestor de Tráfego' },
];

const initialReminders: Reminder[] = [
    { id: 'rem1', category: 'Follow-up', message: 'Ligar para clientes da semana passada.', assigneeId: 'sp1', date: '2024-08-15', time: '10:00', repetition: 'weekly', weekDays: ['mon', 'wed', 'fri'], isActive: true, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'rem2', category: 'Marketing', message: 'Verificar performance das campanhas do Hatch Z.', assigneeId: 'everyone', date: '2024-08-16', time: '15:30', repetition: 'daily', isActive: true, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'rem3', category: 'Documentação', message: 'Organizar documentos dos veículos vendidos.', assigneeId: 'sp2', date: '2024-08-20', time: '18:00', repetition: 'none', isActive: false, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
];

const initialAdminUsers: AdminUser[] = [
    { id: 'admin1', name: 'Admin Master', email: 'admin@triad3.io' },
];

// DATA CONTEXT
interface DataContextType {
    companies: Company[];
    vehicles: Vehicle[];
    teamMembers: TeamMember[];
    reminders: Reminder[];
    deactivatedAdVehicleIds: Set<string>;
    notifications: Notification[];
    materialRequests: MaterialRequest[];
    adminUsers: AdminUser[];
    adminNotifications: AdminNotification[];
    logs: LogEntry[];
    updateCompanyStatus: (id: string, isActive: boolean) => void;
    addCompany: (company: Omit<Company, 'id' | 'isActive' | 'monthlySalesGoal'>) => void;
    updateCompany: (company: Company) => void;
    deleteCompany: (id: string) => void;
    addVehicle: (vehicle: Omit<Vehicle, 'id' | 'companyId'>) => void;
    updateVehicle: (vehicle: Vehicle) => void;
    deleteVehicle: (id: string) => void;
    addTeamMember: (teamMember: Omit<TeamMember, 'id' | 'companyId' | 'avatarUrl'>) => void;
    updateTeamMember: (teamMember: TeamMember) => void;
    deleteTeamMember: (id: string) => void;
    addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void;
    updateReminder: (reminder: Reminder) => void;
    deleteReminder: (id: string) => void;
    markVehicleAsSold: (id: string) => void;
    assignSalesperson: (vehicleId: string, salespersonId: string | null) => void;
    toggleVehiclePriority: (id: string) => void;
    toggleVehicleAdStatus: (id: string) => void;
    markAdAsDeactivated: (vehicleId: string) => void;
    addNotification: (message: string, recipientRole: UserRole) => void;
    markNotificationAsRead: (id: string) => void;
    addMaterialRequest: (request: Omit<MaterialRequest, 'id' | 'date' | 'status'>) => void;
    addAdminUser: (user: Omit<AdminUser, 'id'>) => void;
    updateAdminUser: (user: AdminUser) => void;
    deleteAdminUser: (id: string) => void;
    addAdminNotification: (message: string, type: AdminNotification['type']) => void;
    markAdminNotificationAsRead: (id: string) => void;
    logActivity: (type: LogType, description: string, details?: { companyId?: string; userId?: string; }) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [companies, setCompanies] = useState<Company[]>(initialCompanies);
    const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
    const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
    const [deactivatedAdVehicleIds, setDeactivatedAdVehicleIds] = useState<Set<string>>(new Set());
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([]);
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>(initialAdminUsers);
    const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Log Management
    const logActivity = (type: LogType, description: string, details: { companyId?: string, userId?: string } = {}) => {
        const company = companies.find(c => c.id === details.companyId);
        const user = teamMembers.find(tm => tm.id === details.userId);

        const newLog: LogEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            type,
            description,
            companyId: company?.id,
            companyName: company?.name,
            userId: user?.id,
            userName: user?.name,
        };
        setLogs(prev => [newLog, ...prev]);
    };


    // Admin Notification Management
    const addAdminNotification = (message: string, type: AdminNotification['type']) => {
        const newNotification: AdminNotification = {
            id: crypto.randomUUID(),
            message,
            date: new Date().toISOString(),
            read: false,
            type,
        };
        setAdminNotifications(prev => [newNotification, ...prev]);
    };

    const markAdminNotificationAsRead = (id: string) => {
        setAdminNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };


    // Admin User CRUD
    const addAdminUser = (userData: Omit<AdminUser, 'id'>) => {
        const newUser: AdminUser = { ...userData, id: crypto.randomUUID() };
        setAdminUsers(prev => [...prev, newUser]);
        // logActivity('ADMIN_USER_CREATED', `Admin ${newUser.name} foi adicionado.`);
    };
    const updateAdminUser = (updatedUser: AdminUser) => {
        setAdminUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        // logActivity('ADMIN_USER_UPDATED', `Admin ${updatedUser.name} foi atualizado.`);
    };
    const deleteAdminUser = (id: string) => {
        const userToDelete = adminUsers.find(u => u.id === id);
        if (userToDelete) {
            setAdminUsers(prev => prev.filter(u => u.id !== id));
            // logActivity('ADMIN_USER_DELETED', `Admin ${userToDelete.name} foi removido.`);
        }
    };


    // Notification Management
    const addNotification = (message: string, recipientRole: UserRole) => {
        const newNotification: Notification = {
            id: crypto.randomUUID(),
            message,
            date: new Date().toISOString(),
            read: false,
            recipientRole,
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markNotificationAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };


    const updateCompanyStatus = (id: string, isActive: boolean) => {
        const company = companies.find(c => c.id === id);
        if(company) {
            setCompanies(prev => prev.map(c => c.id === id ? { ...c, isActive } : c));
            logActivity(
                isActive ? 'COMPANY_APPROVED' : 'COMPANY_DEACTIVATED',
                `Empresa ${company.name} foi ${isActive ? 'aprovada' : 'desativada'}.`,
                { companyId: id }
            );
        }
    };
    
    const addCompany = (companyData: Omit<Company, 'id' | 'isActive' | 'monthlySalesGoal'>) => {
        const newCompany: Company = {
            ...companyData,
            id: crypto.randomUUID(),
            isActive: false, // New companies are inactive by default, pending approval
            monthlySalesGoal: 10, // Default sales goal
        };
        setCompanies(prev => [...prev, newCompany]);
        addAdminNotification(`Nova empresa cadastrada: ${newCompany.name}.`, 'new_company');
        logActivity('COMPANY_PENDING', `Empresa ${newCompany.name} cadastrada e aguardando aprovação.`, { companyId: newCompany.id });
    };

    const updateCompany = (updatedCompany: Company) => {
        setCompanies(prev => prev.map(c => c.id === updatedCompany.id ? updatedCompany : c));
    };
    
    const deleteCompany = (id: string) => {
        const companyToDelete = companies.find(c => c.id === id);
        if (companyToDelete) {
            logActivity('COMPANY_DELETED', `Empresa ${companyToDelete.name} e todos os seus dados foram removidos.`, { companyId: id });
            setCompanies(prev => prev.filter(c => c.id !== id));
            setTeamMembers(prev => prev.filter(tm => tm.companyId !== id));
            setVehicles(prev => prev.filter(v => v.companyId !== id));
        }
    };


    // Vehicle CRUD
    const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'companyId'>) => {
        const newVehicle: Vehicle = {
            ...vehicleData,
            id: crypto.randomUUID(),
            companyId: 'comp1', // Hardcoded for this company's dashboard
            status: 'available',
            isAdActive: true, // Default new ads to active
        };
        setVehicles(prev => [...prev, newVehicle]);
        logActivity('VEHICLE_CREATED', `Veículo ${newVehicle.brand} ${newVehicle.model} (${newVehicle.plate}) cadastrado.`, { companyId: 'comp1' });
    };

    const updateVehicle = (updatedVehicle: Vehicle) => {
        setVehicles(prev => prev.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
    };

    const deleteVehicle = (id: string) => {
        const vehicleToDelete = vehicles.find(v => v.id === id);
        if(vehicleToDelete){
            logActivity('VEHICLE_DELETED', `Veículo ${vehicleToDelete.brand} ${vehicleToDelete.model} (${vehicleToDelete.plate}) removido.`, { companyId: vehicleToDelete.companyId });
            setVehicles(prev => prev.filter(v => v.id !== id));
        }
    };

    const markVehicleAsSold = (id: string) => {
        const vehicleToSell = vehicles.find(v => v.id === id);
        if(vehicleToSell){
            logActivity('VEHICLE_SOLD', `Veículo ${vehicleToSell.brand} ${vehicleToSell.model} (${vehicleToSell.plate}) marcado como vendido.`, { companyId: vehicleToSell.companyId, userId: vehicleToSell.salespersonId });
            setVehicles(prev => prev.map(v => (v.id === id ? { ...v, status: 'sold', saleDate: new Date().toISOString(), isAdActive: false } : v)));
        }
    };

    const assignSalesperson = (vehicleId: string, salespersonId: string | null) => {
        setVehicles(prev => prev.map(v => (v.id === vehicleId ? { ...v, salespersonId: salespersonId || undefined } : v)));
    };

    const toggleVehiclePriority = (id: string) => {
        setVehicles(prev => prev.map(v => (v.id === id ? { ...v, isPriority: !v.isPriority } : v)));
    };
    
    const toggleVehicleAdStatus = (id: string) => {
        setVehicles(prev => prev.map(v => (v.id === id ? { ...v, isAdActive: !v.isAdActive } : v)));
    };

    const markAdAsDeactivated = (vehicleId: string) => {
        setDeactivatedAdVehicleIds(prev => new Set(prev).add(vehicleId));
        const vehicle = vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            addNotification(`Anúncio para ${vehicle.brand} ${vehicle.model} (${vehicle.plate}) foi desativado com sucesso.`, 'company');
        }
    };


    // Team Member CRUD
    const addTeamMember = (teamMemberData: Omit<TeamMember, 'id' | 'companyId' | 'avatarUrl'>) => {
        const newTeamMember: TeamMember = {
            ...teamMemberData,
            id: crypto.randomUUID(),
            companyId: 'comp1',
             avatarUrl: `https://avatar.iran.liara.run/public/boy?username=${crypto.randomUUID()}`,
        };
        setTeamMembers(prev => [...prev, newTeamMember]);
        logActivity('USER_CREATED', `Usuário ${newTeamMember.name} (${newTeamMember.role}) foi criado.`, { companyId: 'comp1', userId: newTeamMember.id });
    };

    const updateTeamMember = (updatedTeamMember: TeamMember) => {
        setTeamMembers(prev => prev.map(s => s.id === updatedTeamMember.id ? updatedTeamMember : s));
        logActivity('USER_UPDATED', `Dados de ${updatedTeamMember.name} foram atualizados.`, { companyId: updatedTeamMember.companyId, userId: updatedTeamMember.id });
    };

    const deleteTeamMember = (id: string) => {
        const memberToDelete = teamMembers.find(m => m.id === id);
        if (memberToDelete) {
             logActivity('USER_DELETED', `Usuário ${memberToDelete.name} foi removido.`, { companyId: memberToDelete.companyId, userId: id });
             setTeamMembers(prev => prev.filter(s => s.id !== id));
        }
    };

    // Reminder CRUD
    const addReminder = (reminderData: Omit<Reminder, 'id' | 'createdAt'>) => {
        const newReminder: Reminder = { 
            ...reminderData, 
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        setReminders(prev => [...prev, newReminder]);
        logActivity('REMINDER_CREATED', `Lembrete "${newReminder.message}" criado.`, { companyId: 'comp1' });
    };

    const updateReminder = (updatedReminder: Reminder) => {
        setReminders(prev => prev.map(r => r.id === updatedReminder.id ? updatedReminder : r));
        logActivity('REMINDER_UPDATED', `Lembrete "${updatedReminder.message}" atualizado.`, { companyId: 'comp1' });
    };

    const deleteReminder = (id: string) => {
        const reminderToDelete = reminders.find(r => r.id === id);
        if (reminderToDelete) {
            logActivity('REMINDER_DELETED', `Lembrete "${reminderToDelete.message}" removido.`, { companyId: 'comp1' });
            setReminders(prev => prev.filter(r => r.id !== id));
        }
    };

     // Material Request Management
    const addMaterialRequest = (request: Omit<MaterialRequest, 'id' | 'date' | 'status'>) => {
        const newRequest: MaterialRequest = {
            ...request,
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            status: 'pending',
        };
        setMaterialRequests(prev => [newRequest, ...prev]);

        const vehicle = vehicles.find(v => v.id === request.vehicleId);
        const requester = teamMembers.find(tm => tm.id === request.requesterId);
        let assigneeName = '';

        if (request.assigneeId === 'comp1') {
            assigneeName = companies.find(c => c.id === request.assigneeId)?.name || 'a empresa';
        } else {
            const assignee = teamMembers.find(tm => tm.id === request.assigneeId);
            assigneeName = assignee?.name || 'desconhecido';
        }

        if (vehicle && requester) {
             addNotification(
                `${requester.name} solicitou materiais para o ${vehicle.brand} ${vehicle.model}. Atribuído a: ${assigneeName}.`,
                'company'
            );
        }
    };


    const value = {
        companies,
        vehicles,
        teamMembers,
        reminders,
        deactivatedAdVehicleIds,
        notifications,
        materialRequests,
        adminUsers,
        adminNotifications,
        logs,
        updateCompanyStatus,
        addCompany,
        updateCompany,
        deleteCompany,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addReminder,
        updateReminder,
        deleteReminder,
        markVehicleAsSold,
        assignSalesperson,
        toggleVehiclePriority,
        toggleVehicleAdStatus,
        markAdAsDeactivated,
        addNotification,
        markNotificationAsRead,
        addMaterialRequest,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        addAdminNotification,
        markAdminNotificationAsRead,
        logActivity,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};