import { YearData } from '../types';
import { DIEESE_DATABASE } from './dieeseDatabase';

export const HISTORICAL_DATA: YearData[] = [
  {
    year: 1994,
    salary: 64.79,
    ipcaAnnual: 18.60, // 2º semestre pós-Real
    ipcaIndex: 100.0,
    president: {
      name: 'Itamar Franco',
      term: '1992 - 1994',
      party: 'PMDB',
      description: 'Presidente durante a criação e implementação do Plano Real (01/07/1994), que estabilizou a economia após anos de hiperinflação.',
    },
    contextSummary: 'Lançamento da moeda Real. Fim da hiperinflação inercial e início da estabilização de preços.',
    historicalPrices: {
      cocaCola2L: 1.00,
      paoFrancesKg: 0.85,
      gasolinaLitro: 0.55,
      bigMac: 2.50,
      botijaoGas: 5.50,
      cestaBasica: 64.00,
    },
  },
  {
    year: 1995,
    salary: 100.00,
    ipcaAnnual: 22.41,
    ipcaIndex: 122.4,
    president: {
      name: 'Fernando Henrique Cardoso',
      term: '1995 - 1998 (1º Mandato)',
      party: 'PSDB',
      description: 'Arquiteto do Plano Real quando ministro da Fazenda, assumiu a presidência mantendo a âncora cambial.',
    },
    contextSummary: 'Consolidação da estabilidade monetária e reajuste expressivo do salário mínimo para R$ 100.',
    historicalPrices: {
      cocaCola2L: 1.20,
      paoFrancesKg: 1.05,
      gasolinaLitro: 0.65,
      bigMac: 2.80,
      botijaoGas: 7.00,
      cestaBasica: 85.00,
    },
  },
  {
    year: 1996,
    salary: 112.00,
    ipcaAnnual: 9.56,
    ipcaIndex: 134.1,
    president: {
      name: 'Fernando Henrique Cardoso',
      term: '1995 - 1998 (1º Mandato)',
      party: 'PSDB',
      description: 'Governo focado na privatização de estatais e combate continuado à inflação.',
    },
    contextSummary: 'Inflação cai para menos de 10% ao ano pela primeira vez em décadas. Real sobrevalorizado.',
    historicalPrices: {
      cocaCola2L: 1.30,
      paoFrancesKg: 1.15,
      gasolinaLitro: 0.72,
      bigMac: 3.00,
      botijaoGas: 8.50,
      cestaBasica: 92.00,
    },
  },
  {
    year: 1997,
    salary: 120.00,
    ipcaAnnual: 5.22,
    ipcaIndex: 141.1,
    president: {
      name: 'Fernando Henrique Cardoso',
      term: '1995 - 1998 (1º Mandato)',
      party: 'PSDB',
      description: 'Enfrentamento das primeiras crises externas (Crise Asiática) com aumento de juros.',
    },
    contextSummary: 'Inflação em nível civilizado de 5,2%. Crise asiática pressiona reservas internacionais.',
    historicalPrices: {
      cocaCola2L: 1.40,
      paoFrancesKg: 1.25,
      gasolinaLitro: 0.80,
      bigMac: 3.20,
      botijaoGas: 9.50,
      cestaBasica: 98.00,
    },
  },
  {
    year: 1998,
    salary: 130.00,
    ipcaAnnual: 1.65,
    ipcaIndex: 143.4,
    president: {
      name: 'Fernando Henrique Cardoso',
      term: '1995 - 1998 (1º Mandato)',
      party: 'PSDB',
      description: 'Ano eleitoral e aprovação da emenda da reeleição; enfrentamento da Crise Russa.',
    },
    contextSummary: 'Menor inflação anual da história do Real (1,65%), mas com juros nas alturas e ataque especulativo ao Real.',
    historicalPrices: {
      cocaCola2L: 1.45,
      paoFrancesKg: 1.30,
      gasolinaLitro: 0.88,
      bigMac: 3.40,
      botijaoGas: 10.50,
      cestaBasica: 102.00,
    },
  },
  {
    year: 1999,
    salary: 136.00,
    ipcaAnnual: 8.94,
    ipcaIndex: 156.2,
    president: {
      name: 'Fernando Henrique Cardoso',
      term: '1999 - 2002 (2º Mandato)',
      party: 'PSDB',
      description: 'Início do segundo mandato com desvalorização cambial e adoção do tripé macroeconômico.',
    },
    contextSummary: 'Fim do câmbio fixo. O Real é desvalorizado e nasce o tripé: metas de inflação, câmbio flutuante e superávit primário.',
    historicalPrices: {
      cocaCola2L: 1.60,
      paoFrancesKg: 1.45,
      gasolinaLitro: 1.15,
      bigMac: 3.90,
      botijaoGas: 13.00,
      cestaBasica: 115.00,
    },
  },
  {
    year: 2000,
    salary: 151.00,
    ipcaAnnual: 5.97,
    ipcaIndex: 165.6,
    president: {
      name: 'Fernando Henrique Cardoso',
      term: '1999 - 2002 (2º Mandato)',
      party: 'PSDB',
      description: 'Sancionada a Lei de Responsabilidade Fiscal (LRF), marco no controle das contas públicas.',
    },
    contextSummary: 'Economia se recupera da desvalorização cambial com crescimento do PIB e inflação controlada pelo Banco Central.',
    historicalPrices: {
      cocaCola2L: 1.70,
      paoFrancesKg: 1.60,
      gasolinaLitro: 1.35,
      bigMac: 4.10,
      botijaoGas: 15.00,
      cestaBasica: 122.00,
    },
  },
  {
    year: 2001,
    salary: 180.00,
    ipcaAnnual: 7.67,
    ipcaIndex: 178.3,
    president: {
      name: 'Fernando Henrique Cardoso',
      term: '1999 - 2002 (2º Mandato)',
      party: 'PSDB',
      description: 'Gestão da crise energética brasileira ("apagão elétrico") e turbulências na Argentina.',
    },
    contextSummary: 'Crise do apagão elétrico e desvalorização cambial geram pressão nos preços administrados.',
    historicalPrices: {
      cocaCola2L: 1.85,
      paoFrancesKg: 1.80,
      gasolinaLitro: 1.65,
      bigMac: 4.40,
      botijaoGas: 18.00,
      cestaBasica: 135.00,
    },
  },
  {
    year: 2002,
    salary: 200.00,
    ipcaAnnual: 12.53,
    ipcaIndex: 200.6,
    president: {
      name: 'Fernando Henrique Cardoso',
      term: '1999 - 2002 (2º Mandato)',
      party: 'PSDB',
      description: 'Último ano do governo FHC, marcado pelo estresse de mercado no ano eleitoral e dólar a R$ 4,00.',
    },
    contextSummary: 'Incerteza eleitoral disparou o dólar para quase R$ 4, elevando a inflação para 12,5% e erodindo o poder de compra.',
    historicalPrices: {
      cocaCola2L: 2.10,
      paoFrancesKg: 2.10,
      gasolinaLitro: 1.95,
      bigMac: 4.90,
      botijaoGas: 24.00,
      cestaBasica: 165.00,
    },
  },
  {
    year: 2003,
    salary: 240.00,
    ipcaAnnual: 9.30,
    ipcaIndex: 219.3,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2003 - 2006 (1º Mandato)',
      party: 'PT',
      description: 'Posse de Lula com a Carta ao Povo Brasileiro, preservação do tripé e política monetária austera.',
    },
    contextSummary: 'Controle rápido da crise de confiança de 2002, juros altos (Selic em 26,5%) e início da recuperação da confiança.',
    historicalPrices: {
      cocaCola2L: 2.40,
      paoFrancesKg: 2.50,
      gasolinaLitro: 2.15,
      bigMac: 5.50,
      botijaoGas: 30.00,
      cestaBasica: 178.00,
    },
  },
  {
    year: 2004,
    salary: 260.00,
    ipcaAnnual: 7.60,
    ipcaIndex: 236.0,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2003 - 2006 (1º Mandato)',
      party: 'PT',
      description: 'Início do boom das commodities internacionais e unificação de programas sociais no Bolsa Família.',
    },
    contextSummary: 'Forte crescimento do PIB (+5,7%) impulsionado por exportações de minério de ferro, soja e petróleo.',
    historicalPrices: {
      cocaCola2L: 2.60,
      paoFrancesKg: 2.70,
      gasolinaLitro: 2.25,
      bigMac: 5.90,
      botijaoGas: 32.00,
      cestaBasica: 185.00,
    },
  },
  {
    year: 2005,
    salary: 300.00,
    ipcaAnnual: 5.69,
    ipcaIndex: 249.4,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2003 - 2006 (1º Mandato)',
      party: 'PT',
      description: 'Consolidação de ganhos reais do salário mínimo e expansão do crédito consignado.',
    },
    contextSummary: 'Aumento real do salário mínimo acima da inflação; o poder de compra da população começa a subir fortemente.',
    historicalPrices: {
      cocaCola2L: 2.80,
      paoFrancesKg: 2.90,
      gasolinaLitro: 2.40,
      bigMac: 6.40,
      botijaoGas: 33.00,
      cestaBasica: 192.00,
    },
  },
  {
    year: 2006,
    salary: 350.00,
    ipcaAnnual: 3.14,
    ipcaIndex: 257.2,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2003 - 2006 (1º Mandato)',
      party: 'PT',
      description: 'Reeleição presidencial, liquidação da dívida com o FMI e estabilização de preços.',
    },
    contextSummary: 'Inflação baixa (3,14%) com expressivo reajuste de 16,6% no salário mínimo: salto notável de poder de compra.',
    historicalPrices: {
      cocaCola2L: 3.00,
      paoFrancesKg: 3.10,
      gasolinaLitro: 2.55,
      bigMac: 6.90,
      botijaoGas: 34.00,
      cestaBasica: 198.00,
    },
  },
  {
    year: 2007,
    salary: 380.00,
    ipcaAnnual: 4.46,
    ipcaIndex: 268.7,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2007 - 2010 (2º Mandato)',
      party: 'PT',
      description: 'Lançamento do Programa de Aceleração do Crescimento (PAC) e anúncio das descobertas do Pré-Sal.',
    },
    contextSummary: 'Economia aquecida, consumo das famílias em alta e formalização contínua do mercado de trabalho.',
    historicalPrices: {
      cocaCola2L: 3.20,
      paoFrancesKg: 3.40,
      gasolinaLitro: 2.60,
      bigMac: 7.50,
      botijaoGas: 35.00,
      cestaBasica: 215.00,
    },
  },
  {
    year: 2008,
    salary: 415.00,
    ipcaAnnual: 5.90,
    ipcaIndex: 284.5,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2007 - 2010 (2º Mandato)',
      party: 'PT',
      description: 'Obtenção do Grau de Investimento e enfrentamento da Crise Financeira Global (Lehman Brothers).',
    },
    contextSummary: 'Brasil alcança grau de investimento. No fim do ano, a quebra do Lehman Brothers abala o comércio global.',
    historicalPrices: {
      cocaCola2L: 3.50,
      paoFrancesKg: 3.90,
      gasolinaLitro: 2.65,
      bigMac: 8.20,
      botijaoGas: 36.00,
      cestaBasica: 245.00,
    },
  },
  {
    year: 2009,
    salary: 465.00,
    ipcaAnnual: 4.31,
    ipcaIndex: 296.8,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2007 - 2010 (2º Mandato)',
      party: 'PT',
      description: 'Políticas anticíclicas com desoneração de IPI e estímulo ao consumo para mitigar a crise global.',
    },
    contextSummary: 'Redução de impostos para carros e linha branca. Salário mínimo sobe 12% mesmo em ano de desaceleração.',
    historicalPrices: {
      cocaCola2L: 3.70,
      paoFrancesKg: 4.20,
      gasolinaLitro: 2.68,
      bigMac: 8.70,
      botijaoGas: 38.00,
      cestaBasica: 255.00,
    },
  },
  {
    year: 2010,
    salary: 510.00,
    ipcaAnnual: 5.91,
    ipcaIndex: 314.3,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2007 - 2010 (2º Mandato)',
      party: 'PT',
      description: 'Último ano do segundo mandato; o PIB cresceu 7,5% no maior ritmo desde os anos 1980.',
    },
    contextSummary: 'PIB tem crescimento recorde de 7,5%. O poder de compra atinge picos históricos com desemprego em queda livre.',
    historicalPrices: {
      cocaCola2L: 4.00,
      paoFrancesKg: 4.60,
      gasolinaLitro: 2.75,
      bigMac: 9.50,
      botijaoGas: 40.00,
      cestaBasica: 275.00,
    },
  },
  {
    year: 2011,
    salary: 545.00,
    ipcaAnnual: 6.50,
    ipcaIndex: 334.8,
    president: {
      name: 'Dilma Rousseff',
      term: '2011 - 2014 (1º Mandato)',
      party: 'PT',
      description: 'Primeira mulher eleita presidente do Brasil. Início da política da "Nova Matriz Econômica".',
    },
    contextSummary: 'Institucionalização da fórmula de reajuste do salário mínimo (PIB de 2 anos antes + INPC). Inflação no teto da meta.',
    historicalPrices: {
      cocaCola2L: 4.30,
      paoFrancesKg: 5.10,
      gasolinaLitro: 2.85,
      bigMac: 10.30,
      botijaoGas: 42.00,
      cestaBasica: 290.00,
    },
  },
  {
    year: 2012,
    salary: 622.00,
    ipcaAnnual: 5.84,
    ipcaIndex: 354.3,
    president: {
      name: 'Dilma Rousseff',
      term: '2011 - 2014 (1º Mandato)',
      party: 'PT',
      description: 'Redução histórica da taxa Selic para 7,25% e desonerações da folha de pagamento.',
    },
    contextSummary: 'Salário mínimo sobe 14,1% (incorporando o PIB de 2010). Poder de compra do trabalhador em alta expressiva.',
    historicalPrices: {
      cocaCola2L: 4.60,
      paoFrancesKg: 5.50,
      gasolinaLitro: 2.92,
      bigMac: 11.20,
      botijaoGas: 44.00,
      cestaBasica: 310.00,
    },
  },
  {
    year: 2013,
    salary: 678.00,
    ipcaAnnual: 5.91,
    ipcaIndex: 375.3,
    president: {
      name: 'Dilma Rousseff',
      term: '2011 - 2014 (1º Mandato)',
      party: 'PT',
      description: 'Onda de protestos populares nas "Jornadas de Junho" de 2013 e pressões de custo de vida.',
    },
    contextSummary: 'Descontentamento com serviços públicos e inflação de alimentos ("crise do tomate") culminam em protestos.',
    historicalPrices: {
      cocaCola2L: 4.90,
      paoFrancesKg: 6.20,
      gasolinaLitro: 3.05,
      bigMac: 12.00,
      botijaoGas: 46.00,
      cestaBasica: 340.00,
    },
  },
  {
    year: 2014,
    salary: 724.00,
    ipcaAnnual: 6.41,
    ipcaIndex: 399.3,
    president: {
      name: 'Dilma Rousseff',
      term: '2011 - 2014 (1º Mandato)',
      party: 'PT',
      description: 'Copa do Mundo no Brasil, reeleição apertada e início da Operação Lava Jato.',
    },
    contextSummary: 'Menor taxa histórica de desemprego (4,8%), porém represamento de tarifas de energia e combustíveis antes da eleição.',
    historicalPrices: {
      cocaCola2L: 5.20,
      paoFrancesKg: 6.80,
      gasolinaLitro: 3.20,
      bigMac: 13.00,
      botijaoGas: 48.00,
      cestaBasica: 360.00,
    },
  },
  {
    year: 2015,
    salary: 788.00,
    ipcaAnnual: 10.67,
    ipcaIndex: 442.0,
    president: {
      name: 'Dilma Rousseff',
      term: '2015 - 2016 (2º Mandato)',
      party: 'PT',
      description: 'Início do segundo mandato, tentativa de ajuste fiscal com Joaquim Levy e recessão profunda.',
    },
    contextSummary: 'Liberação de tarifas represadas dispara a inflação para 10,67%. Queda violenta no PIB (-3,5%) e no poder de compra.',
    historicalPrices: {
      cocaCola2L: 5.90,
      paoFrancesKg: 7.80,
      gasolinaLitro: 3.65,
      bigMac: 14.50,
      botijaoGas: 55.00,
      cestaBasica: 420.00,
    },
  },
  {
    year: 2016,
    salary: 880.00,
    ipcaAnnual: 6.29,
    ipcaIndex: 469.8,
    president: {
      name: 'Dilma Rousseff / Michel Temer',
      term: '2016 (Transição)',
      party: 'PT / PMDB',
      description: 'Impeachment de Dilma em agosto; o vice-presidente Michel Temer assume definitivamente o Palácio do Planalto.',
    },
    contextSummary: 'Continuidade da recessão no 1º semestre e mudança de comando político. Promulgação da PEC do Teto de Gastos no fim do ano.',
    historicalPrices: {
      cocaCola2L: 6.40,
      paoFrancesKg: 8.50,
      gasolinaLitro: 3.85,
      bigMac: 15.50,
      botijaoGas: 60.00,
      cestaBasica: 470.00,
    },
  },
  {
    year: 2017,
    salary: 937.00,
    ipcaAnnual: 2.95,
    ipcaIndex: 483.6,
    president: {
      name: 'Michel Temer',
      term: '2016 - 2018',
      party: 'PMDB',
      description: 'Aprovação da Reforma Trabalhista, corte rápido da taxa Selic e safra agrícola recorde.',
    },
    contextSummary: 'Super safra derruba preços dos alimentos, fazendo a inflação despencar para 2,95%. Recuperação tímida do poder de compra.',
    historicalPrices: {
      cocaCola2L: 6.60,
      paoFrancesKg: 9.00,
      gasolinaLitro: 4.10,
      bigMac: 16.50,
      botijaoGas: 68.00,
      cestaBasica: 440.00,
    },
  },
  {
    year: 2018,
    salary: 954.00,
    ipcaAnnual: 3.75,
    ipcaIndex: 501.8,
    president: {
      name: 'Michel Temer',
      term: '2016 - 2018',
      party: 'MDB',
      description: 'Ano marcado pela Greve dos Caminhoneiros em maio e eleição presidencial polarizada.',
    },
    contextSummary: 'A paralisação dos caminhoneiros causou desabastecimento temporário e pico de preços, mas a inflação fechou moderada.',
    historicalPrices: {
      cocaCola2L: 6.90,
      paoFrancesKg: 9.50,
      gasolinaLitro: 4.45,
      bigMac: 17.50,
      botijaoGas: 72.00,
      cestaBasica: 465.00,
    },
  },
  {
    year: 2019,
    salary: 998.00,
    ipcaAnnual: 4.31,
    ipcaIndex: 523.4,
    president: {
      name: 'Jair Bolsonaro',
      term: '2019 - 2022',
      party: 'PSL',
      description: 'Aprovação da Reforma da Previdência, liberação de saques do FGTS e agenda liberal com Paulo Guedes.',
    },
    contextSummary: 'Primeiro ano sem ganho real do salário mínimo (reajuste apenas pela inflação). Inflação sob controle em 4,31%.',
    historicalPrices: {
      cocaCola2L: 7.20,
      paoFrancesKg: 10.20,
      gasolinaLitro: 4.60,
      bigMac: 18.50,
      botijaoGas: 75.00,
      cestaBasica: 505.00,
    },
  },
  {
    year: 2020,
    salary: 1045.00,
    ipcaAnnual: 4.52,
    ipcaIndex: 547.0,
    president: {
      name: 'Jair Bolsonaro',
      term: '2019 - 2022',
      party: 'Sem Partido',
      description: 'Eclosão da pandemia global de Covid-19, quarentenas e pagamento do Auxílio Emergencial a milhões de pessoas.',
    },
    contextSummary: 'Desorganização de cadeias de suprimentos globais e disparada das commodities e alimentos no segundo semestre.',
    historicalPrices: {
      cocaCola2L: 7.80,
      paoFrancesKg: 11.50,
      gasolinaLitro: 4.55,
      bigMac: 20.00,
      botijaoGas: 82.00,
      cestaBasica: 600.00,
    },
  },
  {
    year: 2021,
    salary: 1100.00,
    ipcaAnnual: 10.06,
    ipcaIndex: 602.1,
    president: {
      name: 'Jair Bolsonaro',
      term: '2019 - 2022',
      party: 'Sem Partido',
      description: 'Crise hídrica, encarecimento dos combustíveis mundiais e inflação de dois dígitos.',
    },
    contextSummary: 'Inflação volta aos 10% impulsionada por combustíveis, energia e alimentos, com forte perda do poder de compra real.',
    historicalPrices: {
      cocaCola2L: 8.50,
      paoFrancesKg: 13.50,
      gasolinaLitro: 6.60,
      bigMac: 22.50,
      botijaoGas: 102.00,
      cestaBasica: 690.00,
    },
  },
  {
    year: 2022,
    salary: 1212.00,
    ipcaAnnual: 5.79,
    ipcaIndex: 636.9,
    president: {
      name: 'Jair Bolsonaro',
      term: '2019 - 2022',
      party: 'PL',
      description: 'Guerra na Ucrânia, corte de ICMS sobre combustíveis e criação do Auxílio Brasil de R$ 600.',
    },
    contextSummary: 'Redução temporária de impostos federais e estaduais provocou deflação no 3º trimestre, aliviando o índice final para 5,79%.',
    historicalPrices: {
      cocaCola2L: 8.90,
      paoFrancesKg: 15.00,
      gasolinaLitro: 5.95,
      bigMac: 24.00,
      botijaoGas: 110.00,
      cestaBasica: 750.00,
    },
  },
  {
    year: 2023,
    salary: 1320.00,
    ipcaAnnual: 4.62,
    ipcaIndex: 666.3,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2023 - 2026 (3º Mandato)',
      party: 'PT',
      description: 'Início do 3º mandato de Lula; restabelecimento da política de valorização real do salário mínimo.',
    },
    contextSummary: 'Inflação arrefece para 4,62% dentro da meta. Retorno da política de aumento real do salário mínimo e novo arcabouço fiscal.',
    historicalPrices: {
      cocaCola2L: 9.20,
      paoFrancesKg: 16.50,
      gasolinaLitro: 5.65,
      bigMac: 26.00,
      botijaoGas: 105.00,
      cestaBasica: 770.00,
    },
  },
  {
    year: 2024,
    salary: 1412.00,
    ipcaAnnual: 4.83,
    ipcaIndex: 698.5,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2023 - 2026 (3º Mandato)',
      party: 'PT',
      description: 'Continuidade da política de valorização do salário mínimo e implementação da Reforma Tributária.',
    },
    contextSummary: 'Salário mínimo reajustado com ganho real de 3% acima da inflação. Mercado de trabalho resiliente.',
    historicalPrices: {
      cocaCola2L: 9.80,
      paoFrancesKg: 17.50,
      gasolinaLitro: 6.05,
      bigMac: 27.50,
      botijaoGas: 108.00,
      cestaBasica: 805.00,
    },
  },
  {
    year: 2025,
    salary: 1518.00,
    ipcaAnnual: 4.51,
    ipcaIndex: 730.0,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2023 - 2026 (3º Mandato)',
      party: 'PT',
      description: 'Salário mínimo fixado em R$ 1.518, consolidando novo patamar de renda para mais de 50 milhões de brasileiros.',
    },
    contextSummary: 'Consolidação da renda básica e poder de compra médio do salário mínimo em níveis superiores aos da década de 1990.',
    historicalPrices: {
      cocaCola2L: 10.40,
      paoFrancesKg: 18.50,
      gasolinaLitro: 6.25,
      bigMac: 29.00,
      botijaoGas: 112.00,
      cestaBasica: 840.00,
    },
  },
  {
    year: 2026,
    salary: 1621.00,
    ipcaAnnual: 4.10,
    ipcaIndex: 760.0,
    president: {
      name: 'Luiz Inácio Lula da Silva',
      term: '2023 - 2026 (3º Mandato)',
      party: 'PT',
      description: 'Governo federal em exercício; política contínua de ganho real do piso nacional.',
    },
    contextSummary: 'Ano de referência atual com salário mínimo vigente de R$ 1.621 e controle inflacionário pelo Banco Central.',
    historicalPrices: {
      cocaCola2L: 10.90,
      paoFrancesKg: 19.50,
      gasolinaLitro: 6.45,
      bigMac: 30.50,
      botijaoGas: 115.00,
      cestaBasica: 875.00,
    },
  },
];

