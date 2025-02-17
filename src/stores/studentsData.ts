import { ref } from "vue";

export type Student = {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  active: boolean;
  birthDate: string;
  softDelete: boolean;
};

export const initStudents: Student[] = [
  {
    id: 0,
    fullName: "علی رضایی",
    studentId: "123456",
    email: "ali@example.com",
    active: true,
    birthDate: "2000-01-01",
    softDelete: false,
  },
  {
    id: 1,
    fullName: "زهرا محمدی",
    studentId: "654321",
    email: "zahra@example.com",
    active: false,
    birthDate: "1999-12-31",
    softDelete: false,
  },
  {
    id: 2,
    fullName: "محمد احمدی",
    studentId: "987654",
    email: "mohammad@example.com",
    active: true,
    birthDate: "2001-05-15",
    softDelete: false,
  },
  {
    id: 3,
    fullName: "فاطمه حسینی",
    studentId: "456789",
    email: "fatemeh@example.com",
    active: true,
    birthDate: "2002-07-22",
    softDelete: false,
  },
  {
    id: 4,
    fullName: "سعید کریمی",
    studentId: "112233",
    email: "saeed@example.com",
    active: false,
    birthDate: "2000-03-10",
    softDelete: true,
  },
  {
    id: 5,
    fullName: "نرگس شریفی",
    studentId: "334455",
    email: "narges@example.com",
    active: true,
    birthDate: "1998-09-05",
    softDelete: false,
  },
  {
    id: 6,
    fullName: "رضا مرادی",
    studentId: "778899",
    email: "reza@example.com",
    active: false,
    birthDate: "1997-11-30",
    softDelete: false,
  },
  {
    id: 7,
    fullName: "مریم عباسی",
    studentId: "665544",
    email: "maryam@example.com",
    active: true,
    birthDate: "2001-06-18",
    softDelete: false,
  },
  {
    id: 8,
    fullName: "حسین جعفری",
    studentId: "223344",
    email: "hosein@example.com",
    active: false,
    birthDate: "1996-04-25",
    softDelete: true,
  },
  {
    id: 9,
    fullName: "لیلا قاسمی",
    studentId: "998877",
    email: "leila@example.com",
    active: true,
    birthDate: "2003-02-12",
    softDelete: false,
  },
  {
    id: 10,
    fullName: "مجید نوری",
    studentId: "332211",
    email: "majid@example.com",
    active: true,
    birthDate: "1995-08-14",
    softDelete: false,
  },
  {
    id: 11,
    fullName: "سمیرا خسروی",
    studentId: "112244",
    email: "samira@example.com",
    active: false,
    birthDate: "2002-10-03",
    softDelete: false,
  },
  {
    id: 12,
    fullName: "پریسا ملکی",
    studentId: "556677",
    email: "parisa@example.com",
    active: true,
    birthDate: "1994-06-20",
    softDelete: false,
  },
  {
    id: 13,
    fullName: "کامران یزدی",
    studentId: "778811",
    email: "kamran@example.com",
    active: true,
    birthDate: "1999-01-15",
    softDelete: false,
  },
  {
    id: 14,
    fullName: "نیلوفر رضوی",
    studentId: "990088",
    email: "niloufar@example.com",
    active: false,
    birthDate: "2003-11-09",
    softDelete: true,
  },
  {
    id: 15,
    fullName: "احسان نظری",
    studentId: "554433",
    email: "ehsan@example.com",
    active: true,
    birthDate: "2000-05-30",
    softDelete: false,
  },
  {
    id: 16,
    fullName: "راحله جباری",
    studentId: "887766",
    email: "rahele@example.com",
    active: true,
    birthDate: "1998-02-14",
    softDelete: false,
  },
  {
    id: 17,
    fullName: "حامد افشار",
    studentId: "221133",
    email: "hamed@example.com",
    active: false,
    birthDate: "2001-09-08",
    softDelete: false,
  },
  {
    id: 18,
    fullName: "شقایق رستمی",
    studentId: "443322",
    email: "shaghayegh@example.com",
    active: true,
    birthDate: "1996-07-17",
    softDelete: false,
  },
  {
    id: 19,
    fullName: "محسن ترابی",
    studentId: "665577",
    email: "mohsen@example.com",
    active: false,
    birthDate: "1997-12-21",
    softDelete: false,
  },
  {
    id: 20,
    fullName: "زهرا نادری",
    studentId: "990011",
    email: "zahran@example.com",
    active: true,
    birthDate: "2004-03-25",
    softDelete: false,
  },
  {
    id: 21,
    fullName: "امیرحسین صادقی",
    studentId: "123789",
    email: "amirhossein@example.com",
    active: true,
    birthDate: "2000-04-12",
    softDelete: false,
  },
  {
    id: 22,
    fullName: "سارا موسوی",
    studentId: "456123",
    email: "sara@example.com",
    active: false,
    birthDate: "1999-08-19",
    softDelete: false,
  },
  {
    id: 23,
    fullName: "پویا رحمانی",
    studentId: "789456",
    email: "pouya@example.com",
    active: true,
    birthDate: "2001-11-23",
    softDelete: false,
  },
  {
    id: 24,
    fullName: "نازنین امینی",
    studentId: "321654",
    email: "nazanin@example.com",
    active: true,
    birthDate: "2002-09-07",
    softDelete: false,
  },
  {
    id: 25,
    fullName: "مهدی کرمانی",
    studentId: "654987",
    email: "mahdi@example.com",
    active: false,
    birthDate: "1998-03-14",
    softDelete: true,
  },
  {
    id: 26,
    fullName: "هانیه طاهری",
    studentId: "987321",
    email: "haniyeh@example.com",
    active: true,
    birthDate: "2003-06-30",
    softDelete: false,
  },
  {
    id: 27,
    fullName: "علیرضا نوروزی",
    studentId: "147258",
    email: "alireza@example.com",
    active: true,
    birthDate: "1997-10-05",
    softDelete: false,
  },
  {
    id: 28,
    fullName: "مینا صالحی",
    studentId: "258369",
    email: "mina@example.com",
    active: false,
    birthDate: "2000-12-18",
    softDelete: false,
  },
  {
    id: 29,
    fullName: "رضوان علیزاده",
    studentId: "369147",
    email: "rezvan@example.com",
    active: true,
    birthDate: "1999-02-22",
    softDelete: false,
  },
  {
    id: 30,
    fullName: "امیرمحمد حسنی",
    studentId: "741852",
    email: "amirmohammad@example.com",
    active: true,
    birthDate: "2001-07-11",
    softDelete: false,
  },
  {
    id: 31,
    fullName: "زینب رضوانی",
    studentId: "852963",
    email: "zeynab@example.com",
    active: false,
    birthDate: "1996-05-09",
    softDelete: true,
  },
  {
    id: 32,
    fullName: "محمدجواد فاضلی",
    studentId: "963852",
    email: "mohammadjavad@example.com",
    active: true,
    birthDate: "2002-08-16",
    softDelete: false,
  },
  {
    id: 33,
    fullName: "فائزه غفاری",
    studentId: "159753",
    email: "faezeh@example.com",
    active: true,
    birthDate: "1998-01-27",
    softDelete: false,
  },
  {
    id: 34,
    fullName: "امیررضا قربانی",
    studentId: "357951",
    email: "amirreza@example.com",
    active: false,
    birthDate: "2003-04-03",
    softDelete: false,
  },
  {
    id: 35,
    fullName: "نوید اکبری",
    studentId: "753159",
    email: "navid@example.com",
    active: true,
    birthDate: "1997-09-12",
    softDelete: false,
  },
  {
    id: 36,
    fullName: "سپیده رحیمی",
    studentId: "951357",
    email: "sepideh@example.com",
    active: true,
    birthDate: "2000-06-28",
    softDelete: false,
  },
  {
    id: 37,
    fullName: "حسام الدین محمودی",
    studentId: "357159",
    email: "hesam@example.com",
    active: false,
    birthDate: "1999-03-19",
    softDelete: false,
  },
  {
    id: 38,
    fullName: "مینا کاظمی",
    studentId: "159357",
    email: "minak@example.com",
    active: true,
    birthDate: "2001-12-10",
    softDelete: false,
  },
  {
    id: 39,
    fullName: "محمدحسین نجفی",
    studentId: "753951",
    email: "mohammadhossein@example.com",
    active: true,
    birthDate: "1995-07-24",
    softDelete: false,
  },
  {
    id: 40,
    fullName: "زهرا صفری",
    studentId: "951753",
    email: "zahras@example.com",
    active: false,
    birthDate: "2004-01-08",
    softDelete: false,
  },
];
