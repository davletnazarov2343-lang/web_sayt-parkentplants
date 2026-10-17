"use client";

import { useEffect } from "react";
import { captureUtmFromLocation } from "@/lib/leads/utm";

/**
 * Saytga reklama havolasi orqali kirilganda URL'dagi utm_* / fbclid / gclid
 * ni sessionStorage'ga yozib qo'yadi — mijoz boshqa sahifadan so'rov
 * yuborsa ham manba Bitrix24'ga yetib boradi. Hech narsa render qilmaydi.
 */
export function UtmCapture() {
  useEffect(() => {
    captureUtmFromLocation();
  }, []);
  return null;
}