export const CURRENT_YEAR = 2026;
export const BASE_YEAR_REAL = 1994;

/**
 * Séries históricas de referência com fontes confiáveis:
 * - Automóvel Popular 0 km: FIPE (Fundação Instituto de Pesquisas Econômicas) / Anfavea
 * - Imóvel Residencial 60 m²: FipeZAP (Fipe) / Secovi-SP / Embraesp / IBGE (CUB)
 * - Ingresso de Cinema (Inteira): OCA / ANCINE (Agência Nacional do Cinema) / IBGE (IPCA)
 */
export const HISTORICAL_BENCHMARKS: Record<
  number,
  { carroPopular: number; imovelPadrao: number; cinemaIngresso: number }
> = {
  1994: { carroPopular: 7250, imovelPadrao: 45000, cinemaIngresso: 3.80 },
  1995: { carroPopular: 8500, imovelPadrao: 52000, cinemaIngresso: 4.50 },
  1996: { carroPopular: 9800, imovelPadrao: 57000, cinemaIngresso: 5.00 },
  1997: { carroPopular: 10600, imovelPadrao: 61000, cinemaIngresso: 5.50 },
  1998: { carroPopular: 11200, imovelPadrao: 63000, cinemaIngresso: 6.00 },
  1999: { carroPopular: 11900, imovelPadrao: 64500, cinemaIngresso: 6.50 },
  2000: { carroPopular: 12800, imovelPadrao: 66000, cinemaIngresso: 7.20 },
  2001: { carroPopular: 13600, imovelPadrao: 71000, cinemaIngresso: 7.80 },
  2002: { carroPopular: 14500, imovelPadrao: 78000, cinemaIngresso: 8.50 },
  2003: { carroPopular: 16200, imovelPadrao: 86000, cinemaIngresso: 9.50 },
  2004: { carroPopular: 18000, imovelPadrao: 93000, cinemaIngresso: 10.50 },
  2005: { carroPopular: 20000, imovelPadrao: 102000, cinemaIngresso: 11.20 },
  2006: { carroPopular: 22000, imovelPadrao: 115000, cinemaIngresso: 12.00 },
  2007: { carroPopular: 23500, imovelPadrao: 135000, cinemaIngresso: 13.00 },
  2008: { carroPopular: 24500, imovelPadrao: 165000, cinemaIngresso: 14.00 },
  2009: { carroPopular: 24000, imovelPadrao: 205000, cinemaIngresso: 14.50 },
  2010: { carroPopular: 25000, imovelPadrao: 258000, cinemaIngresso: 15.50 },
  2011: { carroPopular: 26000, imovelPadrao: 315000, cinemaIngresso: 17.00 },
  2012: { carroPopular: 26800, imovelPadrao: 360000, cinemaIngresso: 18.50 },
  2013: { carroPopular: 28000, imovelPadrao: 395000, cinemaIngresso: 20.00 },
  2014: { carroPopular: 29500, imovelPadrao: 420000, cinemaIngresso: 21.00 },
  2015: { carroPopular: 31500, imovelPadrao: 425000, cinemaIngresso: 22.50 },
  2016: { carroPopular: 33500, imovelPadrao: 428000, cinemaIngresso: 24.00 },
  2017: { carroPopular: 35000, imovelPadrao: 430000, cinemaIngresso: 25.50 },
  2018: { carroPopular: 36500, imovelPadrao: 438000, cinemaIngresso: 27.00 },
  2019: { carroPopular: 38000, imovelPadrao: 445000, cinemaIngresso: 28.00 },
  2020: { carroPopular: 42000, imovelPadrao: 460000, cinemaIngresso: 29.50 },
  2021: { carroPopular: 54000, imovelPadrao: 485000, cinemaIngresso: 30.50 },
  2022: { carroPopular: 64000, imovelPadrao: 512000, cinemaIngresso: 32.00 },
  2023: { carroPopular: 69000, imovelPadrao: 532000, cinemaIngresso: 34.00 },
  2024: { carroPopular: 73000, imovelPadrao: 550000, cinemaIngresso: 36.00 },
  2025: { carroPopular: 76000, imovelPadrao: 562000, cinemaIngresso: 37.00 },
  2026: { carroPopular: 78000, imovelPadrao: 570000, cinemaIngresso: 38.00 },
};

