import { AppShell } from "@/components/layout/AppShell";
import { Calendar, MapPin, Ticket, Filter } from "lucide-react";

const MOCK_EVENTS = [
  { id: "1", name: "Klubnacht", venue: "Berghain", city: "Berlin", country: "DE", date: "2025-06-07", genres: ["Techno", "Industrial"], price: 15, sold_pct: 72, verified: true },
  { id: "2", name: "Fabric Live 104", venue: "Fabric", city: "London", country: "UK", date: "2025-06-06", genres: ["D&B", "House"], price: 22, sold_pct: 55, verified: true },
  { id: "3", name: "Space Opening Party", venue: "Space Ibiza", city: "Ibiza", country: "ES", date: "2025-06-08", genres: ["Tech House", "Deep House"], price: 40, sold_pct: 89, verified: true },
  { id: "4", name: "Movement After Dark", venue: "Secret Warehouse", city: "Detroit", country: "US", date: "2025-06-13", genres: ["Techno", "Minimal"], price: 25, sold_pct: 44, verified: false },
  { id: "5", name: "Drumcode NYC", venue: "Avant Gardner", city: "NYC", country: "US", date: "2025-06-14", genres: ["Techno"], price: 35, sold_pct: 67, verified: true },
  { id: "6", name: "Tresor Nacht", venue: "Tresor", city: "Berlin", country: "DE", date: "2025-06-15", genres: ["Techno", "Industrial"], price: 12, sold_pct: 91, verified: true },
];

const CITIES = ["All Cities", "Berlin", "London", "NYC", "Miami", "Ibiza", "Detroit"];
const GENRES = ["All Genres", "Techno", "House", "Tech House", "D&B", "Trance"];

export default function EventsPage() {
  return (
    <AppShell title="EVENTS">
      {/* Filters */}
      <div className="border-b border-[#222]">
        <div className="flex gap-2 overflow-x-auto px-4 py-3">
          {CITIES.map((city, i) => (
            <button key={city} className={`flex-shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${i === 0 ? "bg-[#E8FF47] text-black font-bold" : "border border-[#222] text-[#888]"}`} style={{ fontFamily: "'DM Mono', monospace" }}>
              {city}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          {GENRES.map((genre, i) => (
            <button key={genre} className={`flex-shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${i === 0 ? "bg-[#E8FF47] text-black font-bold" : "border border-[#222] text-[#888]"}`} style={{ fontFamily: "'DM Mono', monospace" }}>
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Events list */}
      <div>
        {MOCK_EVENTS.map((event) => (
          <div key={event.id} className="border-b border-[#222] p-4 hover:bg-[#111]/50 transition-colors">
            <div className="flex gap-3">
              {/* Date block */}
              <div className="flex w-12 flex-shrink-0 flex-col items-center rounded-xl border border-[#222] bg-[#111] py-2 text-center">
                <span className="text-[10px] text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {new Date(event.date).toLocaleString("en", { month: "short" }).toUpperCase()}
                </span>
                <span className="text-xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {new Date(event.date).getDate()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold">{event.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={10} className="text-[#888]" />
                      <span className="text-sm text-[#888]">{event.venue} · {event.city}</span>
                    </div>
                  </div>
                  {event.sold_pct >= 85 && (
                    <span className="flex-shrink-0 rounded-full bg-[#FF3366] px-2 py-0.5 text-[10px] font-bold text-white">ALMOST SOLD OUT</span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {event.genres.map((g) => (
                    <span key={g} className="rounded-full border border-[#222] px-2 py-0.5 text-[10px] text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>{g}</span>
                  ))}
                </div>

                <div className="mt-2">
                  <div className="h-1 w-full rounded-full bg-[#222]">
                    <div className="h-1 rounded-full" style={{ width: `${event.sold_pct}%`, backgroundColor: event.sold_pct >= 85 ? "#FF3366" : "#E8FF47" }} />
                  </div>
                  <p className="mt-0.5 text-[10px] text-[#888]">{event.sold_pct}% sold</p>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-full bg-[#E8FF47] px-4 py-1.5 text-xs font-bold text-black">
                    <Ticket size={12} /> €{event.price}
                  </button>
                  <button className="rounded-full border border-[#222] px-3 py-1.5 text-xs text-[#888] hover:border-[#333]">
                    Interested
                  </button>
                  <button className="rounded-full border border-[#222] px-3 py-1.5 text-xs text-[#888] hover:border-[#333]">
                    Going
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
