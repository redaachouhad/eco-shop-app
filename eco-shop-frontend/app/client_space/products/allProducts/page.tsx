"use client";

import ProductListShow from "@ext/components/admin_space/products/ProductListShow";
import { GradientCircularProgress } from "@ext/components/loadingSpin/Spins";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<GradientCircularProgress />}>
      <ProductListShow pathArg={"client_space"} />
    </Suspense>
  );
}
export default page;
