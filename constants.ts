
import { Country, Region, Question, TrapChallenge } from './types';

export const PAISOS_MASTER: Country[] = [
  { name: "Albània", capital: "Tirana", region: Region.Balkans, code: "al", euro: false },
  { name: "Alemanya", capital: "Berlín", region: Region.Central, code: "de", euro: true },
  { name: "Andorra", capital: "Andorra la Vella", region: Region.Western, code: "ad", euro: true },
  { name: "Armènia", capital: "Erevan", region: Region.Eastern, code: "am", euro: false },
  { name: "Àustria", capital: "Viena", region: Region.Central, code: "at", euro: true },
  { name: "Azerbaidjan", capital: "Bakú", region: Region.Eastern, code: "az", euro: false },
  { name: "Bèlgica", capital: "Brussel·les", region: Region.Western, code: "be", euro: true },
  { name: "Bielorússia", capital: "Minsk", region: Region.Eastern, code: "by", euro: false },
  { name: "Bòsnia i Hercegovina", capital: "Sarajevo", region: Region.Balkans, code: "ba", euro: false },
  { name: "Bulgària", capital: "Sofia", region: Region.Eastern, code: "bg", euro: false },
  { name: "Croàcia", capital: "Zagreb", region: Region.Balkans, code: "hr", euro: true },
  { name: "Dinamarca", capital: "Copenhaguen", region: Region.Nordic, code: "dk", euro: false },
  { name: "Eslovàquia", capital: "Bratislava", region: Region.Central, code: "sk", euro: true },
  { name: "Eslovènia", capital: "Ljubljana", region: Region.Balkans, code: "si", euro: true },
  { name: "Espanya", capital: "Madrid", region: Region.Mediterranean, code: "es", euro: true },
  { name: "Estònia", capital: "Tallinn", region: Region.Eastern, code: "ee", euro: true },
  { name: "Finlàndia", capital: "Hèlsinki", region: Region.Nordic, code: "fi", euro: true },
  { name: "França", capital: "París", region: Region.Western, code: "fr", euro: true },
  { name: "Geòrgia", capital: "Tbilisi", region: Region.Eastern, code: "ge", euro: false },
  { name: "Regne Unit", capital: "Londres", region: Region.Western, code: "gb", euro: false },
  { name: "Grècia", capital: "Atenes", region: Region.Mediterranean, code: "gr", euro: true },
  { name: "Hongria", capital: "Budapest", region: Region.Central, code: "hu", euro: false },
  { name: "Irlanda", capital: "Dublín", region: Region.Western, code: "ie", euro: true },
  { name: "Islàndia", capital: "Reykjavík", region: Region.Nordic, code: "is", euro: false },
  { name: "Itàlia", capital: "Roma", region: Region.Mediterranean, code: "it", euro: true },
  { name: "Kazakhstan", capital: "Astana", region: Region.Eastern, code: "kz", euro: false },
  { name: "Letònia", capital: "Riga", region: Region.Eastern, code: "lv", euro: true },
  { name: "Liechtenstein", capital: "Vaduz", region: Region.Central, code: "li", euro: false },
  { name: "Lituània", capital: "Vilnius", region: Region.Eastern, code: "lt", euro: true },
  { name: "Luxemburg", capital: "Luxemburg", region: Region.Western, code: "lu", euro: true },
  { name: "Macedònia del Nord", capital: "Skopje", region: Region.Balkans, code: "mk", euro: false },
  { name: "Malta", capital: "La Valletta", region: Region.Mediterranean, code: "mt", euro: true },
  { name: "Moldàvia", capital: "Chișinău", region: Region.Eastern, code: "md", euro: false },
  { name: "Mònaco", capital: "Mònaco", region: Region.Western, code: "mc", euro: true },
  { name: "Montenegro", capital: "Podgorica", region: Region.Balkans, code: "me", euro: true },
  { name: "Noruega", capital: "Oslo", region: Region.Nordic, code: "no", euro: false },
  { name: "Països Baixos", capital: "Amsterdam", region: Region.Western, code: "nl", euro: true },
  { name: "Polònia", capital: "Varsòvia", region: Region.Central, code: "pl", euro: false },
  { name: "Portugal", capital: "Lisboa", region: Region.Western, code: "pt", euro: true },
  { name: "Romania", capital: "Bucarest", region: Region.Eastern, code: "ro", euro: false },
  { name: "Rússia", capital: "Moscou", region: Region.Eastern, code: "ru", euro: false },
  { name: "San Marino", capital: "San Marino", region: Region.Mediterranean, code: "sm", euro: true },
  { name: "Sèrbia", capital: "Belgrad", region: Region.Balkans, code: "rs", euro: false },
  { name: "Suècia", capital: "Estocolm", region: Region.Nordic, code: "se", euro: false },
  { name: "Suïssa", capital: "Berna", region: Region.Central, code: "ch", euro: false },
  { name: "Turquia", capital: "Ankara", region: Region.Eastern, code: "tr", euro: false },
  { name: "República Txeca", capital: "Praga", region: Region.Central, code: "cz", euro: false },
  { name: "Ucraïna", capital: "Kíiv", region: Region.Eastern, code: "ua", euro: false },
  { name: "Vaticà", capital: "Ciutat del Vaticà", region: Region.Mediterranean, code: "va", euro: true },
  { name: "Xipre", capital: "Nicòsia", region: Region.Mediterranean, code: "cy", euro: true }
];

