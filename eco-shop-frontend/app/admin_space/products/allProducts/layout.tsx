"use client";

import ProductFilter from "@ext/components/admin_space/products/ProductFilter";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll text-white">
      <ProductFilter pathArg={"admin_space"} />
      {children}
    </div>
  );
}
