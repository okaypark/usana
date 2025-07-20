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
        question: "USANA 제품의 안전성은 어떻게 보장되나요? 🛡️",
        answer: "✅ USANA는 FDA 승인 시설에서 제조되며, 세계 최초로 NSF 국제인증을 받은 건강기능식품 회사입니다.\n\n🏃‍♂️ NSF 스포츠 인증을 통해 스포츠 선수들이 섭취해도 안전한 제품이며, 모든 제품은 FDA 의약품제조시설에서 매년 FDA의 까다로운 검증을 받으며 높은 품질과 안전성을 인증받고 있습니다.\n\n🔬 150명의 과학자들이 주위에서는 볼 수 없는 높은 과학기술력으로 제품을 생산하고 있어서, 높은 효능과 효과로 국내에도 명품영양제, 프리미엄 영양제, 국가대표선수들이 선호하는 영양제로 알려지고 있습니다. ⭐",
        category: "product",
        order: 1
      },
      {
        question: "건강 구독 서비스는 언제든지 해지할 수 있나요? 📋",
        answer: "✅ 네, 언제든지 해지 가능합니다!\n\n🆓 최소 구독 기간이나 위약금은 없으며, 해지 신청 후 다음 달부터 자동으로 구독이 중단됩니다. 고객님의 만족이 최우선이며, 부담 없이 건강한 라이프스타일을 경험해보실 수 있습니다. 💝",
        category: "subscription",
        order: 2
      },
      {
        question: "사업을 시작하려면 초기 비용이 얼마나 필요한가요? 💰",
        answer: "🚀 USANA 사업은 낮은 초기 비용으로 시작할 수 있습니다!\n\n🆓 회원 가입비 없이 제품 구매만으로 사업을 시작할 수 있으며, 개인의 목표와 상황에 맞는 다양한 시작 패키지를 제공합니다. 자세한 비용과 수익 구조는 개별 상담을 통해 안내해드립니다. 📞",
        category: "business",
        order: 3
      },
      {
        question: "네트워크마케팅 유사나는 피라미드 다단계 판매와 다른 점은 무엇인가요? ⚖️",
        answer: "✅ 피라미드 다단계 판매와 달리, 매월 높은 매출압박도 없고, 직급유지등 다양한 매출조건들이 전혀 없고, 실적이 매주 이월되기 때문에 사재기가 전혀 없이, 자연스러운 개인맞춤 건강구독 소비로 모든 후원수당을 지급하고 있습니다. 📊",
        category: "business",
        order: 4
      },
      {
        question: "제품 효과를 언제부터 느낄 수 있나요? ⏰",
        answer: "📈 개인차가 있지만, 대부분의 고객분들이 2-4주 내에 에너지 증가, 수면의 질 개선 등의 변화를 경험합니다.\n\n💪 꾸준히 복용하실 경우 2-3개월 후 더욱 뚜렷한 건강상의 개선을 느끼실 수 있습니다. 장내 독소와 체내염증으로 건강상태가 나쁜 분들은 고함량 영양흡수가 잘 안되서 먼저 해독으로 독소를 제거해서 염증을 완화시켜주고, 몸의 순환을 먼저 올려주는 해독 과정이 필요합니다. 그러면 보다 빠른 효과를 느끼실 수 있습니다. 개인의 건강 상태와 생활 습관에 따라 차이가 있을 수 있습니다. ✨",
        category: "product",
        order: 5
      },
      {
        question: "전업 주부도 사업을 할 수 있나요? 👩‍👧‍👦",
        answer: "🏠 물론입니다! 실제로 많은 전업 주부분들이 USANA 사업으로 성공적인 수익을 창출하고 계십니다.\n\n⏰ 집에서 할 수 있는 사업이며, 육아와 병행 가능한 유연한 시간 운영이 가능합니다. 주부님들의 네트워크와 소통 능력을 활용한 맞춤형 사업 전략을 제공해드립니다. 💪",
        category: "business",
        order: 6
      },
      {
        question: "판매에 대한 부담이나 압박은 없나요? 💭",
        answer: "💡 소비만으로 시작되는 건강한 수익 시스템\n제가 소개한 단 두 명의 구독자로부터 시작된 소비는, 그 이후에 이어지는 모든 하위 구독자의 소비까지 무제한 포인트로 누적되며 그 포인트에 대한 캐시백이 자연스러운 소비만으로도 지급되는 구조입니다.\n\n🤝 누구나 쉽게 시작하고, 바로 보상을 경험할 수 있는 구조\n유사나는 기존 다단계와 달리 매달 과도한 판매 조건이나 실적 압박이 없습니다.\n\n지인에게 좋은 제품 경험과 건강한 변화를 부담 없이 자연스럽게 소개할 수 있고, 특히 \"나도 구독만 하고 싶다\"는 사람에게도 자신의 소비에 대한 캐시백이 바로 지급되기 때문에, 처음 시작하는 분들도 쉽게 보상을 경험할 수 있습니다. ✨",
        category: "business",
        order: 7
      },
      {
        question: "건강구독이 무슨 뜻인가요? 🔄",
        answer: "💊 건강을 위한 많은 소비자들이 비정기적 혹은 정기적으로 영양제를 구매해서 드시고 있는데, 여러 회사 제품들을 본인의 취향에 따라 중복해서 드시거나, 성분들이 겹치는 등 소비자 입장에서 선별선택해서 드시기 어렵습니다.\n\n📅 또한 정기적 섭취를 위한 정기적 구매를 깜박하거나 하면서 패턴을 놓치는 경우가 많습니다.\n\n🎯 이에 유사나 건강구독은 개인에게 맞춤 최적의 영양을 상담을 통해 개인맞춤 구성해서 매 4주마다 자동으로 구매되는 구독시스템입니다.\n\n💰 구독으로 인해 10% 할인 및 제품의 구독을 소개함으로써 2명 정도, 그들도 구독과 소개를 이어가면서 나에게 추가수입까지 주는 혜택들이 있습니다.\n\n✈️ 그 밖에 다양한 제주 등 국내여행 혜택과, 일본, 베트남, 태국 등 아시아 여행, 더 나아가 미국, 두바이, 유럽 등 다양한 해외여행의 혜택도 주어지는 구독시스템입니다.",
        category: "subscription",
        order: 8
      },
      {
        question: "저는 인맥이 별로 없는데 할 수 있나요? 👥",
        answer: "😊 유사나는 많은 인맥이 필요하지 않습니다!\n\n💪 건강구독을 통해서 먼저 나의 몸을 건강하게 바꾸면 내가 생활하는 주위 분들의 반응이 나타납니다. 그렇게 좋은 경험과 느낌을 전달해주시면 됩니다.\n\n👨‍👩‍👧‍👦 가족들, 주변에 자주가는 상가들, 이웃들 그중에 건강에 관심이 많으신 분 2명이면 됩니다.\n\n📱 또한 SNS, 블로그, 인스타그램 등 온라인을 통해서도 지인이 아닌 모르는 사람들에게 나의 좋은 체험과 건강한 변화를 전달할 수 있습니다. 온라인에서도 많은 기회가 있습니다.\n\n🌟 그 2명도 지인들 2명만 소개해도, 그렇게 부담없는 소개의 연속으로 상상도 못하는 수익을 가져가는 분들이 많습니다. 🎯",
        category: "business",
        order: 9
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
