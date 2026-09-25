'use strict';
/**
 * ============================================================
 * © 2026 KodeWaves. All rights reserved.
 * Original Author: BTPL Engineering Team
 * Website: https://kodewaves.in
 * Contact: support@kodewaves.in
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

/**
 * Re-export invoice service from the centralized payment engine.
 * This ensures a single source of truth for invoice generation.
 */
export { 
  InvoiceService, 
  invoiceService, 
  generateInvoiceForTransaction,
  type LineItem,
  type CompanyInfo
} from '../engines/payment/invoice-service';