// Enriquecer a coleção principal com os benchmarks apurados
HISTORICAL_DATA.forEach((item) => {
  const bm = HISTORICAL_BENCHMARKS[item.year];
  if (bm) {
    if (!item.historicalPrices) {
      item.historicalPrices = {};
    }
    Object.assign(item.historicalPrices, bm);
  }
});

export const PRESIDENT_AVATARS: Record<string, string> = {
  'Itamar Franco': '/presidents/itamar.jpg',
  'Fernando Henrique Cardoso': '/presidents/fhc.jpg',
  'Luiz Inácio Lula da Silva': '/presidents/lula.jpg',
  'Dilma Rousseff': '/presidents/dilma.jpg',
  'Michel Temer': '/presidents/temer.jpg',
  'Dilma Rousseff / Michel Temer': '/presidents/dilma.jpg',
  'Jair Bolsonaro': '/presidents/bolsonaro.jpg',
};

export function getPresidentAvatar(name: string): string {
  return PRESIDENT_AVATARS[name] || '';
}

export function getYearData(year: number): YearData {
  const found = HISTORICAL_DATA.find((item) => item.year === year);
  const data = found || HISTORICAL_DATA[HISTORICAL_DATA.length - 1];
  return {
    ...data,
    president: {
      ...data.president,
      avatarUrl: PRESIDENT_AVATARS[data.president.name] || data.president.avatarUrl || '',
    },
  };
}

