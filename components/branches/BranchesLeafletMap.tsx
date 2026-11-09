"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, LayerGroup, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./branches-map.css";
import { DepositOffice } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

const TASHKENT_CENTER: LatLngExpression = [41.3111, 69.2797];

function pinIconHtml(active: boolean) {
  const color = active ? "#2D6EE3" : "#F43F5E";
  const size = active ? 36 : 28;
  return `<span style="
    display:block;width:${size}px;height:${size}px;
    background:${color};border:3px solid #fff;border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    box-shadow:0 4px 12px rgba(15,23,42,0.28);
  "></span>`;
}

export default function BranchesLeafletMap({
  items,
  activeId,
  onSelect,
  lang,
}: {
  items: DepositOffice[];
  activeId: string;
  onSelect: (id: string) => void;
  lang: Language;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  const fittedKeyRef = useRef("");
  const [mapReady, setMapReady] = useState(false);
  onSelectRef.current = onSelect;

  const pins = useMemo(
    () =>
      items.map((item, index) => {
        const lat = Number(item.lat);
        const lng = Number(item.lng);
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          return { ...item, lat, lng };
        }
        const angle = ((index * 137.5) * Math.PI) / 180;
        const radius = 0.025 + (index % 5) * 0.008;
        return {
          ...item,
          lat: 41.3111 + Math.cos(angle) * radius,
          lng: 69.2797 + Math.sin(angle) * radius,
        };
      }),
    [items],
  );

  const active = pins.find((i) => i.id === activeId) || pins[0];
  const pinsKey = pins.map((p) => `${p.id}:${p.lat}:${p.lng}`).join("|");

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!containerRef.current || mapRef.current) return;
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: TASHKENT_CENTER,
        zoom: 12,
        zoomControl: true,
        attributionControl: false,
      });
      L.control
        .attribution({
          prefix: false,
          position: "bottomright",
        })
        .addAttribution(
          '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OSM</a>',
        )
        .addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "",
        maxZoom: 19,
      }).addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setMapReady(true);

      const resize = () => map.invalidateSize();
      window.setTimeout(resize, 80);
      window.addEventListener("resize", resize);
      (map as LeafletMap & { __resize?: () => void }).__resize = resize;
    }

    void init();

    return () => {
      cancelled = true;
      setMapReady(false);
      const map = mapRef.current;
      if (map) {
        const resize = (map as LeafletMap & { __resize?: () => void }).__resize;
        if (resize) window.removeEventListener("resize", resize);
        map.remove();
      }
      mapRef.current = null;
      layerRef.current = null;
      fittedKeyRef.current = "";
    };
  }, []);

  useEffect(() => {
    if (!mapReady) return;
    let cancelled = false;

    async function sync() {
      const map = mapRef.current;
      const layer = layerRef.current;
      if (!map || !layer) return;
      const L = (await import("leaflet")).default;
      if (cancelled) return;

      layer.clearLayers();
      const latLngs: LatLngExpression[] = [];

      pins.forEach((pin) => {
        const size = pin.id === activeId ? 36 : 28;
        const marker = L.marker([pin.lat, pin.lng], {
          icon: L.divIcon({
            className: "branches-map-pin",
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            html: pinIconHtml(pin.id === activeId),
          }),
          title: getLocalizedText(pin.name, lang),
          zIndexOffset: pin.id === activeId ? 1000 : 0,
        });
        marker.on("click", () => onSelectRef.current(pin.id));
        marker.addTo(layer);
        latLngs.push([pin.lat, pin.lng]);
      });

      if (pinsKey && fittedKeyRef.current !== pinsKey) {
        fittedKeyRef.current = pinsKey;
        if (latLngs.length > 1) {
          map.fitBounds(L.latLngBounds(latLngs), {
            padding: [40, 40],
            maxZoom: 13,
          });
        } else if (latLngs.length === 1) {
          map.setView(latLngs[0], 13);
        }
      } else if (active) {
        map.panTo([active.lat, active.lng], { animate: true });
      }
    }

    void sync();
    return () => {
      cancelled = true;
    };
  }, [mapReady, pins, pinsKey, activeId, active, lang]);

  return (
    <>
      <div ref={containerRef} className="branches-leaflet-map h-full w-full" />
      <a
        href={externalMapsUrl(active)}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-[22px] left-[18px] z-[1000] inline-flex items-center gap-2 rounded-[11px] bg-white py-[11px] pl-[15px] pr-4 text-[13px] font-semibold leading-4 text-[#0F172A] shadow-[0px_4px_11px_rgba(26,38,64,0.18)]"
      >
        <span className="h-4 w-3 rounded-full bg-[#F43F5E]" />
        {lang === "uz"
          ? "Xaritani ochish"
          : lang === "en"
            ? "Open map"
            : "Открыть карту"}
      </a>
    </>
  );
}

function externalMapsUrl(item: DepositOffice | undefined) {
  if (item?.lat != null && item?.lng != null) {
    return `https://www.openstreetmap.org/?mlat=${item.lat}&mlon=${item.lng}#map=15/${item.lat}/${item.lng}`;
  }
  return "https://www.openstreetmap.org/#map=12/41.3111/69.2797";
}
