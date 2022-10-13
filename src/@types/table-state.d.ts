interface ITableState {
  page: number;
  pageSize: number;
}

interface IOfferingDocumentsTableState extends ITableState {
  issuerName?: string;
  securityCode?: string;
  lstDocType?: any[];
  lstIssuerType?: any[];
  lstContinentRegion?: any[];
  lstCountry?: any[];
  lstCurrency?: any[];
  lstDistribution?: any[];
  lstGoverningLaw?: any[];
  lstEsg?: any[];
  lstIndustry?: any[];
  lstListingVenue?: any[];
  lstCovenantStructure?: any[];
  lstRatingMoody?: any[];
  lstRatingSAndP?: any[];
  lstRatingFitch?: any[];
  startDate?: string | Date;
  endDate?: string | Date;
}
