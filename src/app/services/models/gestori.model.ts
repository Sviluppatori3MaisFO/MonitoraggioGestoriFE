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

  movimentiBloccati: IMovimentiNormalizzati[];
}
export interface IGestoreImportazioneMovimentiChart {
  idGestore: number;
  dtImportazione: Date;
  valueDefinitivi:number;
  valueSettimanali:number;
}
export interface IMovimentiNormalizzati {
  idMovimentoNormalizzato: number;
  stato: string;
  dtOperazione: Date;
  causale: string;
  tipoOperazione: string;
}
export interface IGestoreUltimoImportazione {
  idImportazioneGestore?: number;
  idGestore: number;
  dsGestore?: string;
  fgImportSS: number;
  fgImportMM: number;
  note: string;
  dtImportMM: Date;
  dtImportSS?: Date;
}