export const QUESTS_MASTER: Question[] = [
  { question: "Quants països formen el continent europeu?", options: ["27", "50", "20", "35"], correct: 1 },
  { question: "Quina és la densitat de població d'Europa?", options: ["10 hab/km2", "70 hab/km2", "150 hab/km2"], correct: 1 },
  { question: "Any de creació de la CEE:", options: ["1945", "1957", "1992"], correct: 1 },
  { question: "Sector de treball majoritari a Europa:", options: ["Primari", "Secundari", "Terciari (Serveis)"], correct: 2 },
  { question: "País més gran del continent:", options: ["França", "Ucraïna", "Rússia"], correct: 2 },
  { question: "On estan les seus del Parlament?", options: ["Estrasburg, Brussel·les, Luxemburg", "Madrid, París, Berlín", "Roma"], correct: 0 },
  { question: "Nombre d'estats membres de la UE:", options: ["50", "20", "27"], correct: 2 },
  { question: "País transcontinental a la Mediterrània:", options: ["Grècia", "Espanya", "Itàlia"], correct: 1 },
  { question: "Per què la població està envellida?", options: ["Pel fred", "Poca natalitat i alta esperança vida", "Guerres"], correct: 1 },
  { question: "Membres de la Eurozona:", options: ["Tota Europa", "27 països", "20 països"], correct: 2 }
];

export const TRAPS: TrapChallenge[] = [
  { question: "Busca SUÏSSA (Centre d'Europa, sense mar)", options: [{label: "Suïssa", flag: "ch"}, {label: "Suècia", flag: "se"}], correct: 0 },
  { question: "Busca SUÈCIA (Nord d'Europa, Escandinàvia)", options: [{label: "Suïssa", flag: "ch"}, {label: "Suècia", flag: "se"}], correct: 1 },
  { question: "Busca PAÏSOS BAIXOS (Està DAMUNT de Bèlgica)", options: [{label: "Països Baixos", flag: "nl"}, {label: "Bèlgica", flag: "be"}], correct: 0 },
  { question: "Busca BÈLGICA (Està DAVALL de Països Baixos)", options: [{label: "Països Baixos", flag: "nl"}, {label: "Bèlgica", flag: "be"}], correct: 1 }
];

export const MICRO_STATES = ["Andorra", "San Marino", "Vaticà", "Liechtenstein", "Mònaco", "Malta"];
