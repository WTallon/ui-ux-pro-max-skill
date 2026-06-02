import { AppShell } from "@/components/layout/AppShell";
import { MapPin, Clock, Users, Filter, Map, List, Ticket } from "lucide-react";

const DISTANCE_FILTERS = ["1 mi", "5 mi", "25 mi", "Any"];
const GENRE_FILTERS = ["All", "House", "Techno", "Tech House", "D&B", "Trance", "EDM"];
const TIME_FILTERS = ["Now", "Tonight", "This Weekend"];
const PRICE_FILTERS = ["Free", "< $20", "< $50", "Any"];

const TONIGHT_EVENTS = [
  {
    id: 1,
    name: "Fabric Presents",
    venue: "Fabric",
    city: "London",
    distance: "0.3 mi",
    start_time: "23:00",
    genre: "House",
    ticket_price: 22,
    tickets_left: 47,
    capacity_pct: 81,
    friends_going: 3,
    is_secret: false,
    lineup: ["DJ EZ", "Conducta", "Preditah"],
  },
  {
    id: 2,
    name: "Warehouse Party",
    venue: "Secret Location",
    city: "London",
    distance: "1.2 mi",
    start_time: "00:00",
    genre: "Techno",
    ticket_price: 0,
    tickets_left: 120,
    capacity_pct: 40,
    friends_going: 1,
    is_secret: true,
    lineup: ["b2b set TBA"],
  },
  {
    id: 3,
    name: "Printworks Closing",
    venue: "Printworks London",
    city: "London",
    distance: "2.1 mi",
    start_time: "22:00",
    genre: "Techno",
    ticket_price: 35,
    tickets_left: 8,
    capacity_pct: 97,
    friends_going: 7,
    is_secret: false,
    lineup: ["Amelie Lens", "Paula Temple", "Blawan"],
  },
  {
    id: 4,
    name: "EGG LDN Takeover",
    venue: "EGG London",
    city: "London",
    distance: "3.4 mi",
    start_time: "22:30",
    genre: "Tech House",
    ticket_price: 18,
    tickets_left: 210,
    capacity_pct: 30,
    friends_going: 0,
    is_secret: false,
    lineup: ["Sam Divine", "Defected Records"],
  },
];

export default function TonightPage() {
  return (
    <AppShell title="TONIGHT">
      {/* Location header */}
      <div className="border-b border-[#222] px-4 py-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[#E8FF47]" />
          <span className="text-sm font-bold">London, UK</span>
          <span className="text-xs text-[#888]">· Updated 2 min ago</span>
          <button className="ml-auto text-xs text-[#E8FF47] hover:underline">Change</button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex border-b border-[#222]">
        <button className="flex flex-1 items-center justify-center gap-2 border-b-2 border-[#E8FF47] py-3 text-xs font-bold text-[#E8FF47]">
          <List size={14} /> LIST
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 py-3 text-xs text-[#888] hover:text-white transition-colors">
          <Map size={14} /> MAP
        </button>
      </div>

      {/* Filters */}
      <div className="border-b border-[#222]">
        {/* Distance */}
        <div className="flex gap-2 overflow-x-auto px-4 py-2.5">
          <span className="flex-shrink-0 text-[10px] text-[#888] self-center" style={{ fontFamily: "'DM Mono', monospace" }}>DISTANCE:</span>
          {DISTANCE_FILTERS.map((f, i) => (
            <button key={f} className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] transition-colors ${i === 1 ? "bg-[#E8FF47] text-black font-bold" : "border border-[#222] text-[#888]"}`} style={{ fontFamily: "'DM Mono', monospace" }}>
              {f}
            </button>
          ))}
        </div>
        {/* Genre */}
        <div className="flex gap-2 overflow-x-auto px-4 py-2">
          <span className="flex-shrink-0 text-[10px] text-[#888] self-center" style={{ fontFamily: "'DM Mono', monospace" }}>GENRE:</span>
          {GENRE_FILTERS.map((f, i) => (
            <button key={f} className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] transition-colors ${i === 0 ? "bg-[#E8FF47] text-black font-bold" : "border border-[#222] text-[#888]"}`} style={{ fontFamily: "'DM Mono', monospace" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="border-b border-[#222] bg-[#111] px-4 py-3">
        <p className="text-sm text-[#888]">
          <span className="font-bold text-white">{TONIGHT_EVENTS.length} events</span> happening tonight within 5 miles
        </p>
      </div>

      {/* Event Cards */}
      <div className="space-y-0">
        {TONIGHT_EVENTS.map((event) => (
          <div key={event.id} className="border-b border-[#222] p-4 hover:bg-[#111]/50 transition-colors">
            <div className="flex gap-3">
              {/* Time column */}
              <div className="flex w-14 flex-shrink-0 flex-col items-center justify-start pt-1">
                <Clock size={12} className="text-[#888] mb-1" />
                <span className="text-xs font-bold text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {event.start_time}
                </span>
                <span className="text-[9px] text-[#888]">tonight</span>
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm">{event.name}</h3>
                      {event.is_secret && (
                        <span className="rounded-full bg-[#9B59B6]/10 px-1.5 py-0.5 text-[9px] text-[#9B59B6] border border-[#9B59B6]/30" style={{ fontFamily: "'DM Mono', monospace" }}>
                          SECRET
                        </span>
                      )}
                      {event.capacity_pct >= 90 && (
                        <span className="rounded-full bg-[#FF3366] px-1.5 py-0.5 text-[9px] text-white font-bold">
                          ALMOST SOLD OUT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={10} className="text-[#888]" />
                      <span className="text-xs text-[#888]">{event.venue}</span>
                      <span className="text-[#555] text-xs">·</span>
                      <span className="text-xs text-[#888]">{event.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Genre + lineup */}
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="rounded-full border border-[#222] px-2 py-0.5 text-[10px] text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {event.genre}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#888] truncate">
                  {event.lineup.join(" · ")}
                </p>

                {/* Capacity bar */}
                <div className="mt-2">
                  <div className="h-1 w-full rounded-full bg-[#222]">
                    <div
                      className="h-1 rounded-full transition-all"
                      style={{
                        width: `${event.capacity_pct}%`,
                        backgroundColor: event.capacity_pct >= 90 ? "#FF3366" : event.capacity_pct >= 70 ? "#FF9500" : "#E8FF47",
                      }}
                    />
                  </div>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="text-[9px] text-[#888]">{event.tickets_left} tickets left</span>
                    {event.friends_going > 0 && (
                      <span className="flex items-center gap-0.5 text-[9px] text-[#00D4FF]">
                        <Users size={8} />
                        {event.friends_going} friend{event.friends_going > 1 ? "s" : ""} going
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex gap-2">
                  <button className="flex items-center gap-1.5 rounded-full bg-[#E8FF47] px-4 py-1.5 text-xs font-bold text-black hover:bg-[#d4eb3d] transition-colors">
                    <Ticket size={12} />
                    {event.ticket_price === 0 ? "Free — RSVP" : `€${event.ticket_price}`}
                  </button>
                  <button className="rounded-full border border-[#222] px-3 py-1.5 text-xs text-[#888] hover:border-[#333] hover:text-white transition-colors">
                    Interested
                  </button>
                  <button className="rounded-full border border-[#222] px-3 py-1.5 text-xs text-[#888] hover:border-[#333] hover:text-white transition-colors">
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
