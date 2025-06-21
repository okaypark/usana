import { users, contacts, faqs, type User, type InsertUser, type Contact, type InsertContact, type Faq, type InsertFaq } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  updateContactStatus(id: number, isContacted: boolean): Promise<Contact | undefined>;
  
  getFaqs(): Promise<Faq[]>;
  createFaq(faq: InsertFaq): Promise<Faq>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private faqs: Map<number, Faq>;
  private currentUserId: number;
  private currentContactId: number;
  private currentFaqId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.faqs = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentFaqId = 1;
    
    // Initialize with default FAQs
    this.initializeFaqs();
  }

  private initializeFaqs() {
    const defaultFaqs: Omit<Faq, 'id'>[] = [
      {
        question: "USANA 제품의 안전성은 어떻게 보장되나요?",
        answer: "USANA는 FDA 승인 시설에서 제조되며, 세계 최초로 NSF 국제인증을 받은 건강기능식품 회사입니다. 모든 제품은 엄격한 품질 관리 시스템을 거쳐 생산되며, 비교 가이드에서 15년 연속 1위 등급을 받을 정도로 안전성과 효능이 검증되어 있습니다.",
        category: "product",
        order: 1
      },
      {
        question: "건강 구독 서비스는 언제든지 해지할 수 있나요?",
        answer: "네, 언제든지 해지 가능합니다. 최소 구독 기간이나 위약금은 없으며, 해지 신청 후 다음 달부터 자동으로 구독이 중단됩니다. 고객님의 만족이 최우선이며, 부담 없이 건강한 라이프스타일을 경험해보실 수 있습니다.",
        category: "subscription",
        order: 2
      },
      {
        question: "사업을 시작하려면 초기 비용이 얼마나 필요한가요?",
        answer: "USANA 사업은 낮은 초기 비용으로 시작할 수 있습니다. 회원 가입비 없이 제품 구매만으로 사업을 시작할 수 있으며, 개인의 목표와 상황에 맞는 다양한 시작 패키지를 제공합니다. 자세한 비용과 수익 구조는 개별 상담을 통해 안내해드립니다.",
        category: "business",
        order: 3
      },
      {
        question: "네트워크 마케팅이 피라미드 판매와 다른 점은 무엇인가요?",
        answer: "USANA는 합법적인 다단계 직접판매업체로 공정거래위원회에 신고된 정당한 사업입니다. 피라미드 판매와 달리, 실제 우수한 제품의 판매를 기반으로 하며, 가입비나 후원수수료 없이 제품 판매 실적에 따른 투명한 수수료 체계를 운영합니다.",
        category: "business",
        order: 4
      },
      {
        question: "제품 효과를 언제부터 느낄 수 있나요?",
        answer: "개인차가 있지만, 대부분의 고객분들이 2-4주 내에 에너지 증가, 수면의 질 개선 등의 변화를 경험합니다. 꾸준히 복용하실 경우 2-3개월 후 더욱 뚜렷한 건강상의 개선을 느끼실 수 있습니다. 개인의 건강 상태와 생활 습관에 따라 차이가 있을 수 있습니다.",
        category: "product",
        order: 5
      },
      {
        question: "전업 주부도 사업을 할 수 있나요?",
        answer: "물론입니다! 실제로 많은 전업 주부분들이 USANA 사업으로 성공적인 수익을 창출하고 계십니다. 집에서 할 수 있는 사업이며, 육아와 병행 가능한 유연한 시간 운영이 가능합니다. 주부님들의 네트워크와 소통 능력을 활용한 맞춤형 사업 전략을 제공해드립니다.",
        category: "business",
        order: 6
      }
    ];

    defaultFaqs.forEach(faq => {
      const id = this.currentFaqId++;
      this.faqs.set(id, { ...faq, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const newContact: Contact = {
      id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email ?? null,
      interest: contact.interest,
      message: contact.message ?? null,
      createdAt: new Date(),
      isContacted: false,
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateContactStatus(id: number, isContacted: boolean): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (contact) {
      const updatedContact = { ...contact, isContacted };
      this.contacts.set(id, updatedContact);
      return updatedContact;
    }
    return undefined;
  }

  async getFaqs(): Promise<Faq[]> {
    return Array.from(this.faqs.values()).sort((a, b) => a.order - b.order);
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const id = this.currentFaqId++;
    const newFaq: Faq = { 
      ...faq, 
      id,
      order: faq.order ?? id
    };
    this.faqs.set(id, newFaq);
    return newFaq;
  }
}

export const storage = new MemStorage();
