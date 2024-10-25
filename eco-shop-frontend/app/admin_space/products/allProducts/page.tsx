"use client";

import ProductListShow from "@ext/components/admin_space/products/ProductListShow";
import { GradientCircularProgress } from "@ext/components/loadingSpin/Spins";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<GradientCircularProgress />}>
      <ProductListShow pathArg={"admin_space"} />
    </Suspense>
  );
}

export default page;
