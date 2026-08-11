import { PaymentActivity, PaymentMethod, PaymentStatus, paymentActivitiesSeed } from "./mock-owner-data";

export interface PaymentActivityQuery {
  outletId?: string;
  method?: PaymentMethod;
  status?: PaymentStatus;
  dateFrom?: string; // ISO date "YYYY-MM-DD" (inclusive)
  dateTo?: string;   // ISO date "YYYY-MM-DD" (inclusive, up to 23:59:59)
}

export interface PaymentActivityService {
  list(query?: PaymentActivityQuery): Promise<PaymentActivity[]>;
}

export const mockPaymentActivityService: PaymentActivityService = {
  async list(query = {}) {
    const results = paymentActivitiesSeed.filter((payment) =>
      (!query.outletId || payment.outletId === query.outletId) &&
      (!query.method || payment.method === query.method) &&
      (!query.status || payment.status === query.status) &&
      (!query.dateFrom || payment.createdAtISO >= query.dateFrom) &&
      (!query.dateTo || payment.createdAtISO <= `${query.dateTo}T23:59:59`),
    );

    // Strict descending sort by timestamp (newest first).
    results.sort((a, b) => b.createdAtISO.localeCompare(a.createdAtISO));

    return results;
  },
};

// Backend integration seam: replace this mock with a provider-neutral API client.
// Payment status, settlement, reconciliation, and authorization remain backend-owned.
export const paymentActivityService = mockPaymentActivityService;
