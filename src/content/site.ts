// Todo o conteúdo da landing: textos, serviços, casas e links. Fonte: design/briefing.md.

/** Link de WhatsApp com mensagem pronta (url-encode automático). */
export const whatsapp = (numero: string, mensagem: string) => `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

export const MSG_AGENDAR = 'Olá! Vim através do site. Gostaria de agendar um horário.';
export const MSG_NOIVAS = 'Olá! Vim através do site. Gostaria de solicitar um orçamento para Noivas & Noivos.';

/** Aviso para leitores de tela em links que saem do site. */
export const SR_WHATSAPP = ' (WhatsApp, abre em nova aba)';
export const SR_NOVA_ABA = ' (abre em nova aba)';

export type Casa = {
  id: string;
  cidade: string;
  /** Rótulo curto na foto ("Na serra", "No litoral"). */
  regiao: string;
  endereco: string;
  enderecoCurto: string;
  telefone: { texto: string; tel: string };
  whatsapp: { texto: string; numero: string };
  mapa: string;
  foto: { src: string; w: number; h: number; alt: string };
};

export const casas: Casa[] = [
  {
    id: 'lages',
    cidade: 'Lages',
    regiao: 'Na serra',
    endereco: 'Rua Caetano Vieira da Costa, 412, Centro, Lages/SC, CEP 88502-070',
    enderecoCurto: 'Rua Caetano Vieira da Costa, 412, Centro',
    telefone: { texto: '(49) 3222-2363', tel: '+554932222363' },
    whatsapp: { texto: '(49) 99927-8109', numero: '5549999278109' },
    mapa: 'https://maps.app.goo.gl/bycKPnXKyTscYppD7',
    foto: {
      src: '/img/lages-fachada.webp',
      w: 495,
      h: 759,
      alt: 'Fachada da casa de Lages ao entardecer: prédio térreo branco com vidraças iluminadas, placa Leia e jardim com palmeiras',
    },
  },
  {
    id: 'florianopolis',
    cidade: 'Florianópolis',
    regiao: 'No litoral',
    endereco: 'Rua Doutor Armando Valério de Assis, 289, Centro, Florianópolis/SC, CEP 88025-120',
    enderecoCurto: 'Rua Doutor Armando Valério de Assis, 289, Centro',
    telefone: { texto: '(48) 3224-4097', tel: '+554832244097' },
    whatsapp: { texto: '(48) 99915-4131', numero: '5548999154131' },
    mapa: 'https://maps.app.goo.gl/n6o667Y6JuVpyeyc7',
    foto: {
      src: '/img/floripa-mezanino.webp',
      w: 498,
      h: 700,
      alt: 'Casa de Florianópolis: pé-direito duplo com mezanino de vidro, poltronas, logo Leia na parede escura e vaso dourado',
    },
  },
  {
    id: 'balneario',
    cidade: 'Balneário Camboriú',
    regiao: 'No litoral',
    endereco: 'Av. Atlântica, 3750, Salas 1 e 2, Barra Sul, Balneário Camboriú/SC, CEP 88300-024',
    enderecoCurto: 'Av. Atlântica, 3750, Salas 1 e 2, Barra Sul',
    telefone: { texto: '(47) 3361-0673', tel: '+554733610673' },
    whatsapp: { texto: '(47) 99652-8679', numero: '5547996528679' },
    mapa: 'https://maps.app.goo.gl/Fp5Yxw9pcYZfHjtg9',
    foto: {
      src: '/img/bc-salao.webp',
      w: 504,
      h: 741,
      alt: 'Salão principal da casa de Balneário Camboriú: parede de concreto, luminárias de tecido, cadeiras de couro preto e luz natural',
    },
  },
];

export const barber = {
  resumo: 'Barber Club, o espaço masculino de Lages',
  texto:
    'No mesmo endereço: cortes de cabelo e barba, coloração e hidratação. Tem cervejas, mesa de sinuca e esportes na TV, com atendimento feito exclusivamente por homens.',
  telefones: [
    { texto: '(49) 3019-4041', tel: '+554930194041' },
    { texto: '(49) 99824-6334', tel: '+5549998246334' },
  ],
};

export const nav = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#noivas', label: 'Noivas' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#casas', label: 'Casas' },
];

/** Menu do celular (CardNav): um card por parte da página, com atalhos para as seções. */
export const menuCelular = {
  cards: [
    {
      label: 'O salão',
      descricao: 'Cor, cuidado e o dia mais especial.',
      links: [
        { href: '#servicos', label: 'Serviços' },
        { href: '#noivas', label: 'Noivas & Noivos' },
      ],
    },
    {
      label: 'Sobre',
      descricao: 'Léia e Edson Avila, da Intercoiffure Mondial.',
      links: [{ href: '#sobre', label: 'Nossa história' }],
    },
    {
      label: 'Casas',
      descricao: 'Lages, Florianópolis e Balneário Camboriú.',
      links: [{ href: '#casas', label: 'Endereços e contatos' }],
    },
  ],
  cta: { href: '#casas', label: 'Agendar na sua casa' },
};

export const hero = {
  titulo: ['Há mais de 40 anos', 'elevando a beleza', 'com propósito'],
  lead: 'Salão de beleza em Lages, Florianópolis e Balneário Camboriú: cabelo, face, mãos e pés, podologia, spa e noivas, com a direção artística de Léia e Edson Avila.',
  cta: 'Agendar pelo WhatsApp',
  ctaNoivas: 'Orçamento para noivas',
  escolha: 'Escolha a casa. O WhatsApp abre com uma mensagem pronta:',
  numeros: [
    { valor: 40, sufixo: '+', rotulo: 'anos de história', href: '#sobre' },
    { valor: 3, sufixo: '', rotulo: 'casas em Santa Catarina', href: '#casas' },
  ],
  foto: {
    src: '/img/leia.webp',
    w: 623,
    h: 824,
    alt: 'Léia Avila sorrindo, de branco, sentada no braço de uma poltrona de couro diante de uma estante com vasos dourados',
    legenda: 'Léia Avila, hair stylist e art director',
  },
  fundo: { src: '/img/salao-luz.webp', srcSet: '/img/salao-luz-1024.webp 1024w, /img/salao-luz.webp 1536w' },
};

export const paris = {
  titulo: 'Talento brasileiro reconhecido em Paris!',
  honra: "Officer da L'Ordre de la Chevalerie",
  texto: 'Condecoração recebida por Léia Avila em Paris, durante a programação oficial da Intercoiffure Mondial.',
  link: {
    texto: 'Ler a matéria na Top Society',
    href: 'https://topsociety.com.br/leia-avila-recebe-reconhecimento-internacional-em-paris-e-consolida-sua-trajetoria-na-alta-coiffure/',
  },
};

export type Especialidade = {
  titulo: string;
  texto: string;
  acao: string;
  href: string;
  icone: 'mechas' | 'coloracao' | 'tratamentos' | 'noivas';
  escuro?: boolean;
};

export const especialidades = {
  titulo: 'Especialistas em mechas, coloração, tratamentos e noivas',
  itens: [
    { titulo: 'Mechas', texto: 'Mechas, luzes e balaiagem, com resultados personalizados.', acao: 'Agendar', href: '#casas', icone: 'mechas' },
    {
      titulo: 'Coloração',
      texto: 'Coloração, tonalizante e celofane. No Léia Salão, a cor ganha um novo fôlego.',
      acao: 'Agendar',
      href: '#casas',
      icone: 'coloracao',
    },
    {
      titulo: 'Tratamentos',
      texto: 'Hidratação, reestruturação dos fios, desintoxicação capilar, cauterização e massagem capilar.',
      acao: 'Agendar',
      href: '#casas',
      icone: 'tratamentos',
    },
    {
      titulo: 'Noivas',
      texto: 'Pacotes personalizados, com prévias de penteado e maquiagem.',
      acao: 'Ver pacotes',
      href: '#noivas',
      icone: 'noivas',
      escuro: true,
    },
  ] satisfies Especialidade[],
};

export const servicos = {
  titulo: 'Especialistas em cor e cuidado',
  texto: 'Mechas, coloração, tratamentos e noivas são a assinatura da casa. Valores e disponibilidade, pelo WhatsApp da sua casa.',
  cta: 'Ver as casas e agendar',
  todos: 'Todos os serviços',
  foto: {
    src: '/img/maquiagem.webp',
    w: 617,
    h: 792,
    alt: 'Modelo de cabelo castanho longo e ondulado sendo maquiada; mãos seguram o pincel e ajeitam os fios',
    legenda: 'Maquiagem e cabelo',
  },
  categorias: [
    {
      id: 'cabelo',
      nome: 'Cabelo',
      itens: [
        'Cortes femininos, masculinos e infantis',
        'Coloração, balaiagem, tonalizante, mechas, luzes e celofane',
        'Design de barba',
        'Escovas e penteados: presos, semipresos, tranças e baby liss',
        'Alisamentos, relaxamentos e recondicionamentos',
        'Alongamentos: apliques, mega hair e teceturas',
        'Tratamentos: hidratação, reestruturação dos fios, peeling, desintoxicação capilar, antiqueda, descamação e oleosidade',
        'Cauterização e massagem capilar',
      ],
    },
    {
      id: 'face',
      nome: 'Face',
      itens: [
        'Cílios: alongamento, colocação, coloração e permanente',
        'Maquiagem HD (high definition), social e definitiva',
        'Curso de automaquiagem',
        'Micropigmentação: micro lines (fios naturais) e microblading (fios realísticos para recuperação de design, cobertura de falhas e reconstrução total)',
        'Sobrancelha: design e coloração',
        'Pele: limpeza de pele, peeling de cristal e de cristal enzimático, hidratação da área dos olhos, drenagem linfática facial e pós-operatório',
      ],
    },
    {
      id: 'maos',
      nome: 'Mãos e pés',
      itens: [
        'Manicure e pedicure: esmaltação, unhas francesas e artísticas, hidratação com colágeno e elastina',
        'Esmaltação em gel: dura até 21 dias sem lascar, descascar ou perder o brilho, com secagem imediata',
        'Alongamento de unhas em gel, porcelana ou fibra de vidro',
        'Spa dos pés e das mãos: banho de sais, massagem, esfoliação e hidratação com parafina',
      ],
    },
    {
      id: 'podologia',
      nome: 'Podologia',
      itens: [
        'Prevenção e tratamento de fungos, micose, verruga plantar, calos e calosidades, unha encravada e pé de atleta',
        'Atendimento ao pé diabético',
        'Podogeriatria e podopediatria',
        'Órteses para correção de unhas',
        'Reflexologia podal',
      ],
    },
    {
      id: 'spa',
      nome: 'Spa',
      itens: [
        'Bambuterapia e terapia das pedras quentes',
        'Banhos de sais e aromáticos',
        'Massagens relaxantes e modeladoras; quick massagem',
        'Shiatsu corporal, facial e capilar',
        'Terapia das mãos e podorreflexologia',
        'Rejuvenescimento articular de joelho e cotovelo',
      ],
    },
    {
      id: 'depilacao',
      nome: 'Depilação',
      itens: ['Cera natural de baixa temperatura e cera fria', 'Depilação egípcia'],
    },
  ],
};

export const noivas = {
  titulo: 'Noivas & Noivos',
  lead: 'O dia mais especial merece o melhor. Pacotes personalizados para noivas, noivos, madrinhas e convidados, com rituais de tratamento e relaxamento e prévias de penteado e maquiagem.',
  texto: 'Ambientes exclusivos com banheiras, sala de massagem e lounges. Em feriados e domingos, o salão abre só para noivas e convidados.',
  orcamento: 'Pacotes sob orçamento. Peça o seu pelo WhatsApp:',
  fotos: [
    {
      src: '/img/noiva.webp',
      w: 658,
      h: 808,
      alt: 'Noiva com coque baixo e cacho desenhado na testa, maquiagem iluminada, véu com pérolas e buquê branco',
      legenda: 'Noiva',
    },
    {
      src: '/img/floripa-banheira.webp',
      w: 502,
      h: 702,
      alt: 'Banheira de hidromassagem com pétalas de rosa vermelhas e lavatório iluminado ao fundo',
      legenda: 'Banheira, casa de Florianópolis',
    },
    {
      src: '/img/maquiagem-rosada.webp',
      w: 641,
      h: 843,
      alt: 'Mulher com cabelo preso liso e maquiagem rosada esfumada, de jaqueta rosa metalizada',
      legenda: 'Maquiagem',
    },
  ],
};

export const sobre = {
  titulo: 'Léia e Edson Avila',
  lead: 'À frente da rede estão os art directors Léia e Edson Avila, membros da Intercoiffure Mondial, associação internacional que reúne mestres cabeleireiros do mundo todo.',
  paragrafos: [
    'Léia é hair stylist, especialista em visagismo, corte e cor. As coleções próprias do salão já foram apresentadas em palcos brasileiros e publicadas nas principais revistas de moda hair do país.',
    'Em cada casa, uma equipe completa de cabeleireiros, maquiadores, esteticistas, manicures e pedicures. São mais de 40 anos de história, hoje em três casas: na serra, em Lages, e no litoral, em Florianópolis e Balneário Camboriú.',
  ],
  fotos: [
    {
      src: '/img/equipe.webp',
      w: 661,
      h: 837,
      alt: 'Foto em preto e branco da equipe do Léia Salão, cerca de quinze pessoas vestidas de preto dentro do salão',
      legenda: 'A equipe Léia Salão',
    },
    {
      src: '/img/lages-recepcao.webp',
      w: 500,
      h: 715,
      alt: 'Recepção com parede grafite, quadro de moldura dourada com o logo Léia Salão e corredor com painéis de campanhas do salão',
      legenda: 'Recepção, casa de Lages',
    },
  ],
};

export const casasSecao = {
  titulo: 'Escolha sua casa',
  lead: 'Lages, na serra; Florianópolis e Balneário Camboriú, no litoral. O WhatsApp de cada casa abre com uma mensagem pronta para agendar.',
};

export const rodape = {
  frase: 'Há mais de 40 anos elevando a beleza com propósito.',
  navegue: [
    { href: '#servicos', label: 'Serviços' },
    { href: '#noivas', label: 'Noivas & Noivos' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#casas', label: 'Casas' },
  ],
  redes: [
    { label: 'Instagram', href: 'https://www.instagram.com/leiasalao/' },
    { label: 'Threads', href: 'https://www.threads.com/@leiasalao' },
    { label: 'Facebook', href: 'https://www.facebook.com/LeiaSalao/' },
  ],
  legal: '© 2026 Léia Salão. Lages, Florianópolis e Balneário Camboriú, Santa Catarina.',
};

export const flutuante = {
  rotulo: 'Agendar pelo WhatsApp em:',
  aria: 'Agendar pelo WhatsApp: escolher a casa',
};
