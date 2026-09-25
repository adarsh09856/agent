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
import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="p-8 flex flex-wrap gap-4">
      <StatusBadge status="pending" />
      <StatusBadge status="in_progress" />
      <StatusBadge status="calling" />
      <StatusBadge status="completed" />
      <StatusBadge status="failed" />
      <StatusBadge status="scheduled" />
      <StatusBadge status="hot" />
      <StatusBadge status="warm" />
      <StatusBadge status="cold" />
    </div>
  );
}
