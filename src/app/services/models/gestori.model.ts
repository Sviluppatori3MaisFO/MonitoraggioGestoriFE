export interface IAnGestore {
  idGestore: number;
  dsGestore: string;
  dtRiferimentoQuadratura: string;
  utenteCreazione?: number;
  dtCreazione?: Date;
  utenteModifica?: number;
  dtModifica?: Date;
  dsGestoreReport: string;
}
export interface IGestoreMonitorato {
  idMonitoraggioGestore: number;
  idGestore: number;
  dsGestore: string;
  compravenditaDivisa: number;
  noteGestore?: string;
  emailGestore1: string;
  emailGestore2?: string;
  dtArrivoFlussiMmD1: number;
  dtArrivoFlussiMmD2: number;
  dtArrivoFlussiSs?: number;
  fgMonitoring: number;
  dtCreazione: Date;
  dtLastEdit?: Date;
  lastImportMM?: Date;
  dtImportMM: Date;
  dtImportSS: Date;
}
