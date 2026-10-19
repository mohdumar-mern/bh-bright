"use client";

import { useEffect, useState } from "react";

export default function CurrentYear() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setYear(new Date().getFullYear());
    }, 100);
  }, []);

  if (year === null) {
    return <span>Loading...</span>;
  }

  return <>{year}</>;
}