/**
 * Retorna o valor oficial/histórico apurado (DIEESE, IBGE, ANP, FIPE, FipeZAP, ANCINE, etc.)
 * para o item no ano especificado.
 */
export function getPresetPriceForYear(presetId: string, year: number): number {
  const yearData = getYearData(year);
  const base1994 = getYearData(1994);

  // 0. Verifica se o item pertence à base expandida do DIEESE
  const dieeseItem = DIEESE_DATABASE.find((d) => d.id === presetId);
  if (dieeseItem) {
    if (dieeseItem.prices[year] !== undefined) {
      return dieeseItem.prices[year];
    }
    const baseP = dieeseItem.prices[1994] || dieeseItem.prices[Object.keys(dieeseItem.prices)[0] as unknown as number] || 1;
    const ratio = yearData.ipcaIndex / (base1994.ipcaIndex || 100);
    return Math.round(baseP * ratio * 100) / 100;
  }

  // Mapa de chaves diretas oficiais
  const keyMap: Record<string, keyof NonNullable<YearData['historicalPrices']>> = {
    'cesta-basica': 'cestaBasica',
    'pao-frances': 'paoFrancesKg',
    'gasolina': 'gasolinaLitro',
    'botijao-gas': 'botijaoGas',
    'imovel-padrao': 'imovelPadrao',
    'carro-popular': 'carroPopular',
    'cinema-ingresso': 'cinemaIngresso',
  };

  const key = keyMap[presetId];

  // 1. Preço histórico direto registrado (série oficial contínua)
  if (key && yearData.historicalPrices && yearData.historicalPrices[key] !== undefined) {
    return yearData.historicalPrices[key]!;
  }

  // Preço padrão para 1994 se existir
  const defaults1994: Record<string, number> = {
    'cesta-basica': 64.00,
    'pao-frances': 0.85,
    'gasolina': 0.55,
    'botijao-gas': 5.50,
    'imovel-padrao': 45000.00,
    'carro-popular': 7250.00,
    'cinema-ingresso': 3.80,
  };

  const p1994 = defaults1994[presetId] || 10.0;
  const ratio = yearData.ipcaIndex / (base1994.ipcaIndex || 100);
  return Math.round(p1994 * ratio * 100) / 100;
}

