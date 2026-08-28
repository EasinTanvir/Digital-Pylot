"use client";

import { useEffect, useState } from "react";
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineUserGroup } from "react-icons/hi2";
import { fetchJson } from "@/utils/dashboardApi";

const statusStyles = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-amber-50 text-amber-700",
  converted: "bg-emerald-50 text-emerald-700",
  lost: "bg-slate-100 text-slate-600",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetchJson("/api/leads", { signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setLeads(data);
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(requestError.message || "Unable to load leads.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-5">
      <section className="flex flex-col gap-3 rounded-2xl border border-border-150 bg-white p-5 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Customer pipeline</p>
          <h1 className="mt-1 text-2xl font-bold text-text-heading">Leads</h1>
          <p className="mt-1 text-sm text-text-body">Rental enquiries captured from customers.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-primary">
          <HiOutlineUserGroup className="h-5 w-5" />
          <span className="text-sm font-bold">{leads.length} total leads</span>
        </div>
      </section>

      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {isLoading ? <LeadsSkeleton /> : (
        <section className="overflow-hidden rounded-2xl border border-border-150 bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-neutral-blue-50 text-xs font-semibold text-text-heading">
                <tr><th className="px-5 py-4">Lead</th><th className="px-5 py-4">Contact</th><th className="px-5 py-4">Interested vehicle</th><th className="px-5 py-4">Budget</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Received</th></tr>
              </thead>
              <tbody className="divide-y divide-border-150">
                {leads.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-text-body">No leads found.</td></tr> : leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4"><p className="font-bold text-text-heading">{lead.name}</p><p className="mt-1 max-w-52 truncate text-xs text-text-body">{lead.notes || "No notes provided"}</p></td>
                    <td className="px-5 py-4 text-xs text-text-body"><p className="flex items-center gap-1.5"><HiOutlineEnvelope className="h-3.5 w-3.5" />{lead.email || "—"}</p><p className="mt-1.5 flex items-center gap-1.5"><HiOutlinePhone className="h-3.5 w-3.5" />{lead.phone || "—"}</p></td>
                    <td className="px-5 py-4 font-medium text-text-heading">{lead.vehicle?.name || "Any vehicle"}</td>
                    <td className="px-5 py-4 font-semibold text-text-heading">{lead.budget ? `$${Number(lead.budget).toLocaleString()}` : "—"}</td>
                    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusStyles[lead.status] || statusStyles.new}`}>{lead.status}</span></td>
                    <td className="px-5 py-4 text-xs text-text-body">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function LeadsSkeleton() {
  return <div className="h-96 animate-pulse rounded-2xl bg-slate-200" aria-label="Loading leads" />;
}
