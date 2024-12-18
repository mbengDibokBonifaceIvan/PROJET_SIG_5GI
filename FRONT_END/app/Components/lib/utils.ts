export type Region = {
  id_region: number;
  nom_region: string;
}
export type Departement = {
  id_departement: number;
  nom_departement: string;
  region: Region;
}
export type Arrondissement = {
  id_arrondissement: number;
  nom_arrondissement: string;
  departement: Departement;
}
export type CentreDeVote = {
  id_centre_vote: number;
  nom_centre: string;
  arrondissement: Arrondissement;
}

export type Coordonnees ={
  latitude: number;
  longitude: number;
}
export type Candidat= {
  id_candidat: number;
  nom_candidat: string;
  parti_politique: string;
}
export type BureauDeVote = {
  id_bureau_vote: number;
  nom_bureau: string;
  coordonnees: Coordonnees;
  centreVote: CentreDeVote;
}
export type Resultat= {
  id_resultat: number;
  bureauVote: BureauDeVote;
  candidat: Candidat;
  nombre_voix: number;
  date_saisie: Date;
  annee_election: number;
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export type candidatVote = {
  candidat: string;
  vote: number;
};

export type ResultatNational = {
  idCandidat: number;
  nomCandidat: string;
  totalVoix: number;
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (resultat: ResultatNational[]) => {
  if (!resultat.length) {
    return { yAxisLabels: [], topLabel: 0 }; // Handle empty data case
  }

  const highestRecord = Math.max(...resultat.map((res) => res.totalVoix));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  const yAxisLabels = [];
  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`${i / 1000}k`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
