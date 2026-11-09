"use client";

import BranchesMapSection from "@/components/branches/BranchesMapSection";
import { OfficesMapConfig } from "@/types/deposits";

interface DepositOfficesProps {
  config: OfficesMapConfig;
}

/** Product detail offices block — same map UI as /filialy. */
export default function DepositOffices({ config }: DepositOfficesProps) {
  return <BranchesMapSection config={config} />;
}
