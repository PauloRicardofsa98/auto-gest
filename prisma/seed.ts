/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, PrismaClient, ScheduleStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateClients = async () => {
  // Quantidade de clientes para gerar
  const clientsToGenerate = 50;

  const clients = Array.from({ length: clientsToGenerate }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: "9999999999",
    address: `${faker.location.streetAddress()}, ${faker.location.city()} - ${faker.location.state()}, Brasil`,
    cpfCnpj: faker.string.numeric(11),
    observations: faker.lorem.sentence(),
  }));

  await prisma.client.createMany({
    data: clients,
  });
};
const generateCategoryProducts = async () => {
  // Quantidade de clientes para gerar
  const generate = 10;

  const dados: Prisma.CategoryProductCreateInput[] = Array.from(
    { length: generate },
    () => ({
      name: faker.commerce.department(),
    }),
  );

  await prisma.categoryProduct.createMany({
    data: dados,
  });
};

const generateSuppliers = async () => {
  // Quantidade de clientes para gerar
  const generate = 25;

  const dados: Prisma.SupplierCreateInput[] = Array.from(
    { length: generate },
    () => {
      const name = faker.company.name();
      return {
        name: name,
        fantasyName: name,
        email: faker.internet.email(),
        phone: "9999999999",
        address: `${faker.location.streetAddress()}, ${faker.location.city()} - ${faker.location.state()}, Brasil`,
        cpfCnpj: faker.string.numeric(14),
        uf: "GO",
        observations: faker.lorem.sentence(),
        zipCode: faker.address.zipCode(),
      };
    },
  );

  await prisma.supplier.createMany({
    data: dados,
  });
};
const generateProducts = async () => {
  // Quantidade de clientes para gerar
  const generate = 25;

  const dados: Prisma.ProductCreateInput[] = Array.from(
    { length: generate },
    () => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      maximumStock: faker.number.int({ min: 1, max: 100 }),
      minimumStock: faker.number.int({ min: 1, max: 100 }),
      sku: faker.commerce.isbn(10),
      stock: faker.number.int({ min: 1, max: 100 }),
      unit: "UN",
      barcode: faker.commerce.isbn(13),
    }),
  );

  await prisma.product.createMany({
    data: dados,
  });
};
const generateServices = async () => {
  // Quantidade de clientes para gerar
  const generate = [
    "Lavagem simples",
    "Lavagem completa",
    "Polimento",
    "Higienização",
    "Lavagem detalhada",
    "Lavagem completa com cera",
    "Lavagem completa com polimento",
    "Lavagem completa com cera e polimento",
    "Higienização completa",
    "Higienização com polimento",
    "Higienização com cera",
    "Higienização com cera e polimento",
    "Higienização com cera e polimento completo",
    "Higienização com cera e polimento completo e cristalização",
    "Higienização com cera e polimento completo e cristalização e vitrificação",
  ];

  const dados: Prisma.ServiceCreateInput[] = generate.map((service) => ({
    name: service,
    price: faker.commerce.price(),
  }));

  await prisma.service.createMany({
    data: dados,
  });
};

const generateVehicles = async () => {
  // Quantidade de clientes para gerar
  const generate = 25;

  const clients = await prisma.client.findMany();

  const dados: Prisma.VehicleCreateManyInput[] = Array.from(
    { length: generate },
    () => {
      const random = Math.floor(Math.random() * clients.length);
      return {
        brand: "FIAT",
        model: faker.vehicle.model(),
        year: 2024,
        color: faker.vehicle.color(),
        plate: faker.vehicle.vin(),
        clientUuid: clients[random].uuid,
      };
    },
  );

  await prisma.vehicle.createMany({
    data: dados,
  });
};

const generateEmployers = async () => {
  // Quantidade de clientes para gerar
  const generate = 25;

  const dados: Prisma.EmployerCreateInput[] = Array.from(
    { length: generate },
    () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: "9999999999",
      address: `${faker.location.streetAddress()}, ${faker.location.city()} - ${faker.location.state()}, Brasil`,
      cpf: faker.string.numeric(11),
    }),
  );

  await prisma.employer.createMany({
    data: dados,
  });
};

const generateSchedules = async () => {
  const generate = 80;
  const services = await prisma.service.findMany();
  const vehicles = await prisma.vehicle.findMany({
    include: {
      client: true,
    },
  });
  const employers = await prisma.employer.findMany();
  const status = ["PENDING", "CANCELED", "DONE"];

  const dados: Prisma.ScheduleCreateManyInput[] = Array.from(
    { length: generate },
    () => {
      const randomService = Math.floor(Math.random() * services.length);
      const randomVehicle = Math.floor(Math.random() * vehicles.length);
      const randomEmployer = Math.floor(Math.random() * employers.length);
      const randomStatus = Math.floor(Math.random() * status.length);
      const statusSelected = status[randomStatus] as ScheduleStatus;

      return {
        clientUuid: vehicles[randomVehicle].client?.uuid || "",
        serviceUuid: services[randomService].uuid,
        employerUuid: employers[randomEmployer].uuid,
        vehicleUuid: vehicles[randomVehicle].uuid,
        status: statusSelected,
        dataSaid: statusSelected === "DONE" ? faker.date.recent() : null,
        createdAt: faker.date.recent(),
      };
    },
  );

  await prisma.schedule.createMany({
    data: dados,
  });
};

async function main() {
  console.log("Start seeding...");
  // await generateClients();
  // await generateCategoryProducts();
  // await generateProducts();
  // await generateSuppliers();
  // await generateServices();
  // await generateVehicles();
  // await generateEmployers();
  // await generateSchedules();
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
