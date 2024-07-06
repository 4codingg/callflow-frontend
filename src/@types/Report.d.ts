import { ICostReports } from "./MassCommunication";

export interface ContactReportItem {
  id: string,
  destination: string,
  message: string,
  status: "completed" | "failed" | "pending"
}

interface ICostReportFlawed extends ICostReports {
  failed: {
    length: 30
  }
}

export interface Report {
  reproduceAt: Date,
  costReport: ICostReportFlawed,
  data: ContactReportItem[]
}